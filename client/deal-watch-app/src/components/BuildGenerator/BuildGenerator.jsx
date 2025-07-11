import { useState, useEffect } from "react"
import './BuildGenerator.css'
import CPUBuildForm from "./BuildComponentForms/CPUBuildForm"
import VideoCardBuildForm from "./BuildComponentForms/VideoCardBuildForm"
import MotherboardBuildForm from "./BuildComponentForms/MotherboardBuildForm"
import MemoryBuildForm from "./BuildComponentForms/MemoryBuildForm"
import HardDriveBuildForm from "./BuildComponentForms/HardDriveBuildForm"
import PowerSupplyBuildForm from "./BuildComponentForms/PowerSupplyBuildForm"
import CaseBuildForm from "./BuildComponentForms/CaseBuildForm"
import { COMPONENT_TYPES_STARTING_ALLOCATIONS, STARTING_BUDGET } from "./BuildGeneratorConstants"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const BuildGenerator = () => {
    const [allocations, setAllocations] = useState({})
    const [budget, setBudget] = useState(STARTING_BUDGET)

    const handleAllocations = (component_type, component_allocations) => {
        setAllocations(prevAllocations => {
            let newAllocationsDict = {...prevAllocations}
            if (newAllocationsDict?.[component_type]?.['allocation'] && component_allocations?.['allocation'] && (newAllocationsDict[component_type]['allocation'] !== component_allocations['allocation'])) {
                let sum = 0
                Object.values(newAllocationsDict).forEach((component) => {
                    if (component?.['allocation']) {
                        sum += component['allocation']
                    }
                })
                const excess = sum - 1
                const per_spec_adjustment = Math.abs(excess / (COMPONENT_TYPES_STARTING_ALLOCATIONS.length - 1))
                Object.keys(newAllocationsDict).forEach((key) => {
                    if (key !== component_type) {
                        if (excess > 0) {
                            newAllocationsDict[key]['allocation'] = newAllocationsDict[key]['allocation'] - per_spec_adjustment
                        } else if (excess < 0) {
                            newAllocationsDict[key]['allocation'] = newAllocationsDict[key]['allocation'] + per_spec_adjustment
                        }
                    }
                })
            }
            newAllocationsDict[component_type] = component_allocations
            return newAllocationsDict
        })
    }

    const createAllocationsDict = () => {
        let newAllocationsDict = {}
        COMPONENT_TYPES_STARTING_ALLOCATIONS.forEach((component_type_dict) => {
            newAllocationsDict[component_type_dict.type] = {}
            newAllocationsDict[component_type_dict.type]['allocation'] = component_type_dict.allocation
        })
        setAllocations(newAllocationsDict)
    }

    const updateBudget = (e) => {
        const newBudget = e.target.value
        if (!isNaN(newBudget)) {
            setBudget(newBudget)
        }
    }

    useEffect(() => {
        createAllocationsDict()
    }, [])

    return(
        <div className='build-gen'>
            { allocations ? 
                <div className='build-gen-forms'>
                    <TextField 
                        label="Budget" 
                        value={budget} 
                        onChange={updateBudget}
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            },
                        }}
                    />
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