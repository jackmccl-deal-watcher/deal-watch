const { getRecentlySoldListings } = require("../../utils/ebay/EbayScraper")

test('tests EbayScraper getRecentlySoldListings function', async () => {
    const test_keyword = "2070 super"
    const day_limit = 3
    const post_limit = 30
    const logging = false
    const recentlySoldListings = await getRecentlySoldListings(test_keyword, day_limit, post_limit, logging)
    expect(recentlySoldListings.length).toBeGreaterThan(0)
}, 25000)