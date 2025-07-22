const { getListings, getItem } = require("../../utils/ebay/EbayUtils")
const LISTING_PROPERTIES = require("./ListingPropertiesEnum")

const QUERY_KEYWORD = 'used gaming pc'

const getPCListings = async () => {
    const DESKTOP_CATEGORY_CODE = 171957
    const LISTING_LIMIT = 30
    const listingsData = await getListings(QUERY_KEYWORD, LISTING_LIMIT, DESKTOP_CATEGORY_CODE)
    const listingSummaries = listingsData[LISTING_PROPERTIES.ITEM_SUMMARIES]
    const PCListingsWithItemInfo = []
    for (let listingSummary of listingSummaries) {
        const itemHref = listingSummary[LISTING_PROPERTIES.ITEM_URL]
        const itemInfo = await getItem(itemHref)
        if (itemInfo[LISTING_PROPERTIES.LONG_DESCRIPTION] < 1000) {
            const listingSummaryWithHref = {...listingSummary, [LISTING_PROPERTIES.LONG_DESCRIPTION]: itemInfo[LISTING_PROPERTIES.LONG_DESCRIPTION]}
            PCListingsWithItemInfo.push(listingSummaryWithHref)
        } else {
            PCListingsWithItemInfo.push(listingSummary)
        }
    }
    return PCListingsWithItemInfo
}

module.exports = getPCListings