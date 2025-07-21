const calcMixedRating = (a_rating, b_rating, allocation) => {
    if ((a_rating + b_rating) === 0) {
        return 0
    }
    return Math.sign(a_rating - b_rating) * allocation * (2/3) 
                + allocation * (1/3) * (a_rating - b_rating) / (a_rating + b_rating)
}

module.exports = { calcMixedRating }