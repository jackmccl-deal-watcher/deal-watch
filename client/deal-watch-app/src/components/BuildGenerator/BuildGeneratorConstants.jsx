import ComponentTypes from "../../component_enums/ComponentTypesEnum"
import { CPU_PROPERTIES, VIDEOCARD_PROPERTIES, MOTHERBOARD_PROPERTIES, MEMORY_PROPERTIES, HARD_DRIVE_PROPERTIES, POWER_SUPPLY_PROPERTIES, CASE_PROPERTIES } from "../../component_enums/ComponentPropertiesEnums"

export const COMPONENT_ALLOCATION_MINIMUM = 0.1
export const COMPONENT_ALLOCATION_MAXIMUM = 0.3

export const SPEC_ALLOCATION_MINIMUM = 0.1
export const SPEC_ALLOCATION_MAXIMUM = 0.6

export const COMPONENT_TYPES_STARTING_ALLOCATIONS = [
    {
        type: ComponentTypes.CPU,
        starting_allocation: 0.15,
    },
    {
        type: ComponentTypes.VIDEOCARD,
        starting_allocation: 0.2,
    },
    {
        type: ComponentTypes.MOTHERBOARD,
        starting_allocation: 0.15,
    },
    {
        type: ComponentTypes.MEMORY,
        starting_allocation: 0.15,
    },
    {
        type: ComponentTypes.HARD_DRIVE,
        starting_allocation: 0.15,
    },
    {
        type: ComponentTypes.POWER_SUPPLY,
        starting_allocation: 0.1,
    },
    {
        type: ComponentTypes.CASE,
        starting_allocation: 0.1,
    },
]

export const STARTING_BUDGET = 500

export const COLORS = [
    'Black',
    'Black / Black',
    'Black / Blue',
    'Black / Gold',
    'Black / Gray',
    'Black / Green',
    'Black / Multicolor',
    'Black / Orange',
    'Black / Pink',
    'Black / Red',
    'Black / Silver',
    'Black / White',
    'Black / Yellow',
    'Beige / Gray',
    'Blue',
    'Blue / Black',
    'Blue / Silver',
    'Blue / Yellow',
    'Brown',
    'Camo',
    'Clear',
    'Gold',
    'Gray',
    'Gray / Black',
    'Gray / Silver',
    'Green',
    'Green / Black',
    'Green / Silver',
    'Gunmetal',
    'Multicolor',
    'Orange',
    'Pink',
    'Red',
    'Red / Black',
    'Red / Blue',
    'Red / White',
    'Silver',
    'Silver / Black',
    'Silver / Gray',
    'Silver / Orange',
    'White',
    'White / Black',
    'White / Blue',
    'White / Purple',
    'White / Red',
    'White / Silver',
    'Yellow'
]

export const CASE_FORM_FACTORS = [
    'ATX Mid Tower',
    'ATX Full Tower',
    'MicroATX Mid Tower',
    'ATX Desktop',
    'ATX Mini Tower',
    'ATX Test Bench',
    'HTPC',
    'MicroATX Desktop',
    'MicroATX Mini Tower',
    'MicroATX Slim',
    'Mini ITX Desktop',
    'Mini ITX Test Bench',
    'Mini ITX Tower',
]

export const MOTHERBOARD_FORM_FACTORS = [
    'ATX',
    'EATX',
    'Flex ATX',
    'HPTX',
    'Micro ATX',
    'Mini DTX',
    'Mini ITX',
    'SSI CEB',
    'SSI EEB',
    'Thin Mini ITX',
    'XL ATX',
]

export const SOCKETS = [
    '2 x G34',
    '2 x LGA1366',
    '2 x LGA2011',
    '2 x LGA2011-3',
    '2 x LGA2011-3 Narrow',
    'AM1',
    'AM2',
    'AM2+/AM2',
    'AM3',
    'AM3+',
    'AM3+/AM3',
    'AM3/AM2+',
    'AM3/AM2+/AM2',
    'AM4',
    'FM1',
    'FM2',
    'FM2+',
    'Integrated A4-5000',
    'Integrated Athlon II X2 215',
    'Integrated Atom 230',
    'Integrated Atom 330',
    'Integrated Atom C2358',
    'Integrated Atom C2550',
    'Integrated Atom C2750',
    'Integrated Atom D2500',
    'Integrated Atom D2550',
    'Integrated Atom D2700',
    'Integrated Atom D410',
    'Integrated Atom D425',
    'Integrated Atom D510',
    'Integrated Atom D525',
    'Integrated Atom N550',
    'Integrated C-Series C-70',
    'Integrated Celeron 1037U',
    'Integrated Celeron 847',
    'Integrated Celeron J1900',
    'Integrated Celeron N3050',
    'Integrated Celeron N3150',
    'Integrated E-Series E-350',
    'Integrated E-Series E-450',
    'Integrated Pentium J3710',
    'Integrated Pentium N3700',
    'Integrated Xeon D-1520',
    'Integrated Xeon D-1521',
    'Integrated Xeon D-1537',
    'Integrated Xeon D-1541',
    'LGA1150',
    'LGA1151',
    'LGA1155',
    'LGA1156',
    'LGA1200',
    'LGA1366',
    'LGA2011',
    'LGA2011-3',
    'LGA2011-3 Narrow',
    'LGA2066',
    'LGA775',
    'sTR4',
    'sTRX4'
]

