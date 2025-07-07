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
        'data': comparable_part.listing_data,
    }
    return data_points
}

const getAllDataPoints = (comparable_parts) => {
    let all_time_data = []
    let all_price_data = []
    let all_data = []
    
    comparable_parts.map( (comparable_part) => {
        const data_points = getDataPoints(comparable_part)
        all_time_data = [...all_time_data, ...data_points.time_data]
        all_price_data = [...all_price_data, ...data_points.price_data]
        all_data = [...all_data, ...data_points.data]
    })
    const all_data_points = {
        'all_time_data': all_time_data,
        'all_price_data': all_price_data,
        'all_data': all_data,
    }
    return all_data_points
}

const makePlotPoints = (comparable_part) => {
    const plotPoints = comparable_part.listing_data.map( (listing) => {
        return {'x': listing.sold_date, 'y': listing.sold_price, 'id':comparable_part.brand + ': ' + comparable_part.model + ' - ' + listing.sold_date}
    })
    return plotPoints
}

const makeMovingAveragePoints = (all_data) => {
    const THREE_MONTHS_IN_MILLIESCONDS = 3 * 30 * 24 * 60 * 60 * 1000
    const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000
    const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000
    let moving_average_start = new Date().getTime() - THREE_MONTHS_IN_MILLIESCONDS - THREE_MONTHS_IN_MILLIESCONDS
    let window_end_time = new Date().getTime()
    let window_start_time = new Date().getTime() - ONE_WEEK_IN_MILLISECONDS
    let moving_average_points = []

    while (window_start_time >= moving_average_start) {
        const window_data = all_data.filter( (data) => {
            return data.sold_date > window_start_time && data.sold_date < window_end_time
        })
        
        let total_window_avg_comparability_score = 0
        window_data.map( (data_point) => {
            total_window_avg_comparability_score += data_point.avg_comparability_score
        })

        let price_sum = 0
        let price_count = 0
        window_data.map( (data_point) => {
            price_sum += data_point.sold_price * data_point.avg_comparability_score / total_window_avg_comparability_score
            price_count += data_point.avg_comparability_score / total_window_avg_comparability_score
        })
        moving_average_points.push({'x': window_end_time, 'y': price_sum/price_count})
        window_end_time -= ONE_DAY_IN_MILLISECONDS
        window_start_time -= ONE_DAY_IN_MILLISECONDS
    }

    return moving_average_points.filter( value => value.y)
}

const makeGraphData = (evaluation) => {
    const allDataPoints = getAllDataPoints(evaluation.comparable_parts)

    const X_Y_Points = []
    evaluation.comparable_parts = evaluation.comparable_parts.map( (comparable_part) => {
        X_Y_Points.push({
            'data': makePlotPoints(comparable_part),
            'label': comparable_part.brand + ': ' + comparable_part.model,
        })
        return comparable_part
    })

    const M_A_Points = { 
        'data': makeMovingAveragePoints(allDataPoints.all_data),
        'label': '7-Day Moving Average',
        'id': '7-day-moving-average',
    }

    evaluation.X_Y_Points = X_Y_Points
    evaluation.M_A_Points = M_A_Points

    return evaluation
}
module.exports = { makeGraphData }