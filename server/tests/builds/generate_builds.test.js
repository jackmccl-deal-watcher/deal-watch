const ComponentTypes = require("../../models/part_models/ComponentTypesEnum")
const { generateBuilds } = require("../../modules/builds/GenerateBuilds")
const { userAllocations500 } = require("./test_builds")

const TYPES_LIST = [
    ComponentTypes.CPU,
    ComponentTypes.VIDEOCARD,
    ComponentTypes.MOTHERBOARD,
    ComponentTypes.MEMORY,
    ComponentTypes.HARD_DRIVE,
    ComponentTypes.POWER_SUPPLY,
    ComponentTypes.CASE,
]

test('tests generateBuilds function', async () => {
    const builds = await generateBuilds(userAllocations500)
    expect(Object.entries(builds).length).toBe(3)
    for (let build of Object.values(builds)) {
        for (let type of TYPES_LIST) {
            expect(Object.values(build[type]).length).toBeGreaterThan(0)
        }
    }
}, 10000)