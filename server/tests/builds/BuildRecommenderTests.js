const { TestError } = require("../../errors/TestError")
const ComponentTypes = require("../../models/part_models/ComponentTypesEnum")
const { PERFORMANCE_PRIORITIES, COMPARED_KEYS, MODE, ComponentSpecs, RATINGS} = require('../../modules/builds/BuildConstants.js')
const { generalComparator } = require("../../modules/builds/BuildRecommender")
const { getPerformanceAllocations } = require('../../modules/builds/BuildModes.js')
const { userAllocations500, test_cpus, test_videocards, test_motherboards, test_memorys, test_hard_drives, test_power_supplys, test_cases } = require("./test_builds")

const numberAllocationTester = (test_allocations, parts, component_type) => {
    for (let spec_type of Object.keys(test_allocations)) {
        let mode = MODE.DEFAULT
        if (spec_type === ComponentSpecs.PCPP_PRICE) {
            mode = MODE.BUDGET
        }
        const allocations = test_allocations[spec_type]
        const sortedParts = [...parts]
        sortedParts.sort((a, b) => generalComparator(a, b, allocations, component_type, mode))
        if (spec_type === ComponentSpecs.COLOR) {
            const resultColor = sortedParts[sortedParts.length-1].model.split(' ')[1]
            if (test_allocations[spec_type]['case'][ComponentSpecs.COLOR]['colors'].includes(resultColor)) {
                console.log(`test_${component_type}_builds::${spec_type}_allocation - Passed`)
                continue
            }
        } else if (sortedParts[sortedParts.length-1].model === spec_type) {
            console.log(`test_${component_type}_builds::${spec_type}_allocation - Passed`)
            continue
        }
        throw new TestError(`test_${component_type}_builds::${spec_type}_allocation - Failed`)
    }
}

const calcSlidingQualityRatingTester = (test_allocations, test_ratings, parts, component_type) => {
    for (let spec_type of Object.keys(test_allocations)) {
        const allocations = test_allocations[spec_type]
        const ratings = test_ratings[spec_type]
        const sortedParts = [...parts]
        sortedParts.sort((a, b) => generalComparator(a, b, allocations, component_type, MODE.DEFAULT))
        for (let part_index in sortedParts) {
            part_index = Number(part_index)
            if(part_index === 0) {
                continue
            }
            const part_rating = sortedParts[part_index][spec_type]
            const part_rating_index = ratings.indexOf(part_rating)
            if (part_rating_index === -1) {
                throw new TestError(`test_${component_type}_builds::${spec_type}_allocation - Failed`)
            }
            const prev_part_rating = sortedParts[part_index-1][spec_type]
            const prev_part_rating_index = ratings.indexOf(prev_part_rating)
            if (prev_part_rating_index === -1) {
                throw new TestError(`test_${component_type}_builds::${spec_type}_allocation - Failed`)
            }
            if (prev_part_rating_index > part_rating_index && sortedParts[part_rating_index]['model'] !== 'form_factor') {
                throw new TestError(`test_${component_type}_builds::${spec_type}_allocation - Failed`)
            }
        }
        console.log(`test_${component_type}_builds::${spec_type}_allocation - Passed`)
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
        },
        pcpp_price: {
            cpu: {
                allocation: 0.2,
                cores: 0.33,
                base_clock: 0.33,
                boost_clock: 0.33,
            }
        },
    }

    numberAllocationTester(cpu_number_test_allocations, test_cpus, ComponentTypes.CPU)
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
        },
        pcpp_price: {
            'video-card': {
                allocation: 0.2,
                vram: 0.33,
                base_clock: 0.33,
                boost_clock: 0.33,
            }
        },
    }

    numberAllocationTester(videocard_number_test_allocations, test_videocards, ComponentTypes.VIDEOCARD)
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
        },
        pcpp_price: {
            motherboard: {
                allocation: 0.15,
                ram_slots: 0.2,
                max_ram: 0.2,
                socket: 'AM3+/AM3',
                form_factor: 'ATX',
            },
        },
    }
    numberAllocationTester(motherboard_number_test_allocations, test_motherboards, ComponentTypes.MOTHERBOARD)
}

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
        },
        pcpp_price: {
            memory: {
                allocation: 0.1,
                speed: 0.33,
                total_size: 0.33,
                module_type: 0.33,
            },
        },
    }
    numberAllocationTester(memory_number_test_allocations, test_memorys, ComponentTypes.MEMORY)
    const memory_module_type_test_allocations = {
        module_type: {
            memory: {
                allocation: 0.1,
                speed: 0.25,
                total_size: 0.25,
                module_type: 0.5,
            },
        },
    }
    calcSlidingQualityRatingTester(memory_module_type_test_allocations, RATINGS, test_memorys, ComponentTypes.MEMORY)
}

