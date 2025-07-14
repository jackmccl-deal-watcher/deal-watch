const CPUModel = require('../../models/part_models/CPUModel.js')
const VideoCardModel = require('../../models/part_models/VideoCardModel.js')
const MotherboardModel = require('../../models/part_models/MotherboardModel.js')
const MemoryModel = require('../../models/part_models/MemoryModel.js')
const HardDriveModel = require('../../models/part_models/HardDriveModel.js')
const PowerSupplyModel = require('../../models/part_models/PowerSupplyModel.js')
const CaseModel = require('../../models/part_models/CaseModel.js')

const ComponentSpecs = Object.freeze({
    TYPE: 'cpu',
    MODEL: 'model',
    BRAND: 'brand',
    CORES: 'cores',
    BASE_CLOCK: 'base_clock',
    BOOST_CLOCK: 'boost_clock',
    MULTI_THREADING: 'multithreading',
    INTEGRATED_GRAPHICS: 'integrated_graphics',
    CHIPSET: 'chipset',
    VRAM: 'vram',
    SOCKET: 'socket',
    FORM_FACTOR: 'form_factor',
    RAM_SLOTS: 'ram_slots',
    MAX_RAM: 'max_ram',
    MODULE_TYPE: 'module_type',
    SPEED: 'speed',
    NUMBER_OF_MODULES: 'number_of_modules',
    MODULE_SIZE: 'module_size',
    TOTAL_SIZE: 'total_size',
    FIRST_WORD_LATENCY: 'first_word_latency',
    CAS_TIMING: 'cas_timing',
    PRICE_PER_GB: 'price_per_gb',
    CAPACITY: 'capacity',
    STORAGE_TYPE: 'storage_type',
    INTERFACE: 'interface',
    PLATTER_RPM: 'platter_rpm',
    CACHE_AMOUNT: 'cache_amount',
    EFFICIENCY_RATING: 'efficiency_rating',
    WATTAGE: 'wattage',
    MODULAR: "modular",
    COLOR: 'color',
    INTERNAL_BAYS: 'internal_bays',
    EXTERNAL_BAYS: "external_bays",
    PSU_WATTAGE: 'psu_wattage',
    SIDE_PANEL: 'side_panel',
    THIRTY_DAY_AVERAGE: 'thirty_day_average',
    THIRTY_DAY_TIME: 'thirty_day_time',
    THIRTY_DAY_LISTING_COUNT: 'thirty_day_listing_count',
    PCPP_PRICE: 'pcpp_price',
})

const MODEL_DICT = {
    'cpu': CPUModel,
    'video-card': VideoCardModel,
    'motherboard': MotherboardModel,
    'memory': MemoryModel,
    'hard-drive': HardDriveModel,
    'power-supply': PowerSupplyModel,
    'case': CaseModel,
}

// In order of "increasing" quality
const MODULARITIES = [
    "No", 
    "Semi", 
    "Full",
]
const MODULE_TYPES = [
    "DDR",
    "DDR2", 
    "DDR3", 
    "DDR4",
]
const STORAGE_TYPES = [
    "HDD", 
    "Hybrid", 
    "SSD",
]

const EFFICIENCY_RATINGS = [
    "80+",
    "80+ Bronze",
    "80+ Silver",
    "80+ Gold",
    "80+ Platinum",
    "80+ Titanium",
]

const BUDGET_MARGIN = 0.10

const BUDGET_PRICE_ALLOCATION = 0.4
const BALANCED_PRICE_ALLOCATION = 0.2
const PERFORMANCE_PRICE_ALLOCATION = 0

const PERFORMANCE_ALLOCATION = 0.5

const COMPARED_KEYS = [
    ComponentSpecs.CORES,
    ComponentSpecs.BASE_CLOCK,
    ComponentSpecs.BOOST_CLOCK,
    ComponentSpecs.VRAM,
    ComponentSpecs.RAM_SLOTS,
    ComponentSpecs.MAX_RAM,
    ComponentSpecs.SOCKET,
    ComponentSpecs.FORM_FACTOR,
    ComponentSpecs.SPEED,
    ComponentSpecs.TOTAL_SIZE,
    ComponentSpecs.MODULE_TYPE,
    ComponentSpecs.CAPACITY,
    ComponentSpecs.STORAGE_TYPE,
    ComponentSpecs.WATTAGE,
    ComponentSpecs.EFFICIENCY_RATING,
    ComponentSpecs.MODULAR,
    ComponentSpecs.INTERNAL_BAYS,
    ComponentSpecs.COLOR,
]

const PERFORMANCE_PRIORITIES = [
    ComponentSpecs.BASE_CLOCK, 
    ComponentSpecs.BOOST_CLOCK, 
    ComponentSpecs.MAX_RAM, 
    ComponentSpecs.TOTAL_SIZE, 
    ComponentSpecs.MODULE_TYPE, 
    ComponentSpecs.STORAGE_TYPE,
    ComponentSpecs.WATTAGE,
]

const MODE = Object.freeze({
    BALANCED: 'balanced',
    BUDGET: 'budget',
    PERFORMANCE: 'performance',
});

const RATINGS = {
    module_type: MODULE_TYPES,
    storage_type: STORAGE_TYPES,
    modular: MODULARITIES,
    efficiency_rating: EFFICIENCY_RATINGS,
}

const LISTING_DAY_AGE_LIMIT = 30
const MAX_LISTING_LIMIT = 100

module.exports = { ComponentSpecs, MODEL_DICT, MODULARITIES, MODULE_TYPES, STORAGE_TYPES, EFFICIENCY_RATINGS, BUDGET_MARGIN, COMPARED_KEYS, PERFORMANCE_PRIORITIES, MODE, RATINGS, LISTING_DAY_AGE_LIMIT, MAX_LISTING_LIMIT, BUDGET_PRICE_ALLOCATION, BALANCED_PRICE_ALLOCATION, PERFORMANCE_PRICE_ALLOCATION, PERFORMANCE_ALLOCATION }