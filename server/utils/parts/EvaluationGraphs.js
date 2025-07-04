const { evaluatePart } = require("./EvaluateParts")

const getDataPoints = (comparable_part) => {
    let time_data = []
    let price_data = []
    comparable_part.listing_data.map( (listing) => {
        time_data.push(listing.sold_date)
        price_data.push(listing.sold_price)
    })
    const data_points = {
        'time_data': time_data,
        'price_data': price_data,
    }
    return data_points
}

const getAllDataPoints = (comparable_parts) => {
    let all_time_data = []
    let all_price_data = []
    
    comparable_parts.map( (comparable_part) => {
        const data_points = getDataPoints(comparable_part)
        all_time_data = [...all_time_data, ...data_points.time_data]
        all_price_data = [...all_price_data, ...data_points.price_data]
    })
    const all_data_points = {
        'all_time_data': all_time_data,
        'all_price_data': all_price_data,
    }
    return all_data_points
}

const makeListingDict = (comparable_part) => {
    let listing_dict = {}
    comparable_part.listing_data.map( (listing) => {
        if (!listing_dict[listing.sold_date]) {
            listing_dict[listing.sold_date] = []
        }
        listing_dict[listing.sold_date].push(listing.sold_price)
    })
    Object.keys(listing_dict).map( (sold_date) => {
        let sold_price_sum = 0
        listing_dict[sold_date].map( (price) => {
            sold_price_sum += price
        })
        if (listing_dict[sold_date].length > 1) {
            listing_dict[sold_date] = (sold_price_sum / listing_dict[sold_date].length).toFixed(2)
        } else {
            listing_dict[sold_date] = (sold_price_sum).toFixed(2)
        }
    })
    return listing_dict
}

const makePriceDataArray = (comparable_part, X_Times) => {
    const price_data = X_Times.map( (X_Time) => {
        if (comparable_part.listing_dict[X_Time]) {
            return comparable_part.listing_dict[X_Time]
        } else {
            return null
        }
    })
    return price_data
}

const getUniqueTimes = (time_data) => {
    const X_Times = [...new Set(time_data.map(date => date.getTime()))]
    return [...X_Times.map(time => new Date(time))]
}

const makeDataPoints = (comparable_part) => {
    const dataPoints = comparable_part.listing_data.map( (listing) => {
        return {'x': listing.sold_date, 'y': listing.sold_price, 'id':comparable_part.brand + ': ' + comparable_part.model + ' - ' + listing.sold_date}
    })
    return dataPoints
}

const makeGraphData = (evaluation) => {
    evaluation.comparable_parts = evaluation.comparable_parts.map( (comparable_part) => {
        comparable_part['listing_dict'] = makeListingDict(comparable_part)
        return comparable_part
    })

    const allDataPoints = getAllDataPoints(evaluation.comparable_parts)

    const X_Times = getUniqueTimes(allDataPoints.all_time_data).sort((a, b) => {
        return b - a
    })

    const Y_Prices = []

    evaluation.comparable_parts = evaluation.comparable_parts.map( (comparable_part) => {
        comparable_part['price_data'] = makePriceDataArray(comparable_part, X_Times)
        Y_Prices.push({
            'data': comparable_part['price_data'],
            'label': comparable_part.brand + ': ' + comparable_part.model,
            'connectNulls': true,
        })
        return comparable_part
    })



    const X_Y_Points = []
    evaluation.comparable_parts = evaluation.comparable_parts.map( (comparable_part) => {
        comparable_part['price_data'] = makePriceDataArray(comparable_part, X_Times)
        X_Y_Points.push({
            'data': makeDataPoints(comparable_part),
            'label': comparable_part.brand + ': ' + comparable_part.model,
        })
        return comparable_part
    })

    evaluation.X_Data = X_Times
    evaluation.Y_Data = Y_Prices
    evaluation.X_Y_Points = X_Y_Points

    return evaluation
}
module.exports = { makeGraphData }