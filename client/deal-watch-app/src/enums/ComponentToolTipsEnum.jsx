import { CPU_PROPERTIES, VIDEOCARD_PROPERTIES, MOTHERBOARD_PROPERTIES, MEMORY_PROPERTIES, HARD_DRIVE_PROPERTIES, POWER_SUPPLY_PROPERTIES, CASE_PROPERTIES } from "./ComponentPropertiesEnums";
import ComponentTypes from "./ComponentTypesEnum";

export const CPU_PROPERTY_TOOL_TIPS = Object.freeze({
    [CPU_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Central_processing_unit' },
    [CPU_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [CPU_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [CPU_PROPERTIES.CORES]: { 
        DESCRIPTION: 'More cores allow a PC to handle more tasks at once, improving performance for applications that can utilize multiple cores', 
        WIKI: 'https://en.wikipedia.org/wiki/Multi-core_processor' 
    },
    [CPU_PROPERTIES.BASE_CLOCK]: { 
        DESCRIPTION: 'The speed at which the CPU operates when idle or under low load', 
        WIKI: 'https://en.wikipedia.org/wiki/Clock_rate' 
    },
    [CPU_PROPERTIES.BOOST_CLOCK]: { 
        DESCRIPTION: 'The maximum speed the CPU can achieve under high load', 
        WIKI: 'https://en.wikipedia.org/wiki/Clock_rate' 
    },
    [CPU_PROPERTIES.MULTI_THREADING]: { 
        DESCRIPTION: 'Indicates if the CPU supports multi-threading, allowing for better multitasking', 
        WIKI: 'https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)' 
    },
    [CPU_PROPERTIES.INTEGRATED_GRAPHICS]: { 
        DESCRIPTION: 'Indicates if the CPU has built-in graphics processing capabilities', 
        WIKI: 'https://en.wikipedia.org/wiki/Graphics_processing_unit' 
    }
});

export const VIDEOCARD_PROPERTY_TOOL_TIPS = Object.freeze({
    [VIDEOCARD_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Video_card' },
    [VIDEOCARD_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [VIDEOCARD_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [VIDEOCARD_PROPERTIES.CHIPSET]: { 
        DESCRIPTION: 'The main processing unit of the video card', 
        WIKI: 'https://en.wikipedia.org/wiki/Graphics_processing_unit' 
    },
    [VIDEOCARD_PROPERTIES.VRAM]: { 
        DESCRIPTION: `Video RAM, which affects the card’s ability to handle high-resolution textures and complex scenes`, 
        WIKI: 'https://en.wikipedia.org/wiki/Video_RAM' 
    },
    [VIDEOCARD_PROPERTIES.BASE_CLOCK]: { 
        DESCRIPTION: 'The speed at which the GPU operates when idle or under low load', 
        WIKI: 'https://en.wikipedia.org/wiki/Clock_rate' 
    },
    [VIDEOCARD_PROPERTIES.BOOST_CLOCK]: { 
        DESCRIPTION: 'The maximum speed the GPU can achieve under high load', 
        WIKI: 'https://en.wikipedia.org/wiki/Clock_rate' 
    }
});

export const MOTHERBOARD_PROPERTY_TOOL_TIPS = Object.freeze({
    [MOTHERBOARD_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Motherboard' },
    [MOTHERBOARD_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [MOTHERBOARD_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [MOTHERBOARD_PROPERTIES.SOCKET]: { 
        DESCRIPTION: 'The type of CPU socket, which determines CPU compatibility', 
        WIKI: 'https://en.wikipedia.org/wiki/CPU_socket' 
    },
    [MOTHERBOARD_PROPERTIES.FORM_FACTOR]: { 
        DESCRIPTION: 'The size and shape of the motherboard, affecting case compatibility', 
        WIKI: 'https://en.wikipedia.org/wiki/Computer_form_factor' 
    },
    [MOTHERBOARD_PROPERTIES.RAM_SLOTS]: { 
        DESCRIPTION: 'The number of slots available for RAM modules', 
        WIKI: 'https://en.wikipedia.org/wiki/DIMM' 
    },
    [MOTHERBOARD_PROPERTIES.MAX_RAM]: { 
        DESCRIPTION: 'The maximum amount of RAM the motherboard can support', 
        WIKI: 'https://en.wikipedia.org/wiki/Random-access_memory' 
    }
});

export const MEMORY_PROPERTY_TOOL_TIPS = Object.freeze({
    [MEMORY_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Computer_memory' },
    [MEMORY_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [MEMORY_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [MEMORY_PROPERTIES.MODULE_TYPE]: { 
        DESCRIPTION: 'The type of memory module, such as DDR4 or DDR5', 
        WIKI: 'https://en.wikipedia.org/wiki/DDR_SDRAM' 
    },
    [MEMORY_PROPERTIES.SPEED]: { 
        DESCRIPTION: 'The speed of the memory, affecting data transfer rates', 
        WIKI: 'https://en.wikipedia.org/wiki/DDR_SDRAM' 
    },
    [MEMORY_PROPERTIES.NUMBER_OF_MODULES]: { DESCRIPTION: 'The number of memory modules included in the kit', WIKI: null },
    [MEMORY_PROPERTIES.MODULE_SIZE]: { DESCRIPTION: 'The size of each memory module', WIKI: null },
    [MEMORY_PROPERTIES.TOTAL_SIZE]: { DESCRIPTION: 'The total amount of memory available', WIKI: 'https://en.wikipedia.org/wiki/Random-access_memory' },
    [MEMORY_PROPERTIES.FIRST_WORD_LATENCY]: { 
        DESCRIPTION: 'The delay before the first word of data is available', 
        WIKI: 'https://en.wikipedia.org/wiki/Memory_latency' 
    },
    [MEMORY_PROPERTIES.CAS_TIMING]: { 
        DESCRIPTION: 'The delay between the memory controller requesting data and the data being available', 
        WIKI: 'https://en.wikipedia.org/wiki/CAS_latency' 
    },
    [MEMORY_PROPERTIES.PRICE_PER_GB]: { DESCRIPTION: 'The cost of the memory per gigabyte', WIKI: null }
});

export const HARD_DRIVE_PROPERTY_TOOL_TIPS = Object.freeze({
    [HARD_DRIVE_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Hard_disk_drive' },
    [HARD_DRIVE_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [HARD_DRIVE_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [HARD_DRIVE_PROPERTIES.CAPACITY]: { DESCRIPTION: 'The total storage capacity of the hard drive', WIKI: null },
    [HARD_DRIVE_PROPERTIES.PRICE_PER_GB]: { DESCRIPTION: 'The cost of storage per gigabyte', WIKI: null },
    [HARD_DRIVE_PROPERTIES.STORAGE_TYPE]: { 
        DESCRIPTION: 'The type of storage, such as HDD or SSD', 
        WIKI: 'https://en.wikipedia.org/wiki/Hard_disk_drive' 
    },
    [HARD_DRIVE_PROPERTIES.FORM_FACTOR]: { 
        DESCRIPTION: 'The size and shape of the hard drive, affecting compatibility', 
        WIKI: 'https://en.wikipedia.org/wiki/Hard_disk_drive_form_factor' 
    },
    [HARD_DRIVE_PROPERTIES.INTERFACE]: { 
        DESCRIPTION: 'The connection type used to connect the hard drive to the motherboard', 
        WIKI: 'https://en.wikipedia.org/wiki/Serial_ATA' 
    },
    [HARD_DRIVE_PROPERTIES.PLATTER_RPM]: { 
        DESCRIPTION: 'The speed at which the platters spin, affecting data access speeds', 
        WIKI: 'https://en.wikipedia.org/wiki/Hard_disk_drive#Disk_rotational_speeds' 
    },
    [HARD_DRIVE_PROPERTIES.CACHE_AMOUNT]: { 
        DESCRIPTION: 'The amount of cache memory available, affecting data transfer speeds', 
        WIKI: 'https://en.wikipedia.org/wiki/Cache_(computing)' 
    }
});

export const POWER_SUPPLY_PROPERTY_TOOL_TIPS = Object.freeze({
    [POWER_SUPPLY_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Power_supply_unit_(computer)' },
    [POWER_SUPPLY_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [POWER_SUPPLY_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [POWER_SUPPLY_PROPERTIES.FORM_FACTOR]: { 
        DESCRIPTION: 'The size and shape of the power supply, affecting case compatibility', 
        WIKI: 'https://en.wikipedia.org/wiki/Power_supply_unit_(computer)#Form_factors' 
    },
    [POWER_SUPPLY_PROPERTIES.EFFICIENCY_RATING]: { 
        DESCRIPTION: 'The efficiency of the power supply, affecting power consumption and heat output', 
        WIKI: 'https://en.wikipedia.org/wiki/80_Plus' 
    },
    [POWER_SUPPLY_PROPERTIES.WATTAGE]: { 
        DESCRIPTION: 'The total power output available, affecting the ability to power components', 
        WIKI: 'https://en.wikipedia.org/wiki/Power_supply_unit_(computer)' 
    },
    [POWER_SUPPLY_PROPERTIES.MODULAR]: { 
        DESCRIPTION: 'Indicates if the power supply has detachable cables for better cable management', 
        WIKI: 'https://en.wikipedia.org/wiki/Power_supply_unit_(computer)#Modular_cabling' 
    }
});

export const CASE_PROPERTY_TOOL_TIPS = Object.freeze({
    [CASE_PROPERTIES.TYPE]: { DESCRIPTION: 'Type of part', WIKI: 'https://en.wikipedia.org/wiki/Computer_case' },
    [CASE_PROPERTIES.MODEL]: { DESCRIPTION: 'Model of part', WIKI: null },
    [CASE_PROPERTIES.BRAND]: { DESCRIPTION: 'Brand of part', WIKI: null },
    [CASE_PROPERTIES.FORM_FACTOR]: { 
        DESCRIPTION: 'The size and shape of the case, affecting motherboard and component compatibility', 
        WIKI: 'https://en.wikipedia.org/wiki/Computer_case#Form_factors' 
    },
    [CASE_PROPERTIES.COLOR]: { DESCRIPTION: 'The color of the case', WIKI: null },
    [CASE_PROPERTIES.INTERNAL_BAYS]: { DESCRIPTION: 'The number of internal bays available for storage devices', WIKI: null },
    [CASE_PROPERTIES.EXTERNAL_BAYS]: { DESCRIPTION: 'The number of external bays available for devices like optical drives', WIKI: null },
    [CASE_PROPERTIES.PSU_WATTAGE]: { DESCRIPTION: 'The wattage of the included power supply, if applicable', WIKI: null },
    [CASE_PROPERTIES.SIDE_PANEL]: { DESCRIPTION: 'The type of side panel, such as transparent or solid', WIKI: null },
    [CASE_PROPERTIES.COLORS]: { DESCRIPTION: 'Available color options for the case', WIKI: null }
});

export const TOOL_TIPCS_DICT = {
    [ComponentTypes.CPU]: CPU_PROPERTY_TOOL_TIPS,
    [ComponentTypes.VIDEOCARD]: VIDEOCARD_PROPERTY_TOOL_TIPS,
    [ComponentTypes.MOTHERBOARD]: MOTHERBOARD_PROPERTY_TOOL_TIPS,
    [ComponentTypes.MEMORY]: MEMORY_PROPERTY_TOOL_TIPS,
    [ComponentTypes.HARD_DRIVE]: HARD_DRIVE_PROPERTY_TOOL_TIPS,
    [ComponentTypes.POWER_SUPPLY]: POWER_SUPPLY_PROPERTY_TOOL_TIPS,
    [ComponentTypes.CASE]: CASE_PROPERTY_TOOL_TIPS,
};