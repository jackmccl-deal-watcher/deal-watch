const { userAllocations500 } = require("../../tests/builds/test_builds")
const { recommendBuild, MODE } = require("./BuildRecommender")
const { addPartListingsToBuild } = require("./PartListing")

const generateBuilds = async (userAllocations) => {
    const balancedBuild = await recommendBuild(userAllocations, MODE.BALANCED)
    const balancedBuildWithListings = await addPartListingsToBuild(balancedBuild)
    const budgetBuild = await recommendBuild(userAllocations, MODE.BUDGET)
    const budgetBuildWithListings = await addPartListingsToBuild(budgetBuild)
    const performanceBuild = await recommendBuild(userAllocations, MODE.PERFORMANCE)
    const performanceBuildWithListings = await addPartListingsToBuild(performanceBuild)
    builds = {
        'budget_build': budgetBuildWithListings,
        'balanced_build': balancedBuildWithListings,
        'performance_build': performanceBuildWithListings,
    }
    console.log(builds)
    return builds
}

generateBuilds(userAllocations500)

module.exports = { generateBuilds }