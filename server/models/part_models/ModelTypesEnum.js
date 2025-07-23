const CaseModel = require("./CaseModel");
const CPUModel = require("./CPUModel");
const HardDriveModel = require("./HardDriveModel");
const MemoryModel = require("./MemoryModel");
const MotherboardModel = require("./MotherboardModel");
const PowerSupplyModel = require("./PowerSupplyModel");
const VideoCardModel = require("./VideoCardModel");
const ComponentTypes = require("./ComponentTypesEnum");

const ModelTypesEnum = Object.freeze({
    [ComponentTypes.CPU]: CPUModel,
    [ComponentTypes.VIDEOCARD]: VideoCardModel,
    [ComponentTypes.MOTHERBOARD]: MotherboardModel,
    [ComponentTypes.MEMORY]: MemoryModel,
    [ComponentTypes.HARD_DRIVE]: HardDriveModel,
    [ComponentTypes.POWER_SUPPLY]: PowerSupplyModel,
    [ComponentTypes.CASE]: CaseModel,
});

module.exports = ModelTypesEnum