export const POWER_SUPPLY_FORM_FACTORS = [ 
    'ATX', 
    'BTX', 
    'Flex ATX', 
    'Micro ATX', 
    'Mini ITX', 
    'SFX', 
    'TFX'
]

export const FORM_CONFIG = {
    [ComponentTypes.CPU]: {
        component_type: ComponentTypes.CPU,
        component_name: "CPU",
        main_specs: [{ key: CPU_PROPERTIES.CORES, tag: 'Cores' }, { key: CPU_PROPERTIES.BASE_CLOCK, tag: 'Base Clock' }, { key: CPU_PROPERTIES.BOOST_CLOCK, tag: 'Boost Clock' }],
    },
    [ComponentTypes.VIDEOCARD]: {
        component_type: ComponentTypes.VIDEOCARD,
        component_name: "VideoCard",
        main_specs: [{ key: VIDEOCARD_PROPERTIES.VRAM, tag: 'Vram' }, { key: VIDEOCARD_PROPERTIES.BASE_CLOCK, tag: 'Base Clock' }, { key: VIDEOCARD_PROPERTIES.BOOST_CLOCK, tag: 'Boost Clock' }],
    },
    [ComponentTypes.MOTHERBOARD]: {
        component_type: ComponentTypes.MOTHERBOARD,
        component_name: "Motherboard",
        main_specs: [{ key: MOTHERBOARD_PROPERTIES.RAM_SLOTS, tag: 'Ram Slots' }, { key: MOTHERBOARD_PROPERTIES.MAX_RAM, tag: 'Max Ram' }],
        special_specs: {
            [MOTHERBOARD_PROPERTIES.FORM_FACTOR]: {   
                type: MOTHERBOARD_PROPERTIES.FORM_FACTOR,
                options: MOTHERBOARD_FORM_FACTORS,
                optionsType: 'Form Factor',
                currentOption: 'ATX',
                setCurrentOption: null,
            },
            [MOTHERBOARD_PROPERTIES.SOCKET]: {
                type: MOTHERBOARD_PROPERTIES.SOCKET,
                options: SOCKETS,
                optionsType: 'Socket',
                currentOption: 'LGA1151',
                setCurrentOption: null,
            }
        }
    },
    [ComponentTypes.MEMORY]: {
        component_type: ComponentTypes.MEMORY,
        component_name: "Memory",
        main_specs: [{ key: MEMORY_PROPERTIES.SPEED, tag: 'Speed' }, { key: MEMORY_PROPERTIES.TOTAL_SIZE, tag: 'Total Size' }, { key: MEMORY_PROPERTIES.MODULE_TYPE, tag: 'Module Type' }],
    },
    [ComponentTypes.HARD_DRIVE]: {
        component_type: ComponentTypes.HARD_DRIVE,
        component_name: "Hard Drive",
        main_specs: [{ key: HARD_DRIVE_PROPERTIES.CAPACITY, tag: 'Capacity' }, { key: HARD_DRIVE_PROPERTIES.STORAGE_TYPE, tag: 'Storage Type' }],
    },
    [ComponentTypes.POWER_SUPPLY]: {
        component_type: ComponentTypes.POWER_SUPPLY,
        component_name: "Power Supply",
        main_specs: [{ key: POWER_SUPPLY_PROPERTIES.WATTAGE, tag: 'Wattage' }, { key: POWER_SUPPLY_PROPERTIES.EFFICIENCY_RATING, tag: 'Efficiency Rating' }, { key: POWER_SUPPLY_PROPERTIES.MODULAR, tag: 'Modularity' }],
        special_specs: {
            [POWER_SUPPLY_PROPERTIES.FORM_FACTOR]: {
                type: POWER_SUPPLY_PROPERTIES.FORM_FACTOR,
                options: POWER_SUPPLY_FORM_FACTORS,
                optionsType: 'Form Factor',
                currentOption: 'ATX',
                setCurrentOption: null,
            },
        }
    },
    [ComponentTypes.CASE]: {
        component_type: ComponentTypes.CASE,
        component_name: "Case",
        main_specs: [{ key: CASE_PROPERTIES.INTERNAL_BAYS, tag: 'Internal Bays' }, { key: CASE_PROPERTIES.COLOR, tag: 'Color' }],
        special_specs: {
            [CASE_PROPERTIES.FORM_FACTOR]: {
                type: CASE_PROPERTIES.FORM_FACTOR,
                options: CASE_FORM_FACTORS,
                optionsType: 'Form Factor',
                currentOption: 'ATX Mid Tower',
                setCurrentOption: null,
            },
            [CASE_PROPERTIES.COLOR]: {
                type: CASE_PROPERTIES.COLOR,
                options: COLORS,
                optionsType: 'Colors',
                currentOption: ['Black'],
                setCurrentOption: null,
            }
        }
    },
}