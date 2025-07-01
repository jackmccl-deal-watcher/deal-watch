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
        cpu_id = cpu_collection.insert_one(cpu_doc).inserted_id
        print(f'cpu_id: {cpu_id} inserted into cpu collection')
    print(f'{cpu_count} cpu parts added to database')

def populate_videocards():
    api = API()
    videocard_data = api.retrieve("video-card")["video-card"]

    videocard_collection = remakeCollection("video-card")
    
    videocard_count = 0

    for videocard in videocard_data:
        videocard_doc = {
            "type": "video-card",
            "model": videocard.model,
            "brand": videocard.brand,
            "chipset": videocard.chipset,
            "vram": videocard.vram.total,
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
        videocard_id = videocard_collection.insert_one(videocard_doc).inserted_id
        print(f'videocard_id: {videocard_id} inserted into video-card collection')
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
        }

        motherboard_count += 1
        motherboard_id = motherboard_collection.insert_one(motherboard_doc).inserted_id
        print(f'motherboard_id: {motherboard_id} inserted into motherboard collection')
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
        }

        memory_count += 1
        memory_id = memory_collection.insert_one(memory_doc).inserted_id
        print(f'memory_id: {memory_id} inserted into memory collection')
    print(f'{memory_count} memory parts added to database')

def populate_parts_database():
    populate_cpus()
    populate_videocards()
    populate_motherboards()
    populate_memorys()

populate_parts_database()