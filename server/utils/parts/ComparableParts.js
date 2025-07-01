const ComponentTypes = require('../../models/part_models/ComponentTypesEnum.js')
const CPUModel = require('../../models/part_models/CPUModel.js')
const VideoCardModel = require('../../models/part_models/VideoCardModel.js')
const MotherboardModel = require('../../models/part_models/MotherboardModel.js')
const MemoryModel = require('../../models/part_models/MemoryModel.js')
const HardDriveModel = require('../../models/part_models/HardDriveModel.js')
const PowerSupplyModel = require('../../models/part_models/PowerSupplyModel.js')
const CaseModel = require('../../models/part_models/CaseModel.js')


const calcLow = (value, margin) => {
    return Number(Math.floor(value - value * margin))
}

const calcHigh = (value, margin) => {
    return Number(Math.ceil(value + value * margin))
}

const getComparableCPUs = async (cpu, margin) => {
    const comparableCoresLow = calcLow(cpu.cores, margin)
    const comparableCoresHigh = calcHigh(cpu.cores, margin)
    
    const comparableBaseClockLow = calcLow(cpu.base_clock, margin)
    const comparableBaseClockHigh = calcHigh(cpu.base_clock, margin)

    const comparableBoostClockLow = calcLow(cpu.boost_clock, margin)
    const comparableBoostClockHigh = calcHigh(cpu.boost_clock, margin)
    
    const comparableCPUs = await CPUModel.find( { 
        $and: [
            { cores: {$lte: comparableCoresHigh} },
            { cores: {$gte: comparableCoresLow} },
            { base_clock: {$lte: comparableBaseClockHigh} },
            { base_clock: {$gte: comparableBaseClockLow} },
            { boost_clock: {$lte: comparableBoostClockHigh} },
            { boost_clock: {$gte: comparableBoostClockLow} },
        ]
    } )

    return comparableCPUs
}

const getComparableVideoCards = async (videocard, margin) => {
    const comparableVramLow = calcLow(videocard.vram, margin)
    const comparableVramHigh = calcHigh(videocard.vram, margin)
    
    const comparableBaseClockLow = calcLow(videocard.base_clock, margin)
    const comparableBaseClockHigh = calcHigh(videocard.base_clock, margin)
    
    const comparableBoostClockLow = calcLow(videocard.boost_clock, margin)
    const comparableBoostClockHigh = calcHigh(videocard.boost_clock, margin)
    
    const comparableVideoCards = await VideoCardModel.find( { 
        $and: [
            { vram: {$lte: comparableVramHigh} },
            { vram: {$gte: comparableVramLow} },
            { base_clock: {$lte: comparableBaseClockHigh} },
            { base_clock: {$gte: comparableBaseClockLow} },
            { boost_clock: {$lte: comparableBoostClockHigh} },
            { boost_clock: {$gte: comparableBoostClockLow} },
        ]
    } )
    return comparableVideoCards
}

const getComparableMotherboards = async (motherboard, margin) => {
    const comparableRamSlotsLow = calcLow(motherboard.ram_slots, margin)
    const comparableRamSlotsHigh = calcHigh(motherboard.ram_slots, margin)
    
    const comparableMaxRamLow = calcLow(motherboard.max_ram, margin)
    const comparableMaxRamHigh = calcHigh(motherboard.max_ram, margin)
    
    const comparableMotherboards = await MotherboardModel.find( { 
        $and: [
            { ram_slots: {$lte: comparableRamSlotsHigh} },
            { ram_slots: {$gte: comparableRamSlotsLow} },
            { max_ram: {$lte: comparableMaxRamHigh} },
            { max_ram: {$gte: comparableMaxRamLow} },
            { socket: motherboard.socket },
            { form_factor: motherboard.form_factor },
        ]
    } )
    return comparableMotherboards
}

const getComparableMemorys = async (memory, margin) => {
    const comparableSpeedLow = calcLow(memory.speed, margin)
    const comparableSpeedHigh = calcHigh(memory.speed, margin)

    const comparableTotalSizeLow = calcLow(memory.total_size, margin)
    const comparableTotalSizeHigh = calcHigh(memory.total_size, margin)
    
    const comparableMemorys = await MemoryModel.find( { 
        $and: [
            { speed: {$lte: comparableSpeedHigh} },
            { speed: {$gte: comparableSpeedLow} },
            { total_size: {$lte: comparableTotalSizeHigh} },
            { total_size: {$gte: comparableTotalSizeLow} },
            { module_type: memory.module_type },
        ]
    } )
    return comparableMemorys
}

const getComparableHardDrives = async (hard_drive, margin) => {
    const comparableCapacityLow = calcLow(hard_drive.capacity, margin)
    const comparableCapacityHigh = calcHigh(hard_drive.capacity, margin)
    
    const comparableHardDrives = await HardDriveModel.find( { 
        $and: [
            { capacity: {$lte: comparableCapacityHigh} },
            { capacity: {$gte: comparableCapacityLow} },
            { storage_type: hard_drive.storage_type },
            { form_factor: hard_drive.form_factor },
            { interface: hard_drive.interface },
        ]
    } )
    return comparableHardDrives
}

const getComparablePowerSupplys = async (power_supply, margin) => {
    const comparableWattageLow = calcLow(power_supply.wattage, margin)
    const comparableWattageHigh = calcHigh(power_supply.wattage, margin)
    
    const comparablePowerSupplys = await PowerSupplyModel.find( { 
        $and: [
            { wattage: {$lte: comparableWattageHigh} },
            { wattage: {$gte: comparableWattageLow} },
            { form_factor: power_supply.form_factor },
            { efficiency_rating: power_supply.efficiency_rating },
            { modular: power_supply.modular },
        ]
    } )
    return comparablePowerSupplys
}

const getComparableCases = async (input_case, margin) => {    
    const comparableInternalBaysLow = calcLow(input_case.internal_bays, margin)
    const comparableInternalBaysHigh = calcHigh(input_case.internal_bays, margin)

    const comparableCases = await CaseModel.find( { 
        $and: [
            { internal_bays: {$lte: comparableInternalBaysHigh} },
            { internal_bays: {$gte: comparableInternalBaysLow} },
            { form_factor: input_case.form_factor },
            { color: input_case.color },
        ]
    } )
    return comparableCases
}


const getComparableParts = async (part) => {
    const margin = 0.1
    switch (part.type) {
        case ComponentTypes.CPU:
            return await getComparableCPUs(part, margin)
        case ComponentTypes.VIDEOCARD:
            return await getComparableVideoCards(part, margin)
        case ComponentTypes.MOTHERBOARD:
            return await getComparableMotherboards(part, margin)
        case ComponentTypes.MEMORY:
            return await getComparableMemorys(part, margin)
        case ComponentTypes.HARD_DRIVE:
            return await getComparableHardDrives(part, margin)
        case ComponentTypes.POWER_SUPPLY:
            return await getComparablePowerSupplys(part, margin)
        case ComponentTypes.CASE:
            return await getComparableCases(part, margin)
        case ComponentTypes.UNKNOWN:
            console.log("ComponentType: UNKNOWN in get comparable parts")
            return []
    }
    return []
}

module.exports = { getComparableParts }