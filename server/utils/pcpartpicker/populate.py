from pymongo import MongoClient
from pcpartpicker import API

types = ["cpu", "video-card", "motherboard", "memory", "internal-hard-drive", "power-supply", "case"]

client = MongoClient("mongodb://localhost:27017/deal-watch")
deal_watch_db = client["deal-watch"]

def remakeCollection(type):
    collection_names = deal_watch_db.list_collection_names()
    if type in collection_names:
        deal_watch_db[type].drop()
    return deal_watch_db[type]

def populate_cpus():
    api = API()
    cpu_data = api.retrieve("cpu")["cpu"]

    cpu_collection = remakeCollection("cpu")
    
    cpu_count = 0

    for cpu in cpu_data:
        cpu_doc = {
            "type": "cpu",
            "model": cpu.model,
            "brand": cpu.brand,
            "cores": cpu.cores,
            "base_clock": cpu.base_clock.cycles,
            "multithreading": cpu.multithreading,
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        # Uses base_clock as boost_clock if no boost_clock
        if cpu.boost_clock:
            cpu_doc["boost_clock"] = cpu.boost_clock.cycles
        else:
            cpu_doc["boost_clock"] = cpu.base_clock.cycles

        if cpu.integrated_graphics:
            cpu_doc["integrated_graphics"] = cpu.integrated_graphics
        else:
            cpu_doc["integrated_graphics"] = "none"

        cpu_count += 1
        cpu_collection.replace_one(filter={"model": cpu.model}, replacement=cpu_doc, upsert=True)
    print(f'{cpu_count} cpu parts added to database')

def populate_video_cards():
    api = API()
    videocard_data = api.retrieve("video-card")["video-card"]

    videocard_collection = remakeCollection("video-card")
    
    videocard_count = 0

    for videocard in videocard_data:
        videocard_doc = {
            "type": "video-card",
            "model": videocard.model + ' ' + videocard.chipset,
            "brand": videocard.brand,
            "chipset": videocard.chipset,
            "vram": videocard.vram.total,
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        # Set base_clock to 0 if not given
        if videocard.core_clock:
            videocard_doc["base_clock"] = videocard.core_clock.cycles
        else:
            videocard_doc["base_clock"] = 0

        # Uses base_clock as boost_clock if no boost_clock
        if videocard.boost_clock:
            videocard_doc["boost_clock"] = videocard.boost_clock.cycles
        else:
            videocard_doc["boost_clock"] = videocard_doc["base_clock"]

        videocard_count += 1
        videocard_collection.replace_one(filter={"model": videocard.model}, replacement=videocard_doc, upsert=True)
    print(f'{videocard_count} video-card parts added to database')

def populate_motherboards():
    api = API()
    motherboard_data = api.retrieve("motherboard")["motherboard"]

    motherboard_collection = remakeCollection("motherboard")
    
    motherboard_count = 0

    for motherboard in motherboard_data:
        motherboard_doc = {
            "type": "motherboard",
            "model": motherboard.model,
            "brand": motherboard.brand,
            "socket": motherboard.socket,
            "form_factor": motherboard.form_factor,
            "ram_slots": motherboard.ram_slots,
            "max_ram": motherboard.max_ram.total,
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        motherboard_count += 1
        motherboard_collection.replace_one(filter={"model": motherboard.model}, replacement=motherboard_doc, upsert=True)
    print(f'{motherboard_count} motherboard parts added to database')

def populate_memorys():
    api = API()
    memory_data = api.retrieve("memory")["memory"]

    memory_collection = remakeCollection("memory")
    memory_count = 0

    for memory in memory_data:
        memory_doc = {
            "type": "memory",
            "model": memory.model,
            "brand": memory.brand,
            "module_type": memory.module_type,
            "speed": memory.speed.cycles,
            "number_of_modules": memory.number_of_modules,
            "module_size": memory.module_size.total,
            "total_size": float(memory.number_of_modules*memory.module_size.total),
            "first_word_latency": memory.first_word_latency,
            "cas_timing": memory.cas_timing,
            "price_per_gb": float(memory.price_per_gb.amount),
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        memory_count += 1
        memory_collection.replace_one(filter={"model": memory.model}, replacement=memory_doc, upsert=True)
    print(f'{memory_count} memory parts added to database')

def populate_hard_drives():
    api = API()
    hard_drive_data = api.retrieve("internal-hard-drive")["internal-hard-drive"]

    hard_drive_collection = remakeCollection("hard-drive")
    hard_drive_count = 0
    
    for hard_drive in hard_drive_data:
        hard_drive_doc = {
            "type": "hard-drive",
            "model": hard_drive.model,
            "brand": hard_drive.brand,
            "capacity": hard_drive.capacity.total,
            "price_per_gb": float(hard_drive.price_per_gb.amount),
            "storage_type": hard_drive.storage_type,
            "form_factor": hard_drive.form_factor,
            "interface": hard_drive.interface,
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        if hard_drive.platter_rpm:
            hard_drive_doc["platter_rpm"] = hard_drive.platter_rpm
        else:
            hard_drive_doc["platter_rpm"] = "none"

        if hard_drive.cache_amount:
            hard_drive_doc["cache_amount"] = hard_drive.cache_amount.total
        else:
            hard_drive_doc["cache_amount"] = "none"


        hard_drive_count += 1
        hard_drive_collection.replace_one(filter={"model": hard_drive.model}, replacement=hard_drive_doc, upsert=True)
    print(f'{hard_drive_count} hard_drive parts added to database')

def populate_power_supplys():
    api = API()
    power_supply_data = api.retrieve("power-supply")["power-supply"]

    power_supply_collection = remakeCollection("power-supply")
    power_supply_count = 0

    for power_supply in power_supply_data:
        power_supply_doc = {
            "type": "power-supply",
            "model": power_supply.model,
            "brand": power_supply.brand,
            "form_factor": power_supply.form_factor,
            "efficiency_rating": power_supply.efficiency_rating,
            "wattage": power_supply.wattage,
            "modular": power_supply.modular,
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        power_supply_count += 1
        power_supply_collection.replace_one(filter={"model": power_supply.model}, replacement=power_supply_doc, upsert=True)
    print(f'{power_supply_count} power_supply parts added to database')

def populate_cases():
    api = API()
    case_data = api.retrieve("case")["case"]

    case_collection = remakeCollection("case")
    case_count = 0

    for case in case_data:
        case_doc = {
            "type": "case",
            "model": case.model,
            "brand": case.brand,
            "form_factor": case.form_factor,
            "color": case.color,
            "external_bays": case.external_bays,
            "internal_bays": case.internal_bays,
            "thirtyDayAverage": 0,
            "thirtyDayTime": 0,
            "thirtyDayListingCount": 0,
        }

        if case.psu_wattage:
            case_doc["psu_wattage"] = case.psu_wattage
        else:
            case_doc["psu_wattage"] = 0
        
        if case.side_panel:
            case_doc["side_panel"] = case.side_panel
        else:
            case_doc["side_panel"] = "none"

        case_count += 1
        case_collection.replace_one(filter={"model": case.model}, replacement=case_doc, upsert=True)
    print(f'{case_count} case parts added to database')

def populate_parts_database():
    populate_cpus()
    populate_video_cards()
    populate_motherboards()
    populate_memorys()
    populate_hard_drives()
    populate_power_supplys()
    populate_cases()

populate_parts_database()