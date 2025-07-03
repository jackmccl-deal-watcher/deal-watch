const CPU_PROPERTIES = Object.freeze({
    TYPE: 'cpu',
    MODEL: 'model',
    BRAND: 'brand',
    CORES: 'cores',
    BASE_CLOCK: 'base_clock',
    BOOST_CLOCK: 'boost_clock',
    MULTI_THREADING: 'multithreading',
    INTEGRATED_GRAPHICS: 'integrated_graphics'
});

const VIDEOCARD_PROPERTIES = Object.freeze({
    TYPE: 'video-card',
    MODEL: 'model',
    BRAND: 'brand',
    CHIPSET: 'chipset',
    VRAM: 'vram',
    BASE_CLOCK: 'base_clock',
    BOOST_CLOCK: 'boost_clock',
});

const MOTHERBOARD_PROPERTIES = Object.freeze({
    TYPE: 'motherboard',
    MODEL: 'model',
    BRAND: 'brand',
    SOCKET: 'socket',
    FORM_FACTOR: 'form_factor',
    RAM_SLOTS: 'ram_slots',
    MAX_RAM: 'max_ram',
});

const MEMORY_PROPERTIES = Object.freeze({
    TYPE: 'memory',
    MODEL: 'model',
    BRAND: 'brand',
    MODULE_TYPE: 'module_type',
    SPEED: 'speed',
    NUMBER_OF_MODULES: 'number_of_modules',
    MODULE_SIZE: 'module_size',
    TOTAL_SIZE: 'total_size',
    FIRST_WORD_LATENCY: 'first_word_latency',
    CAS_TIMING: 'cas_timing',
    PRICE_PER_GB: 'price_per_gb',
});

const HARD_DRIVE_PROPERTIES = Object.freeze({
    TYPE: 'hard-drive',
    MODEL: 'model',
    BRAND: 'brand',
    CAPACITY: 'capacity',
    PRICE_PER_GB: 'price_per_gb',
    STORAGE_TYPE: 'storage_type',
    FORM_FACTOR: 'form_factor',
    INTERFACE: 'interface',
    PLATTER_RPM: 'platter_rpm',
    CACHE_AMOUNT: 'cache_amount',
});

const POWER_SUPPLY_PROPERTIES = Object.freeze({
    TYPE: 'power-supply',
    MODEL: 'model',
    BRAND: 'brand',
    FORM_FACTOR: 'form_factor',
    EFFICIENCY_RATING: 'efficiency_rating',
    WATTAGE: 'wattage',
    MODULAR: "modular",
});

const CASE_PROPERTIES = Object.freeze({
    TYPE: 'case',
    MODEL: 'model',
    BRAND: 'brand',
    FORM_FACTOR: 'form_factor',
    COLOR: 'color',
    INTERNAL_BAYS: 'internal_bays',
    EXTERNAL_BAYS: "external_bays",
    PSU_WATTAGE: 'psu_wattage',
    SIDE_PANEL: 'side_panel',
});

module.exports = { CPU_PROPERTIES, VIDEOCARD_PROPERTIES, MOTHERBOARD_PROPERTIES, MEMORY_PROPERTIES, HARD_DRIVE_PROPERTIES, POWER_SUPPLY_PROPERTIES, CASE_PROPERTIES}