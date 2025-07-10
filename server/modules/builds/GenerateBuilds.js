const { recommendBuild, MODE } = require("./BuildRecommender")
const { addPartListingsToBuild } = require("./PartListing")

const generateBuilds = async (userAllocations) => {
    const budgetBuild = await recommendBuild(userAllocations, MODE.BUDGET)
    const budgetBuildWithListings = await addPartListingsToBuild(budgetBuild)
    const balancedBuild = await recommendBuild(userAllocations, MODE.DEFAULT)
    const balancedBuildWithListings = await addPartListingsToBuild(balancedBuild)
    const performanceBuild = await recommendBuild(userAllocations, MODE.PERFORMANCE)
    const performanceBuildWithListings = await addPartListingsToBuild(performanceBuild)

    builds = {
        'budget_build': budgetBuildWithListings,
        'balanced_build': balancedBuildWithListings,
        'performance_build': performanceBuildWithListings,
    }
    return builds
}

module.exports = { generateBuilds }