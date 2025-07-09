const userAllocations500 = {
	'budget': 500,
    'components': {
        'cpu': {
            allocation: 0.2,
            cores: 0.3,
            base_clock: 0.5,
            boost_clock: 0.2,
        },
        'video-card': {
            allocation: 0.25,
            vram: 0.5,
            base_clock: 0.4,
            boost_clock: 0.1,
        },
        'motherboard': {
            allocation: 0.15,
            ram_slots: 0.5,
            max_ram: 0.4,
            socket: 'LGA1151',
            form_factor: 'ATX',
        },
        'memory': {
            allocation: 0.1,
            speed: 0.3,
            total_size: 0.5,
            module_type: 0.2,
        },
        'hard-drive': {
            allocation: 0.1,
            capacity: .4,
            storage_type: 0.6,
        },
        'power-supply': {
            allocation: 0.1,
            wattage: .6,
            efficiency_rating: 0.2,
            form_factor: 'ATX',
            modular: 0.2,
        },
        'case': {
            allocation: 0.1,
            form_factor: 'ATX',
            'internal-bays': 0.5,
            color: {
                allocation: 0.5,
                colors: ['Black'],
            },
        },
    }
}

const test_cpus = [
    {
        "_id": {
            "$oid": "686dabf8a10f5924279b02a4"
        },
        "type": "cpu",
        "model": "pcppPrice",
        "brand": "AMD",
        "cores": 6,
        "base_clock": 2800000000,
        "multithreading": false,
        "thirtyDayAverage": -1,
        "thirtyDayTime": 1752018563449,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.43,
        "boost_clock": 3200000000,
        "integrated_graphics": "none"
    },
    {
        "_id": {
            "$oid": "686dabf8a10f5924279b02a4"
        },
        "type": "cpu",
        "model": "cores",
        "brand": "AMD",
        "cores": 8,
        "base_clock": 2800000000,
        "multithreading": false,
        "thirtyDayAverage": -1,
        "thirtyDayTime": 1752018563449,
        "thirtyDayListingCount": 0,
        "pcppPrice": 80.43,
        "boost_clock": 3200000000,
        "integrated_graphics": "none"
    },
    {
        "_id": {
            "$oid": "686dabf8a10f5924279b02a4"
        },
        "type": "cpu",
        "model": "base_clock",
        "brand": "AMD",
        "cores": 6,
        "base_clock": 3200000000,
        "multithreading": false,
        "thirtyDayAverage": -1,
        "thirtyDayTime": 1752018563449,
        "thirtyDayListingCount": 0,
        "pcppPrice": 80.43,
        "boost_clock": 3200000000,
        "integrated_graphics": "none"
    },
    {
        "_id": {
            "$oid": "686dabf8a10f5924279b02a4"
        },
        "type": "cpu",
        "model": "boost_clock",
        "brand": "AMD",
        "cores": 6,
        "base_clock": 2800000000,
        "multithreading": false,
        "thirtyDayAverage": -1,
        "thirtyDayTime": 1752018563449,
        "thirtyDayListingCount": 0,
        "pcppPrice": 80.43,
        "boost_clock": 3800000000,
        "integrated_graphics": "none"
    },
    {
        "_id": {
            "$oid": "686dabf8a10f5924279b02a4"
        },
        "type": "cpu",
        "model": "base",
        "brand": "AMD",
        "cores": 6,
        "base_clock": 2800000000,
        "multithreading": false,
        "thirtyDayAverage": -1,
        "thirtyDayTime": 1752018563449,
        "thirtyDayListingCount": 0,
        "pcppPrice": 80.43,
        "boost_clock": 3200000000,
        "integrated_graphics": "none"
    },
]

