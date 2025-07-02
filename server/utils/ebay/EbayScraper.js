const JSSoup = require('jssoup').default;
const getRecentlySoldListings = async (keyword) => {
    let page_number = 1

    let recentlySoldListingsData = []

    while (page_number < 100) {
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
                const sold_date = listing.find('span', 's-item__caption--signal').text
                const sold_price = listing.find('span', 's-item__price').text
                const listing_data = {
                    'title': title,
                    'sold_date': sold_date,
                    'sold_price': sold_price,
                }
                recentlySoldListingsData.push(listing_data)
            })
        }
        page_number++
    }
    return recentlySoldListingsData
}

module.exports = getRecentlySoldListings