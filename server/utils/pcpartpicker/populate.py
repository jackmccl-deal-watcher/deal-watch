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
            "integrated_graphics": cpu.integrated_graphics,
            "multithreading": cpu.multithreading,
        }

        # Uses base_clock as boost_clock if no boost_clock
        if not cpu.boost_clock:
            cpu_doc["boost_clock"] = cpu.base_clock.cycles

        cpu_count += 1

        cpu_id = cpu_collection.insert_one(cpu_doc).inserted_id
        print(f'cpu_id: {cpu_id} inserted into cpu collection')
    print(f'{cpu_count} cpu parts added to database')

populate_cpus()