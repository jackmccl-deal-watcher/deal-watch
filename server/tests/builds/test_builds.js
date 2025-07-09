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
            module_type: {
                allocation: 0.2,
                module_type: 'DDR4',
            },
        },
        'hard-drive': {
            allocation: 0.1,
            capacity: .4,
            storage_type: {
                allocation: .6,
                storage_type:'SSD',
            }
        },
        'power-supply': {
            allocation: 0.1,
            wattage: .6,
            efficiency_rating: .2,
            form_factor: 'ATX',
            modular: {
                allocation: .2,
                modular: 'Full'
            }
        },
        'case': {
            allocation: 0.1,
            form_factor: 'ATX',
            'internal-bays': 0.5,
            color: {
                allocation: 0.5,
                color: ['Black'],
            },
        },
    }
}

module.exports = userAllocations500