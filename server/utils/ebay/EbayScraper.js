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

const getRecentlySoldListings = async (keyword, page_limit) => {
    let page_number = 1

    let recentlySoldListingsData = []

    while (page_number <= page_limit) {
        const url = `https://www.ebay.com/sch/i.html?_nkw=${keyword}&_sacat=0&_from=R40&rt=nc&LH_Sold=1&LH_Complete=1&_pgn=${page_number}`
        const response = await fetch(url, {method: 'GET',})
        const html_text = await response.text()

        const soup = new JSSoup(html_text)

        const next_page_btn = soup.findAll('a', 'pagination__next')

        const recentlySoldListings = soup.findAll('div', 's-item__info')?.slice(2)
        
        recentlySoldListings?.forEach( (listing) => {
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
            if (!(ebayDateToJSDate(ebay_sold_date) < ((new Date()).getTime() - 3 * 30 * 24 * 60 * 60 * 1000))
                && (next_page_btn.length > 0 || title.includes(keyword))) {
                recentlySoldListingsData.push(listing_data)
            }
        })

        if (next_page_btn.length === 0) {
            console.log(`Ran out of pages for ${keyword}, pages pulled: ${page_number}, listings pulled: ${recentlySoldListingsData.length}`)
            break
        }

        page_number++
    }
    return recentlySoldListingsData
}

module.exports = { getRecentlySoldListings, ebayDateToJSDate, ebayPriceToNumber }