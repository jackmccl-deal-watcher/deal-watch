const { getListings, getItem } = require("../../utils/ebay/EbayUtils")

const getPCListings = async () => {
    const DESKTOP_CATEGORY_CODE = 171957
    const LISTING_LIMIT = 30
    const keyword = 'used gaming pc'
    const listingsData = await getListings(keyword, LISTING_LIMIT, DESKTOP_CATEGORY_CODE)
    const listingSummaries = listingsData['itemSummaries']
    const PCListingsWithItemInfo = []
    for (let listingSummary of listingSummaries) {
        const itemHref = listingSummary.itemHref
        const itemInfo = await getItem(itemHref)
        if (itemInfo.description.length < 1000) {
            const listingSummaryWithHref = {...listingSummary, ['description']: itemInfo.description}
            PCListingsWithItemInfo.push(listingSummaryWithHref)
        } else {
            PCListingsWithItemInfo.push(listingSummary)
        }
    }
    return PCListingsWithItemInfo
}

module.exports = getPCListings