const test_hard_drive_builds = () => {
    console.log("Starting test_hard_drive_builds tests...")
    const hard_drive_number_test_allocations = {
        capacity: {
            'hard-drive': {
                allocation: 0.1,
                capacity: .6,
                storage_type: 0.4,
            },
        },
        pcpp_price: {
            'hard-drive': {
                allocation: 0.1,
                capacity: .25,
                storage_type: 0.25,
            },
        },
    }
    numberAllocationTester(hard_drive_number_test_allocations, test_hard_drives, ComponentTypes.HARD_DRIVE)
    const hard_drive_storage_type_test_allocations = {
        storage_type: {
            'hard-drive': {
                allocation: 0.1,
                capacity: .4,
                storage_type: 0.6,
            },
        },
    }
    calcSlidingQualityRatingTester(hard_drive_storage_type_test_allocations, RATINGS, test_hard_drives, ComponentTypes.HARD_DRIVE)
}

const test_power_supply_builds = () => {
    console.log("Starting test_power_supply_builds tests...")
    const power_supply_number_test_allocations = {
        wattage: {
            'power-supply': {
                allocation: 0.1,
                wattage: .5,
                efficiency_rating: 0.25,
                form_factor: 'ATX',
                modular: 0.25,
            },
        },
        form_factor: {
            'power-supply': {
                allocation: 0.1,
                wattage: .5,
                efficiency_rating: 0.25,
                form_factor: 'Mini ATX',
                modular: 0.25,
            },
        },
        pcpp_price: {
            'power-supply': {
                allocation: 0.1,
                wattage: .2,
                efficiency_rating: 0.2,
                form_factor: 'ATX',
                modular: 0.2,
            },
        },
    }
    numberAllocationTester(power_supply_number_test_allocations, test_power_supplys, ComponentTypes.POWER_SUPPLY)
    const power_supply_efficiency_rating_and_modular_test_allocations = {
        efficiency_rating: {
            'power-supply': {
                allocation: 0.1,
                wattage: .2,
                efficiency_rating: 0.6,
                form_factor: 'ATX',
                modular: 0.2,
            },
        },
        modular: {
            'power-supply': {
                allocation: 0.1,
                wattage: .25,
                efficiency_rating: 0.25,
                form_factor: 'ATX',
                modular: 0.5,
            },
        },
    }
    calcSlidingQualityRatingTester(power_supply_efficiency_rating_and_modular_test_allocations, RATINGS, test_power_supplys, ComponentTypes.POWER_SUPPLY)
}

const test_case_builds = () => {
    console.log("Starting test_case_builds tests...")
    const case_number_test_allocations = {
        form_factor: {
            case: {
                allocation: 0.1,
                form_factor: 'HTPC',
                'internal-bays': 0.6,
                color: {
                    allocation: 0.4,
                    colors: ['Black'],
                },
            },
        },
        internal_bays: {
            case: {
                allocation: 0.1,
                form_factor: 'ATX',
                internal_bays: 0.6,
                color: {
                    allocation: 0.4,
                    colors: ['Black'],
                },
            },
        },
        color: {
            case: {
                allocation: 0.1,
                form_factor: 'ATX',
                internal_bays: 0.4,
                color: {
                    allocation: 0.6,
                    colors: ['White'],
                },
            },
        },
        pcpp_price: {
            case: {
                allocation: 0.1,
                form_factor: 'ATX',
                internal_bays: 0.25,
                color: {
                    allocation: 0.25,
                    colors: ['White'],
                },
            },
        },
    }
    numberAllocationTester(case_number_test_allocations, test_cases, ComponentTypes.CASE)
}

const test_performance_mode_allocations = () => {
    console.log("Starting performance mode tests...")
    const componentAllocations = {...userAllocations500['components']}
    const performanceAllocations = getPerformanceAllocations(componentAllocations, 0.2)
    for (let component_key of Object.keys(componentAllocations)) {
        const originalComponentDict = componentAllocations[component_key]
        const performanceComponentDict = performanceAllocations[component_key]
        const componentPropertyKeys = Object.keys(originalComponentDict).filter(key => COMPARED_KEYS.includes(key))
        for (let key of componentPropertyKeys) {
            let originalAllocation = 0
            let performanceAllocation = 0
            switch (typeof originalComponentDict[key]) {
                case 'number':
                    originalAllocation = originalComponentDict[key]
                    performanceAllocation = performanceComponentDict[key]
                    break
                case 'dict':
                    originalAllocation = originalComponentDict[key]['allocation']
                    performanceAllocation = performanceComponentDict[key]['allocation']
                    break
            }
            if (PERFORMANCE_PRIORITIES.includes(key) && performanceAllocation < originalAllocation) {
                console.log(`test_performance_mode_allocations - Failed`)
                throw new TestError(`test_performance_mode_allocations - Failed`)
            }
        }
    }
    console.log(`test_performance_mode_allocations - Passed`)
}


const running_tests = async () => {
    try {
        test_cpu_builds()
        test_videocard_builds()
        test_motherboard_builds()
        test_memory_builds()
        test_hard_drive_builds()
        test_power_supply_builds()
        test_case_builds()
        test_performance_mode_allocations()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()