from pymongo import MongoClient
import json

types = ["cpu", "video-card", "motherboard", "memory", "hard-drive", "power-supply", "case"]

client = MongoClient("mongodb://localhost:27017/deal-watch")
deal_watch_db = client["deal-watch"]

MODULE_TYPES = {
    5: 'DDR5',
    4: 'DDR4',
    3: 'DDR3',
    2: 'DDR2',
    1: 'DDR'
}

EFFICIENCY_RATINGS = {
    'bronze': '80+ Bronze',
    'silver': '80+ Silver',
    'gold': '80+ Gold',
    'platinum': '80+ Platinum',
    'titanium': '80+ Titanium'
}

def remakeCollection(type):
    collection_names = deal_watch_db.list_collection_names()
    if type in collection_names:
        deal_watch_db[type].drop()
    return deal_watch_db[type]

folder_path = '/Users/jackmccl/Documents/deal-watch/server/data'

class API:
    def __init__(self, folder_path):
        self.folder_path = folder_path
    def retrieve(self, component_type):
        with open(f'{self.folder_path}/{component_type}.json', 'r') as file:
            return json.load(file)

def giga_to_base(value):
    return value * 1000000000
def mega_to_base(value):
    return value * 1000000

def getBrandAndModel(object_dict):
    split = object_dict['name'].split(' ', 1)
    return split[0], split[1]

def getPCPPPrice(object_dict):
    if (object_dict['price']):
            return float(object_dict['price'])
    else:
        return 0

