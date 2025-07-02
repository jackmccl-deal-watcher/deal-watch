const JSSoup = require('jssoup').default;

const ebayPriceToNumber = (price) => {
    return Number(price.slice(1))
}

const ebayDateToJSDate = (ebay_date) => {
    const split_ebay_date = ebay_date.split(" ")
    const month = split_ebay_date[2]
    const day = split_ebay_date[3].split(',')[0]
    const year = split_ebay_date[4]
    return Date(`${month} ${day}, ${year}`)
}

const getRecentlySoldListings = async (keyword, page_limit) => {
    let page_number = 1

    let recentlySoldListingsData = []

    while (page_number < page_limit) {
        const url = `https://www.ebay.com/sch/i.html?_nkw=${keyword}&_sacat=0&_from=R40&rt=nc&LH_Sold=1&LH_Complete=1&_pgn=${page_number}`
        const response = await fetch(url, {method: 'GET',})
        const html_text = await response.text()

        const soup = new JSSoup(html_text)

        const next_page_btn = soup.findAll('a', 'pagination__next')

        if (next_page_btn.length === 0) {
            console.log(`Ran out of pages, pages pulled: ${page_number}`)
            break
        } else {
            const recentlySoldListings = soup.findAll('div', 's-item__info').slice(2)
            
            recentlySoldListings.forEach( (listing) => {
                const title = listing.find('div', 's-item__title').find('span').text
                const ebay_sold_date = listing.find('span', 's-item__caption--signal').text
                const ebay_sold_price = listing.find('span', 's-item__price').text
                const listing_data = {
                    'title': title,
                    'sold_date': ebayDateToJSDate(ebay_sold_date),
                    'sold_price': ebayPriceToNumber(ebay_sold_price),
                }
                recentlySoldListingsData.push(listing_data)
            })
        }
        page_number++
    }
    return recentlySoldListingsData
}

module.exports = getRecentlySoldListings