const calcMixedRating = (a_rating, b_rating, allocation) => {
    if ((a_rating + b_rating) === 0) {
        return 0
    }
    return Math.sign(a_rating - b_rating) * allocation * (2/3) 
                + allocation * (1/3) * (a_rating - b_rating) / (a_rating + b_rating)
}

const calcQuartileInfo = (listings) => {
    const listingsSortedByPrice = listings.sort((a, b) => {
        return a.sold_price - b.sold_price
    })
    const lower_quartile_index = Math.floor(listingsSortedByPrice.length * 0.25)
    const upper_quartile_index = Math.floor(listingsSortedByPrice.length * 0.75)
    const lower_quartile_price = listingsSortedByPrice[lower_quartile_index].sold_price
    const upper_quartile_price = listingsSortedByPrice[upper_quartile_index].sold_price
    const interquartile_range = upper_quartile_price - lower_quartile_price

    return {
        lower_quartile_price,
        upper_quartile_price,
        interquartile_range
    }
}

const removeInterPriceOutliers = (comparable_parts) => {
    let listings = []
    comparable_parts.forEach( (comparable_part) => {
        comparable_part.listing_data.map( (listing) => {
            listings.push(listing)
        })
    })
    const { lower_quartile_price, upper_quartile_price, interquartile_range } = calcQuartileInfo(listings)
    const comparablePartsOutlierListingsRemoved = comparable_parts.map( (comparable_part) => {
        let copy_comparable_part = comparable_part
        const listingsOutliersRemoved = comparable_part.listing_data.filter( (listing) => {
            return !(listing.sold_price > upper_quartile_price + 1.5 * interquartile_range || listing.sold_price < lower_quartile_price - 1.5 * interquartile_range)
        })
        copy_comparable_part.listing_data = listingsOutliersRemoved
        return copy_comparable_part
    })

    return comparablePartsOutlierListingsRemoved
}

const removeIntraPriceOutliers = (listings) => {
    const { lower_quartile_price, upper_quartile_price, interquartile_range } = calcQuartileInfo(listings)
    const listingsOutliersRemoved = listings.filter((listing) => {
        return !(listing.sold_price > upper_quartile_price + 1.5 * interquartile_range || listing.sold_price < lower_quartile_price - 1.5 * interquartile_range)
    })

    return listingsOutliersRemoved
}


module.exports = { calcMixedRating, calcQuartileInfo, removeInterPriceOutliers, removeIntraPriceOutliers }