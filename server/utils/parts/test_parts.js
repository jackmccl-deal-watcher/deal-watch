const test_cpu = {
"_id": {
"$oid": "6862e1832de6712dc1bacc56"
},
"type": "cpu",
"model": "A10-5800K",
"brand": "AMD",
"cores": 4,
"base_clock": 3800000000,
"integrated_graphics": "Radeon HD 7660D",
"multithreading": false,
"boost_clock": 3800000000,
}

const test_videocard = {
"_id": {
"$oid": "6863633bba3cbdae75c40a3f"
},
"type": "video-card",
"model": "100-505841",
"brand": "AMD",
"chipset": "FirePro 2450",
"vram": 500000000,
"base_clock": 600000000,
"boost_clock": 600000000
}

const test_motherboard = {
"_id": {
"$oid": "686367e113752270e196a18d"
},
"type": "motherboard",
"model": "B150 PRO4/D3",
"brand": "ASRock",
"socket": "LGA1151",
"form_factor": "ATX",
"ram_slots": 4,
"max_ram": 64000000000,
}

const test_memory = {
"_id": {
"$oid": "686371a918c655f430fe1b53"
},
"type": "memory",
"model": "AX4U2400316G16-DRG 32 GB",
"brand": "ADATA",
"module_type": "DDR4",
"speed": 2400000000,
"number_of_modules": 2,
"module_size": 16000000000,
"total_size": 32000000000,
"first_word_latency": 13.333,
"cas_timing": 16,
"price_per_gb": 0
}

module.exports = { test_cpu, test_videocard, test_motherboard, test_memory }