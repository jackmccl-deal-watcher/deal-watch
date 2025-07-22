const { MODE } = require('./BuildConstants')
const { recommendBuild } = require("./BuildRecommender")
const { addPartListingsToBuild } = require("./PartListing")

const generateBuilds = async (userAllocations) => {
    const [ balancedBuild, budgetBuild, performanceBuild ] = await Promise.all([recommendBuild(userAllocations, MODE.BALANCED), recommendBuild(userAllocations, MODE.BUDGET), recommendBuild(userAllocations, MODE.PERFORMANCE)])
    const [ balancedBuildWithListings, budgetBuildWithListings, performanceBuildWithListings ] = await Promise.all([addPartListingsToBuild(balancedBuild), addPartListingsToBuild(budgetBuild), addPartListingsToBuild(performanceBuild)])
    const builds = {
        'budget_build': budgetBuildWithListings,
        'balanced_build': balancedBuildWithListings,
        'performance_build': performanceBuildWithListings,
    }
    return builds
}

module.exports = { generateBuilds }