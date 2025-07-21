const JSSoup = require('jssoup').default;

const ebayPriceToNumber = (price) => {
    if (price.includes("to")) {
        return ((Number(price.split(" ")[0].slice(1)) + Number(price.split(" ")[2].slice(1))) / 2)
    }
    return Number(price.slice(1))
}

const ebayDateToJSDate = (ebay_date) => {
    const split_ebay_date = ebay_date.split(" ")
    const month = split_ebay_date[2]
    const day = split_ebay_date[3].split(',')[0]
    const year = split_ebay_date[4]
    return new Date(`${month} ${day}, ${year}`)
}

const getRecentlySoldListings = async (keyword, day_limit, listing_limit, logging) => {
    try {
        let page_number = 1
        const TIME_LIMIT_IN_MILLISECONDS = day_limit * 24 * 60 * 60 * 1000

        let recentlySoldListingsData = []
        let scrape = true
        let stale_listing_count = 0
        while (scrape) {
            const url = `https://www.ebay.com/sch/i.html?_nkw=${keyword}&_sacat=0&_from=R40&rt=nc&LH_Sold=1&LH_Complete=1&_pgn=${page_number}&category_ids=58058`
            const response = await fetch(url, {method: 'GET',})
            const html_text = await response.text()

            const soup = new JSSoup(html_text)

            const next_page_btn = soup.findAll('a', 'pagination__next')
            // First two s-item__info class divs are used to display options at top of listings page
            const recentlySoldListings = soup.findAll('div', 's-item__info')?.slice(2)
            recentlySoldListings?.every( (listing) => {
                if (recentlySoldListingsData.length >= listing_limit || stale_listing_count > 5) {
                    scrape = false
                    return false
                }
                const title = listing?.find('div', 's-item__title')?.find('span')?.text
                const ebay_sold_date = listing?.find('span', 's-item__caption--signal')?.text
                const ebay_sold_price = listing?.find('span', 's-item__price')?.text
                if (!title || !ebay_sold_date || !ebay_sold_price) {
                    return
                }
                const listing_data = {
                    'title': title,
                    'sold_date': ebayDateToJSDate(ebay_sold_date),
                    'sold_price': ebayPriceToNumber(ebay_sold_price),
                }
                // Skip listing if it's more than 3 months old
                // If less than a full page of listings, could be related listings, only include title matches
                if (ebayDateToJSDate(ebay_sold_date) < ((new Date()).getTime() - TIME_LIMIT_IN_MILLISECONDS)) {
                    stale_listing_count += 1
                }
                if (!(ebayDateToJSDate(ebay_sold_date) < ((new Date()).getTime() - TIME_LIMIT_IN_MILLISECONDS))
                        && !(isNaN(listing_data.sold_price))
                        && (next_page_btn.length > 0 || title.includes(keyword))) {
                    recentlySoldListingsData.push(listing_data)
                    return true
                }
            })

            if (!scrape && logging) {
                console.log(`Hit listing limit for ${keyword}, pages pulled: ${page_number}, listings pulled: ${recentlySoldListingsData.length}`)
            } else if (next_page_btn.length === 0) {
                logging && console.log(`Ran out of pages for ${keyword}, pages pulled: ${page_number}, listings pulled: ${recentlySoldListingsData.length}`)
                scrape = false
            }

            page_number++
        }
        return recentlySoldListingsData
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { getRecentlySoldListings, ebayDateToJSDate, ebayPriceToNumber }