def populate_cpus():
    api = API(folder_path=folder_path)
    cpu_data = api.retrieve("cpu")

    cpu_collection = remakeCollection("cpu")
    
    cpu_count = 0

    for cpu in cpu_data:
        cpu['brand'], cpu['model'] = getBrandAndModel(cpu)
        cpu_doc = {
            "type": "cpu",
            "model": cpu['model'],
            "brand": cpu['brand'],
            "cores": cpu['core_count'],
            "base_clock": giga_to_base(cpu['core_clock']),
            'boost_clock': 0,
            'integrated_graphics': 'none',
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        cpu_doc['pcpp_price'] = getPCPPPrice(cpu)

        # Uses base_clock as boost_clock if no boost_clock
        if cpu['boost_clock']:
            cpu_doc["boost_clock"] = giga_to_base(cpu['boost_clock'])
        else:
            cpu_doc["boost_clock"] = giga_to_base(cpu['core_clock'])

        if cpu['graphics']:
            cpu_doc["integrated_graphics"] = cpu['graphics']
        else:
            cpu_doc["integrated_graphics"] = "none"

        cpu_count += 1
        cpu_collection.replace_one(filter={"model": cpu['model']}, replacement=cpu_doc, upsert=True)
    print(f'{cpu_count} cpu parts added to database')

def populate_video_cards():
    api = API(folder_path=folder_path)
    videocard_data = api.retrieve("video-card")

    videocard_collection = remakeCollection("video-card")
    
    videocard_count = 0


    for videocard in videocard_data:
        videocard['brand'], videocard['model'] = getBrandAndModel(videocard)

        videocard_doc = {
            "type": "video-card",
            "model": videocard['model'] + ' ' + videocard['chipset'],
            "brand": videocard['brand'],
            "chipset": videocard['chipset'],
            "vram": giga_to_base(videocard['memory']),
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        videocard_doc['pcpp_price'] = getPCPPPrice(videocard)

        # Set base_clock to 0 if not given
        if videocard['core_clock']:
            videocard_doc["base_clock"] = mega_to_base(videocard['core_clock'])
        else:
            videocard_doc["base_clock"] = 0

        # Uses base_clock as boost_clock if no boost_clock
        if videocard['boost_clock']:
            videocard_doc["boost_clock"] = mega_to_base(videocard['boost_clock'])
        else:
            videocard_doc["boost_clock"] = mega_to_base(videocard_doc["base_clock"])

        videocard_count += 1
        videocard_collection.replace_one(filter={"model": videocard['model']}, replacement=videocard_doc, upsert=True)
    print(f'{videocard_count} video-card parts added to database')

def populate_motherboards():
    api = API(folder_path=folder_path)
    motherboard_data = api.retrieve("motherboard")

    motherboard_collection = remakeCollection("motherboard")
    
    motherboard_count = 0

    for motherboard in motherboard_data:
        motherboard['brand'], motherboard['model'] = getBrandAndModel(motherboard)

        motherboard_doc = {
            "type": "motherboard",
            "model": motherboard['model'],
            "brand": motherboard['brand'],
            "socket": motherboard['socket'],
            "form_factor": motherboard['form_factor'],
            "ram_slots": motherboard['memory_slots'],
            "max_ram": giga_to_base(motherboard['max_memory']),
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        motherboard_doc['pcpp_price'] = getPCPPPrice(motherboard)

        motherboard_count += 1
        motherboard_collection.replace_one(filter={"model": motherboard['model']}, replacement=motherboard_doc, upsert=True)
    print(f'{motherboard_count} motherboard parts added to database')

def populate_memorys():
    api = API(folder_path=folder_path)
    memory_data = api.retrieve("memory")

    memory_collection = remakeCollection("memory")
    memory_count = 0

    for memory in memory_data:
        if isinstance(memory['speed'], (int, float)):
            continue
        memory['brand'], memory['model'] = getBrandAndModel(memory)

        memory_doc = {
            "type": "memory",
            "model": memory['model'],
            "brand": memory['brand'],
            "module_type": MODULE_TYPES[memory['speed'][0]],
            "number_of_modules": memory['modules'][0],
            "module_size": memory['modules'][1],
            "total_size": float(memory['modules'][0] * memory['modules'][1]),
            "first_word_latency": memory['first_word_latency'],
            "cas_timing": memory['cas_latency'],
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        memory_doc['pcpp_price'] = getPCPPPrice(memory)

        if memory['price_per_gb']:
            memory_doc["price_per_gb"] = float(memory['price_per_gb'])
        else:
            memory_doc["price_per_gb"] = 'N/A'

        memory_count += 1
        memory_collection.replace_one(filter={"model": memory['model']}, replacement=memory_doc, upsert=True)
    print(f'{memory_count} memory parts added to database')

def populate_hard_drives():
    api = API(folder_path=folder_path)
    hard_drive_data = api.retrieve("hard-drive")

    hard_drive_collection = remakeCollection("hard-drive")
    hard_drive_count = 0
    
    for hard_drive in hard_drive_data:
        hard_drive['brand'], hard_drive['model'] = getBrandAndModel(hard_drive)

        hard_drive_doc = {
            "type": "hard-drive",
            "model": hard_drive['model'],
            "brand": hard_drive['brand'],
            "capacity": giga_to_base(hard_drive['capacity']),
            "storage_type": hard_drive['type'],
            "form_factor": hard_drive['form_factor'],
            "interface": hard_drive['interface'],
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        hard_drive_doc['pcpp_price'] = getPCPPPrice(hard_drive)

        if hard_drive['price_per_gb']:
            hard_drive_doc["price_per_gb"] = float(hard_drive['price_per_gb'])
        else:
            hard_drive_doc["price_per_gb"] = 'N/A'

        if hard_drive['cache']:
            hard_drive_doc["cache"] = hard_drive['cache']
        else:
            hard_drive_doc["cache"] = "none"


        hard_drive_count += 1
        hard_drive_collection.replace_one(filter={"model": hard_drive['model']}, replacement=hard_drive_doc, upsert=True)
    print(f'{hard_drive_count} hard_drive parts added to database')

def populate_power_supplys():
    api = API(folder_path=folder_path)
    power_supply_data = api.retrieve("power-supply")

    power_supply_collection = remakeCollection("power-supply")
    power_supply_count = 0

    for power_supply in power_supply_data:
        if not power_supply['efficiency']:
            continue

        power_supply['brand'], power_supply['model'] = getBrandAndModel(power_supply)

        power_supply_doc = {
            "type": "power-supply",
            "model": power_supply['model'],
            "brand": power_supply['brand'],
            "form_factor": power_supply['type'],
            "wattage": power_supply['wattage'],
            "modular": power_supply['modular'],
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        power_supply_doc['pcpp_price'] = getPCPPPrice(power_supply)

        power_supply_count += 1
        power_supply_collection.replace_one(filter={"model": power_supply['model']}, replacement=power_supply_doc, upsert=True)
    print(f'{power_supply_count} power_supply parts added to database')

def populate_cases():
    api = API(folder_path=folder_path)
    case_data = api.retrieve("case")

    case_collection = remakeCollection("case")
    case_count = 0

    for case in case_data:
        case['brand'], case['model'] = getBrandAndModel(case)

        case_doc = {
            "type": "case",
            "model": case['model'],
            "brand": case['brand'],
            "form_factor": case['type'],
            "color": case['color'],
            "internal_bays": case['internal_35_bays'],
            "thirty_day_average": 0,
            "thirty_day_time": 0,
            "thirty_day_listing_count": 0,
        }

        case_doc['pcpp_price'] = getPCPPPrice(case)
        
        if case['side_panel']:
            case_doc["side_panel"] = case['side_panel']
        else:
            case_doc["side_panel"] = "none"

        case_count += 1
        case_collection.replace_one(filter={"model": case['model']}, replacement=case_doc, upsert=True)
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