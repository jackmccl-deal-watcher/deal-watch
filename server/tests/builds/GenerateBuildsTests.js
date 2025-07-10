const { generateBuilds } = require("../../modules/builds/GenerateBuilds")
const { userAllocations500 } = require("./test_builds")

const test_generate_builds = async () => {
    const builds = await generateBuilds(userAllocations500)
    if (builds.budget_build && builds.balanced_build && builds.performance_build) {
        console.log(`test_generate_builds - Passed`)
    } else {
        throw new Error(`test_generate_builds - Failed`)
    }
}

const running_tests = async () => {
    try {
        await test_generate_builds()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()