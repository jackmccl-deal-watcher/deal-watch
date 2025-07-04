const { ebayDateToJSDate, ebayPriceToNumber } = require('../../utils/ebay/EbayScraper.js')
const { evaluatePart, removePriceOutliers } = require('../../utils/parts/EvaluateParts.js')
const { TestError } = require('../../errors/TestError.js')
const outlier_test_listings = [
    {
    title: 'EVGA GeForce RTX 2070 XC ULTRA GAMING 8GB GDDR6 Graphics Card rgb ray tracing',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 2
    },
    {
    title: 'NVIDIA GeForce RTX 2070 Super GDDR6 Graphics Card - 8GB',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 242.5
    },
    {
    title: 'ZOTAC   RTX 2070 SUPER  8GB NO WORKING Graphics Card',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 46
    },
    {
    title: 'ASUS ROG Strix GeForce RTX 2070 OC 08G Gaming Brand New Open Box',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 219.99
    },
    {
    title: 'MSI NVIDIA GeForce RTX 2070 SUPER ',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 200
    },
    {
    title: 'EVGA NVIDIA GeForce RTX 2070 Super Black 8GB GDDR6 Graphics Card',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 175.79
    },
    {
    title: 'ASUS Dual  RTX 2070 SUPER 8GB GDDR6 Graphics Card',
    sold_date: '2024-11-29T08:00:00.000Z',
    sold_price: 190
    },
    {
    title: 'ASUS NVIDIA GeForce RTX 2070 Super 8GB GDDR6 Graphics Card #2323',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 210
    },
    {
    title: 'ASUS GeForce Dual-RTX 2070-8G GDDR6 Graphics Card 8GB ...Lightly Used',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 159.95
    },
    {
    title: 'Gigabyte GeForce RTX 2070 SUPER Gaming OC 3X 8GB GDDR6 - White',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 180
    },
    {
    title: 'MSI NVIDIA GeForce RTX 2070 8GB GDDR6 Graphics Card (RTX2070ARMOR8G)',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 64
    },
    {
    title: 'ASUS ROG STRIX RTX 2070 SUPER 8GB Graphics Card (ROG-STRIX-RTX2070S-A8G-GAMING)',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 189.99
    },
    {
    title: 'GIGABYTE NVIDIA GeForce RTX 2070 SUPER 8GB GDDR6 Graphics Card ',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 5000
    }
]

const outlier_test_listings_key = [
    {
    title: 'ASUS GeForce Dual-RTX 2070-8G GDDR6 Graphics Card 8GB ...Lightly Used',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 159.95
    },
    {
    title: 'EVGA NVIDIA GeForce RTX 2070 Super Black 8GB GDDR6 Graphics Card',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 175.79
    },
    {
    title: 'Gigabyte GeForce RTX 2070 SUPER Gaming OC 3X 8GB GDDR6 - White',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 180
    },
    {
    title: 'ASUS ROG STRIX RTX 2070 SUPER 8GB Graphics Card (ROG-STRIX-RTX2070S-A8G-GAMING)',
    sold_date: '2025-06-27T07:00:00.000Z',
    sold_price: 189.99
    },
    {
    title: 'ASUS Dual  RTX 2070 SUPER 8GB GDDR6 Graphics Card',
    sold_date: '2024-11-29T08:00:00.000Z',
    sold_price: 190
    },
    {
    title: 'MSI NVIDIA GeForce RTX 2070 SUPER ',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 200
    },
    {
        title: 'ASUS NVIDIA GeForce RTX 2070 Super 8GB GDDR6 Graphics Card #2323',
        sold_date: '2025-06-27T07:00:00.000Z',
        sold_price: 210
    },
    {
        title: 'ASUS ROG Strix GeForce RTX 2070 OC 08G Gaming Brand New Open Box',
        sold_date: '2025-06-28T07:00:00.000Z',
        sold_price: 219.99
    },
    {
    title: 'NVIDIA GeForce RTX 2070 Super GDDR6 Graphics Card - 8GB',
    sold_date: '2025-06-28T07:00:00.000Z',
    sold_price: 242.5
    },
]

const ebayPriceToNumber_test = () => {
    const expected_number_1 = 30
    const test_input_1 = "$20.00 to $40.00"
    const result_1 = ebayPriceToNumber(test_input_1)
    const expected_number_2 = 50.32
    const test_input_2 = "$50.32"
    const result_2 = ebayPriceToNumber(test_input_2)
    if (Math.abs(result_1 - expected_number_1) < 0.00005
        && Math.abs(result_2 - expected_number_2 < 0.00005)) {
        console.log("ebayPriceToNumber_test: Passed")
        return true
    } else {
        console.log("ebayPriceToNumber_test: Failed")
        throw new TestError("ebayPriceToNumber_test: Failed")
    }
}

const ebayDateToJSDate_test = () => {
    const expected_date = new Date(`Jun 12, 1971`)
    const test_input = 'Sold  Jun 12, 1971'
    const result = ebayDateToJSDate(test_input)
    // less than 1 millisecond off
    if (Math.abs(result - expected_date) < 1) {
        console.log("ebayDateToJSDate_test: Passed")
        return true
    } else {
        console.log("ebayDateToJSDate_test: Failed")
        throw new TestError("ebayDateToJSDate_test: Failed")
    }
}


const removePriceOutliers_test = () => {
    const result = removePriceOutliers(outlier_test_listings)
    if (result.every) {
        console.log("removePriceOutliers_test: Passed")
        return true
    } else {
        console.log("removePriceOutliers_test: Failed")
        throw new TestError("removePriceOutliers_test: Failed")
    }
}

const running_tests = async () => {
    try {
        ebayPriceToNumber_test()
        ebayDateToJSDate_test()
        removePriceOutliers_test()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()