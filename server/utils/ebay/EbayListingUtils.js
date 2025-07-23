const sortBySoldDate = (listingData) => {
    return sortedByDateListingData = listingData.sort( (a, b) => {
        return b.sold_date-a.sold_date
    })
}

module.exports = { sortBySoldDate }