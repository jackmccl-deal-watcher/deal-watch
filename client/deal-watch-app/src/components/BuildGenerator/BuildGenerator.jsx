import { useState, useEffect } from "react"
import './BuildGenerator.css'
import CPUBuildForm from "./BuildComponentForms/CPUBuildForm"
import VideoCardBuildForm from "./BuildComponentForms/VideoCardBuildForm"
import MotherboardBuildForm from "./BuildComponentForms/MotherboardBuildForm"
import MemoryBuildForm from "./BuildComponentForms/MemoryBuildForm"
import HardDriveBuildForm from "./BuildComponentForms/HardDriveBuildForm"
import PowerSupplyBuildForm from "./BuildComponentForms/PowerSupplyBuildForm"
import CaseBuildForm from "./BuildComponentForms/CaseBuildForm"
import ComponentTypes from "../../component_enums/ComponentTypesEnum"

const ComponentsTypesList = [
    ComponentTypes.CPU,
    ComponentTypes.VIDEOCARD,
    ComponentTypes.MOTHERBOARD,
    ComponentTypes.MEMORY,
    ComponentTypes.HARD_DRIVE,
    ComponentTypes.POWER_SUPPLY,
    ComponentTypes.CASE,
]

const BuildGenerator = () => {
    const [allocations, setAllocations] = useState({})

    const handleAllocations = (component_type, component_allocations) => {
        setAllocations(prevAllocations => {
            let newAllocationsDict = {...prevAllocations}
            if (newAllocationsDict?.[component_type]?.['allocation'] && component_allocations?.['allocation'] && (newAllocationsDict[component_type]['allocation'] !== component_allocations['allocation'])) {
                let sum = 0
                Object.values(newAllocationsDict).forEach((component) => (sum += component['allocation']))
                const excess = sum - 1
                const per_spec_adjustment = Math.abs(excess / (ComponentsTypesList.length - 1))
                Object.keys(newAllocationsDict).forEach((key) => {
                    if (key !== component_type) {
                        if (excess > 0) {
                            newAllocationsDict[key] = newAllocationsDict[key] - per_spec_adjustment
                        } else if (excess < 0) {
                            newAllocationsDict[key] = newAllocationsDict[key] + per_spec_adjustment
                        }
                    }
                })
            }
            newAllocationsDict[component_type] = component_allocations
            console.log(newAllocationsDict)
            return newAllocationsDict
        })
    }

    const createAllocationsDict = () => {
        let newAllocationsDict = {}
        ComponentsTypesList.forEach((component_type) => {
            newAllocationsDict[component_type] = {}
            newAllocationsDict[component_type]['allocation'] = (1 / ComponentsTypesList.length)
        })
        setAllocations(newAllocationsDict)
    }

    useEffect(() => {
        createAllocationsDict()
    }, [])

    return(
        <div className='build-gen'>
            { allocations ? 
                <div className='build-gen-forms'>
                        <CPUBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                        <VideoCardBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                        <MotherboardBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                        <MemoryBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                        <HardDriveBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                        <PowerSupplyBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                        <CaseBuildForm handleAllocations={handleAllocations} allocations={allocations}/>
                </div> : null
            }
        </div>
    )
}

export default BuildGenerator