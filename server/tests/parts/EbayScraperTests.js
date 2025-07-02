const { TestError } = require("../../errors/TestError")
const getRecentlySoldListings = require("../../utils/ebay/EbayScraper")

const getRecentlySoldListings_test = async () => {
    const recentlySoldListings = await getRecentlySoldListings("2070super", 3)
    if (recentlySoldListings.length > 0) {
        console.log("getRecentlySoldListings_test: Passed")
        return true
    } else {
        console.log("getRecentlySoldListings_test: Failed")
        throw new TestError("getRecentlySoldListings_test: Failed")
    }
}

const running_tests = async () => {
    try {
        await getRecentlySoldListings_test()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()