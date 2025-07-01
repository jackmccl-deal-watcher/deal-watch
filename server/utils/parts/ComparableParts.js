const ComponentTypes = require('../../models/part_models/ComponentTypesEnum.js')
const CPUModel = require('../../models/part_models/CPUModel.js')
const VideoCardModel = require('../../models/part_models/VideoCardModel.js')
const MotherboardModel = require('../../models/part_models/MotherboardModel.js')
const MemoryModel = require('../../models/part_models/MemoryModel.js')

const getLow = (value, margin) => {
    return Number(Math.floor(value - value * margin))
}

const getHigh = (value, margin) => {
    return Number(Math.ceil(value + value * margin))
}

const getComparableCPUs = async (cpu, margin) => {
    const comparableCoresLow = getLow(cpu.cores, margin)
    const comparableCoresHigh = getHigh(cpu.cores, margin)
    
    const comparableBaseClockLow = getLow(cpu.base_clock, margin)
    const comparableBaseClockHigh = getHigh(cpu.base_clock, margin)

    const comparableBoostClockLow = getLow(cpu.boost_clock, margin)
    const comparableBoostClockHigh = getHigh(cpu.boost_clock, margin)
    
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
    const comparableVramLow = getLow(videocard.vram, margin)
    const comparableVramHigh = getHigh(videocard.vram, margin)
    
    const comparableBaseClockLow = getLow(videocard.base_clock, margin)
    const comparableBaseClockHigh = getHigh(videocard.base_clock, margin)
    
    const comparableBoostClockLow = getLow(videocard.boost_clock, margin)
    const comparableBoostClockHigh = getHigh(videocard.boost_clock, margin)
    
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
    const comparableRamSlotsLow = getLow(motherboard.ram_slots, margin)
    const comparableRamSlotsHigh = getHigh(motherboard.ram_slots, margin)
    
    const comparableMaxRamLow = getLow(motherboard.max_ram, margin)
    const comparableMaxRamHigh = getHigh(motherboard.max_ram, margin)
    
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
    const comparableSpeedLow = getLow(memory.speed, margin)
    const comparableSpeedHigh = getHigh(memory.speed, margin)

    const comparableTotalSizeLow = getLow(memory.total_size, margin)
    const comparableTotalSizeHigh = getHigh(memory.total_size, margin)
    
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
        case ComponentTypes.UNKNOWN:
            console.log("ComponentType: UKNOWN in get comparable parts")
            return []
    }
    return []
}

const { test_cpu, test_videocard, test_motherboard, test_memory } = require('./test_parts.js')

getComparableParts(test_memory)

module.exports = { getComparableParts }