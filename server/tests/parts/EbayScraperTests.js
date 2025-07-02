const getRecentlySoldListings = require("../../utils/ebay/EbayScraper")

const getRecentlySoldListings_test = async () => {
    const recentlySoldListings = await getRecentlySoldListings("2070super", 3)
    if (recentlySoldListings.length > 0) {
        console.log("getRecentlySoldListings_test: Passed")
        return true
    } else {
        console.log("getRecentlySoldListings_test: Failed")
        return false
    }
}

const running_tests = async () => {
    await getRecentlySoldListings_test()
    process.exit(0)
}

running_tests()