const test_videocards = [
    {
        "_id": {
        "$oid": "686da810a10f5924279a8df5"
        },
        "type": "video-card",
        "model": "pcppPrice",
        "brand": "Gigabyte",
        "chipset": "GeForce GTX 980",
        "vram": 4000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 78.24,
        "base_clock": 1228000000,
        "boost_clock": 1329000000
    },
    {
        "_id": {
        "$oid": "686da810a10f5924279a8df5"
        },
        "type": "video-card",
        "model": "vram",
        "brand": "Gigabyte",
        "chipset": "GeForce GTX 980",
        "vram": 5000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.24,
        "base_clock": 1228000000,
        "boost_clock": 1329000000
    },
    {
        "_id": {
        "$oid": "686da810a10f5924279a8df5"
        },
        "type": "video-card",
        "model": "base_clock",
        "brand": "Gigabyte",
        "chipset": "GeForce GTX 980",
        "vram": 4000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.24,
        "base_clock": 1628000000,
        "boost_clock": 1329000000
    },
    {
        "_id": {
        "$oid": "686da810a10f5924279a8df5"
        },
        "type": "video-card",
        "model": "boost_clock",
        "brand": "Gigabyte",
        "chipset": "GeForce GTX 980",
        "vram": 4000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.24,
        "base_clock": 1228000000,
        "boost_clock": 1729000000
    },
    {
        "_id": {
        "$oid": "686da810a10f5924279a8df5"
        },
        "type": "video-card",
        "model": "base",
        "brand": "Gigabyte",
        "chipset": "GeForce GTX 980",
        "vram": 4000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.24,
        "base_clock": 1228000000,
        "boost_clock": 1329000000
    },
]

const test_motherboards = [
    {
        "_id": {
        "$oid": "686da815a10f5924279a995f"
        },
        "type": "motherboard",
        "model": "pcppPrice",
        "brand": "ASRock",
        "socket": "AM3+/AM3",
        "form_factor": "ATX",
        "ram_slots": 2,
        "max_ram": 32000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 78.01
    },
    {
        "_id": {
        "$oid": "686da815a10f5924279a995f"
        },
        "type": "motherboard",
        "model": "ram_slots",
        "brand": "ASRock",
        "socket": "AM3+/AM3",
        "form_factor": "ATX",
        "ram_slots": 3,
        "max_ram": 32000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.01
    },
    {
        "_id": {
        "$oid": "686da815a10f5924279a995f"
        },
        "type": "motherboard",
        "model": "max_ram",
        "brand": "ASRock",
        "socket": "AM3+/AM3",
        "form_factor": "ATX",
        "ram_slots": 2,
        "max_ram": 44000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.01
    },
    {
        "_id": {
        "$oid": "686da815a10f5924279a995f"
        },
        "type": "motherboard",
        "model": "socket",
        "brand": "ASRock",
        "socket": "LGA1151",
        "form_factor": "ATX",
        "ram_slots": 2,
        "max_ram": 32000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.01
    },
    {
        "_id": {
        "$oid": "686da815a10f5924279a995f"
        },
        "type": "motherboard",
        "model": "form_factor",
        "brand": "ASRock",
        "socket": "AM3+/AM3",
        "form_factor": "Mini-ATX",
        "ram_slots": 2,
        "max_ram": 32000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.01
    },
    {
        "_id": {
        "$oid": "686da815a10f5924279a995f"
        },
        "type": "motherboard",
        "model": "base",
        "brand": "ASRock",
        "socket": "AM3+/AM3",
        "form_factor": "ATX",
        "ram_slots": 2,
        "max_ram": 32000000000,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 74.01
    },
]

const test_memorys = [
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "pcppPrice",
        "brand": "ADATA",
        "module_type": "DDR2",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 18.24,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "speed",
        "brand": "ADATA",
        "module_type": "DDR2",
        "speed": 2000000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "total_size",
        "brand": "ADATA",
        "module_type": "DDR2",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 9000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "module_type DDR",
        "brand": "ADATA",
        "module_type": "DDR",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "module_type DDR2",
        "brand": "ADATA",
        "module_type": "DDR2",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "module_type DDR3",
        "brand": "ADATA",
        "module_type": "DDR3",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "module_type DDR4",
        "brand": "ADATA",
        "module_type": "DDR4",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
    {
        "_id": {
        "$oid": "686da819a10f5924279aa658"
        },
        "type": "memory",
        "model": "base",
        "brand": "ADATA",
        "module_type": "DDR2",
        "speed": 1600000000,
        "number_of_modules": 1,
        "module_size": 8000000000,
        "total_size": 8000000000,
        "first_word_latency": 13.75,
        "cas_timing": 11,
        "price_per_gb": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 16,
    },
]

