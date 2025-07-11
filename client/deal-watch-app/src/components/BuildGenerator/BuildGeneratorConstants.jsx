import ComponentTypes from "../../component_enums/ComponentTypesEnum"

export const COMPONENT_ALLOCATION_MINIMUM = 0.1
export const COMPONENT_ALLOCATION_MAXIMUM = 0.3

export const SPEC_ALLOCATION_MINIMUM = 0.1
export const SPEC_ALLOCATION_MAXIMUM = 0.6

export const COMPONENT_TYPES_STARTING_ALLOCATIONS = [
    {
        type: ComponentTypes.CPU,
        allocation: 0.15,
    },
    {
        type: ComponentTypes.VIDEOCARD,
        allocation: 0.2,
    },
    {
        type: ComponentTypes.MOTHERBOARD,
        allocation: 0.15,
    },
    {
        type: ComponentTypes.MEMORY,
        allocation: 0.15,
    },
    {
        type: ComponentTypes.HARD_DRIVE,
        allocation: 0.15,
    },
    {
        type: ComponentTypes.POWER_SUPPLY,
        allocation: 0.1,
    },
    {
        type: ComponentTypes.CASE,
        allocation: 0.1,
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

export const FORM_FACTORS = [
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
    'Mini ITX Tower'
]