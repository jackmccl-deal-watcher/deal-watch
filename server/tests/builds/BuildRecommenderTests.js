const { TestError } = require("../../errors/TestError")
const { generalComparator } = require("../../utils/builds/BuildRecommender")
const { userAllocations500, test_cpus, test_videocards, test_motherboards, test_memorys, test_hard_drives, test_power_supplys, test_cases } = require("./test_builds")

const numberAllocationTester = (test_allocations, parts, component_type) => {
    for (let key of Object.keys(test_allocations)) {
        const allocations = test_allocations[key]
        const copyParts = parts
        copyParts.sort((a, b) => generalComparator(a, b, allocations, component_type))
        if (copyParts[copyParts.length-1].model === key) {
            console.log(`test_${component_type}_builds::${key}_allocation - Passed`)
        } else {
            throw new TestError(`test_${component_type}_builds::${key}_allocation - Failed`)
        }
    }
}

const test_cpu_builds = () => {
    console.log("Starting test_cpu_builds tests...")
    const cpu_number_test_allocations = {
        cores: {
            cpu: {
                allocation: 0.2,
                cores: 0.5,
                base_clock: 0.25,
                boost_clock: 0.25,
            }
        },
        base_clock: {
            cpu: {
                allocation: 0.2,
                cores: 0.15,
                base_clock: 0.7,
                boost_clock: 0.15,
            }
        },
        boost_clock: {
            cpu: {
                allocation: 0.2,
                cores: 0.15,
                base_clock: 0.15,
                boost_clock: 0.7,
            }
        }
    }

    numberAllocationTester(cpu_number_test_allocations, test_cpus, 'cpu', )
}

const test_videocard_builds = () => {
    console.log("Starting test_videocard_builds tests...")
    const videocard_number_test_allocations = {
        vram: {
            'video-card': {
                allocation: 0.2,
                vram: 0.5,
                base_clock: 0.25,
                boost_clock: 0.25,
            }
        },
        base_clock: {
            'video-card': {
                allocation: 0.2,
                vram: 0.25,
                base_clock: 0.5,
                boost_clock: 0.25,
            }
        },
        boost_clock: {
            'video-card': {
                allocation: 0.2,
                vram: 0.25,
                base_clock: 0.25,
                boost_clock: 0.5,
            }
        }
    }

    numberAllocationTester(videocard_number_test_allocations, test_videocards, 'video-card')
}

const test_motherboard_builds = () => {
    console.log("Starting test_motherboard_builds tests...")
    const motherboard_number_test_allocations = {
        ram_slots: {
            motherboard: {
                allocation: 0.15,
                ram_slots: 0.6,
                max_ram: 0.4,
                socket: 'AM3+/AM3',
                form_factor: 'ATX',
            },
        },
        max_ram: {
            motherboard: {
                allocation: 0.15,
                ram_slots: 0.3,
                max_ram: 0.7,
                socket: 'AM3+/AM3',
                form_factor: 'ATX',
            },
        },
        socket: {
            motherboard: {
                allocation: 0.15,
                ram_slots: 0.5,
                max_ram: 0.4,
                socket: 'LGA1151',
                form_factor: 'ATX',
            },
        },
        form_factor: {
            motherboard: {
                allocation: 0.15,
                ram_slots: 0.5,
                max_ram: 0.4,
                socket: 'AM3+/AM3',
                form_factor: 'Mini-ATX',
            },
        }
    }
    numberAllocationTester(motherboard_number_test_allocations, test_motherboards, 'motherboard')
}

const calcSlidingQualityRatingTester = (allocations, ratings, parts, component_type) => {
    const spec_type = allocations['spec_type']
    for (let rating_index in ratings) {
        const partsCopy = [...parts]
        partsCopy.sort((a, b) => generalComparator(a, b, allocations[ratings[rating_index]], component_type))
        for (let part_index in partsCopy) {
            const part_rating = partsCopy[part_index][spec_type]
            const part_rating_index = ratings.indexOf(part_rating)
            let check_index = 0
            while (check_index < part_index) {
                const check_rating = partsCopy[check_index][spec_type]
                const check_rating_index = ratings.indexOf(check_rating)
                if (check_rating_index > part_rating_index) {
                    throw new TestError(`test_${component_type}_builds::${spec_type}_allocation::${ratings[rating_index]} - Failed`)
                }
                check_index += 1
            }
        }
        console.log(`test_${component_type}_builds::${spec_type}_allocation::${ratings[rating_index]} - Passed`)
    }
}

const MODULE_TYPES = [
    "DDR",
    "DDR2", 
    "DDR3", 
    "DDR4",
]

const test_memory_builds = () => {
    console.log("Starting test_memory_builds tests...")
    const memory_number_test_allocations = {
        speed: {
            memory: {
                allocation: 0.1,
                speed: 0.5,
                total_size: 0.3,
                module_type: 0.2,
            },
        },
        total_size: {
            memory: {
                allocation: 0.1,
                speed: 0.3,
                total_size: 0.5,
                module_type: 0.2,
            },
        }
    }
    numberAllocationTester(memory_number_test_allocations, test_memorys, 'memory')
    const memory_module_type_test_allocations = {
        spec_type: 'module_type',
        DDR: {
            memory: {
                allocation: 0.1,
                speed: 0.25,
                total_size: 0.25,
                module_type: 0.5,
            },
        },
    }
    calcSlidingQualityRatingTester(memory_module_type_test_allocations, MODULE_TYPES, test_memorys, 'memory')
}



const running_tests = async () => {
    try {
        test_cpu_builds()
        test_videocard_builds()
        test_motherboard_builds()
        test_memory_builds()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()