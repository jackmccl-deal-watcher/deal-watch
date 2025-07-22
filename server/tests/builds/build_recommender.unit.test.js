const ComponentTypes = require("../../models/part_models/ComponentTypesEnum.js")
const { PERFORMANCE_PRIORITIES, COMPARED_KEYS, MODE, ComponentSpecs, RATINGS} = require('../../modules/builds/BuildConstants.js')
const { generalComparator } = require("../../modules/builds/BuildRecommender.js")
const { getPerformanceAllocations } = require('../../modules/builds/BuildModes.js')
const { userAllocations500, test_cpus, test_videocards, test_motherboards, test_memorys, test_hard_drives, test_power_supplys, test_cases } = require("./test_builds.js")

const numberAllocationTester = (test_allocations, parts, component_type) => {
        for (let spec_type of Object.keys(test_allocations)) {
            test(`Test ${component_type} ${spec_type} rating system`, async () => {
            let mode = MODE.BALANCED
            if (spec_type === ComponentSpecs.PCPP_PRICE) {
                mode = MODE.BUDGET
            }
            const allocations = test_allocations[spec_type]
            const sortedParts = [...parts]
            sortedParts.sort((a, b) => generalComparator(a, b, allocations, component_type, mode))
            if (spec_type === ComponentSpecs.COLOR) {
                const resultColor = sortedParts[sortedParts.length-1].model.split(' ')[1]
                expect(test_allocations[spec_type]['case'][ComponentSpecs.COLOR]['colors']).toContain(resultColor)
            } else if (sortedParts[sortedParts.length-1].model === spec_type) {
                expect(sortedParts[sortedParts.length-1].model).toBe(spec_type)
            }
        })
    }
}

const calcSlidingQualityRatingTester = (test_allocations, test_ratings, parts, component_type) => {
    for (let spec_type of Object.keys(test_allocations)) {
        test(`Test ${component_type} ${spec_type} sliding quality rating`, async () => {
            const allocations = test_allocations[spec_type]
            const ratings = test_ratings[spec_type]
            const sortedParts = [...parts]
            sortedParts.sort((a, b) => generalComparator(a, b, allocations, component_type, MODE.BALANCED))
            for (let part_index in sortedParts) {
                part_index = Number(part_index)
                if(part_index === 0) {
                    continue
                }
                const part_rating = sortedParts[part_index][spec_type]
                const part_rating_index = ratings.indexOf(part_rating)
                expect(part_rating_index).toBeGreaterThan(-1)
                const prev_part_rating = sortedParts[part_index-1][spec_type]
                const prev_part_rating_index = ratings.indexOf(prev_part_rating)
                expect(prev_part_rating_index).toBeGreaterThan(-1)
                if (sortedParts[part_rating_index]['model'] !== 'form_factor') {
                    expect(prev_part_rating_index).toBeLessThanOrEqual(part_rating_index)
                }
            }
        })
    }
}

describe('Test cpu build part rating system', () => {
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
    };
    numberAllocationTester(cpu_number_test_allocations, test_cpus, ComponentTypes.CPU);
});

// Videocard Test
describe('Test videocard build part rating system', () => {
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
    };
    numberAllocationTester(videocard_number_test_allocations, test_videocards, ComponentTypes.VIDEOCARD);
});

// Motherboard Test
describe('Test motherboard build part rating system', () => {
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
    };
    numberAllocationTester(motherboard_number_test_allocations, test_motherboards, ComponentTypes.MOTHERBOARD);
});

// Memory Test
describe('Test memory build part rating system', () => {
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
    };
    numberAllocationTester(memory_number_test_allocations, test_memorys, ComponentTypes.MEMORY);
    const memory_module_type_test_allocations = {
        module_type: {
            memory: {
                allocation: 0.1,
                speed: 0.25,
                total_size: 0.25,
                module_type: 0.5,
            },
        },
    };
    calcSlidingQualityRatingTester(memory_module_type_test_allocations, RATINGS, test_memorys, ComponentTypes.MEMORY);
});

// Hard drive Test
describe('Test hard drive build part rating system', () => {
    const hard_drive_number_test_allocations = {
        capacity: {
            'hard-drive': {
                allocation: 0.1,
                capacity: 0.6,
                storage_type: 0.4,
            },
        },
        pcpp_price: {
            'hard-drive': {
                allocation: 0.1,
                capacity: 0.25,
                storage_type: 0.25,
            },
        },
    };
    numberAllocationTester(hard_drive_number_test_allocations, test_hard_drives, ComponentTypes.HARD_DRIVE);
    const hard_drive_storage_type_test_allocations = {
        storage_type: {
            'hard-drive': {
                allocation: 0.1,
                capacity: 0.4,
                storage_type: 0.6,
            },
        },
    };
    calcSlidingQualityRatingTester(hard_drive_storage_type_test_allocations, RATINGS, test_hard_drives, ComponentTypes.HARD_DRIVE);
});

// Power supply Test
describe('Test power supply build part rating system', () => {
    const power_supply_number_test_allocations = {
        wattage: {
            'power-supply': {
                allocation: 0.1,
                wattage: 0.5,
                efficiency_rating: 0.25,
                form_factor: 'ATX',
                modular: 0.25,
            },
        },
        form_factor: {
            'power-supply': {
                allocation: 0.1,
                wattage: 0.5,
                efficiency_rating: 0.25,
                form_factor: 'Mini ATX',
                modular: 0.25,
            },
        },
        pcpp_price: {
            'power-supply': {
                allocation: 0.1,
                wattage: 0.2,
                efficiency_rating: 0.2,
                form_factor: 'ATX',
                modular: 0.2,
            },
        },
    };
    numberAllocationTester(power_supply_number_test_allocations, test_power_supplys, ComponentTypes.POWER_SUPPLY);
    const power_supply_efficiency_rating_and_modular_test_allocations = {
        efficiency_rating: {
            'power-supply': {
                allocation: 0.1,
                wattage: 0.2,
                efficiency_rating: 0.6,
                form_factor: 'ATX',
                modular: 0.2,
            },
        },
        modular: {
            'power-supply': {
                allocation: 0.1,
                wattage: 0.25,
                efficiency_rating: 0.25,
                form_factor: 'ATX',
                modular: 0.5,
            },
        },
    };
    calcSlidingQualityRatingTester(power_supply_efficiency_rating_and_modular_test_allocations, RATINGS, test_power_supplys, ComponentTypes.POWER_SUPPLY);
});

// Case Test
describe('Test case build part rating system', () => {
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
    };
    numberAllocationTester(case_number_test_allocations, test_cases, ComponentTypes.CASE);
});

test('Test getPerformanceAllocations function', () => {
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
            expect(PERFORMANCE_PRIORITIES.includes(key) && performanceAllocation < originalAllocation).toBe(false)
        }
    }
})