const test_hard_drives = [
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "pcppPrice",
        "brand": "ADATA",
        "capacity": 256000000000,
        "price_per_gb": 0,
        "storage_type": "SSD",
        "form_factor": "M.2-2280",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 78.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "capacity",
        "brand": "ADATA",
        "capacity": 266000000000,
        "price_per_gb": 0,
        "storage_type": "SSD",
        "form_factor": "M.2-2280",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 75.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "storage_type HDD",
        "brand": "ADATA",
        "capacity": 256000000000,
        "price_per_gb": 0,
        "storage_type": "HDD",
        "form_factor": "M.2-2280",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 75.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "storage_type Hybrid",
        "brand": "ADATA",
        "capacity": 256000000000,
        "price_per_gb": 0,
        "storage_type": "Hybrid",
        "form_factor": "M.2-2280",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 75.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "storage_type SDD",
        "brand": "ADATA",
        "capacity": 256000000000,
        "price_per_gb": 0,
        "storage_type": "SSD",
        "form_factor": "M.2-2280",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 75.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "form_factor 2.5",
        "brand": "ADATA",
        "capacity": 256000000000,
        "price_per_gb": 0,
        "storage_type": "SSD",
        "form_factor": "2.5",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 75.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
    {
        "_id": {
        "$oid": "686da81fa10f5924279ab02f"
        },
        "type": "hard-drive",
        "model": "base",
        "brand": "ADATA",
        "capacity": 256000000000,
        "price_per_gb": 0,
        "storage_type": "SSD",
        "form_factor": "M.2-2280",
        "interface": "M.2 (M)",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 75.21,
        "platter_rpm": "none",
        "cache_amount": "none"
    },
]

const test_power_supplys = [
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "pcppPrice",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 88.22,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "wattage",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 800,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "modular No",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 760,
        "modular": "No",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "modular Semi",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 760,
        "modular": "Semi",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "modular Full",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "efficiency_rating 80+",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "efficiency_rating 80+ Bronze",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Bronze",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "efficiency_rating 80+ Silver",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Silver",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "efficiency_rating 80+ Gold",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Gold",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "efficiency_rating 80+ Platinum",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "efficiency_rating 80+ Titanium",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Titanium",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
    {
        "_id": {
        "$oid": "686dac09a10f5924279b32fd"
        },
        "type": "power-supply",
        "model": "base",
        "brand": "Corsair",
        "form_factor": "ATX",
        "efficiency_rating": "80+ Platinum",
        "wattage": 760,
        "modular": "Full",
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 84.21,
    },
]

const test_cases = [
    {
        "_id": {
        "$oid": "686da822a10f5924279ab952"
        },
        "type": "case",
        "model": "pcppPrice",
        "brand": "Aerocool",
        "form_factor": "ATX Mini Tower",
        "color": "Black",
        "external_bays": 9,
        "internal_bays": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 55.31,
        "psu_wattage": 0,
        "side_panel": "none"
    },
    {
        "_id": {
        "$oid": "686da822a10f5924279ab952"
        },
        "type": "case",
        "model": "form_factor ATX Mini Tower",
        "brand": "Aerocool",
        "form_factor": "ATX Mini Tower",
        "color": "Black",
        "external_bays": 9,
        "internal_bays": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 52.32,
        "psu_wattage": 0,
        "side_panel": "none"
    },
    {
        "_id": {
        "$oid": "686da822a10f5924279ab952"
        },
        "type": "case",
        "model": "color White",
        "brand": "Aerocool",
        "form_factor": "ATX Mini Tower",
        "color": "White",
        "external_bays": 9,
        "internal_bays": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 52.32,
        "psu_wattage": 0,
        "side_panel": "none"
    },
    {
        "_id": {
        "$oid": "686da822a10f5924279ab952"
        },
        "type": "case",
        "model": "color Blue",
        "brand": "Aerocool",
        "form_factor": "ATX Mini Tower",
        "color": "Blue",
        "external_bays": 9,
        "internal_bays": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 52.32,
        "psu_wattage": 0,
        "side_panel": "none"
    },
    {
        "_id": {
        "$oid": "686da822a10f5924279ab952"
        },
        "type": "case",
        "model": "internal_bays",
        "brand": "Aerocool",
        "form_factor": "ATX Mini Tower",
        "color": "Blue",
        "external_bays": 9,
        "internal_bays": 1,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 52.32,
        "psu_wattage": 0,
        "side_panel": "none"
    },
    {
        "_id": {
        "$oid": "686da822a10f5924279ab952"
        },
        "type": "case",
        "model": "base",
        "brand": "Aerocool",
        "form_factor": "ATX Mini Tower",
        "color": "Blue",
        "external_bays": 9,
        "internal_bays": 0,
        "thirtyDayAverage": 0,
        "thirtyDayTime": 0,
        "thirtyDayListingCount": 0,
        "pcppPrice": 52.32,
        "psu_wattage": 0,
        "side_panel": "none"
    }
]

module.exports = { userAllocations500, test_cpus, test_videocards, test_motherboards, test_memorys, test_hard_drives, test_power_supplys, test_cases }