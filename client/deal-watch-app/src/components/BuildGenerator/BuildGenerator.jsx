import { useState, useEffect } from "react"
import './BuildGenerator.css'
import CPUBuildForm from "./BuildComponentForms/CPUBuildForm"
import VideoCardBuildForm from "./BuildComponentForms/VideoCardBuildForm"
import MotherboardBuildForm from "./BuildComponentForms/MotherboardBuildForm"
import MemoryBuildForm from "./BuildComponentForms/MemoryBuildForm"
import HardDriveBuildForm from "./BuildComponentForms/HardDriveBuildForm"
import PowerSupplyBuildForm from "./BuildComponentForms/PowerSupplyBuildForm"
import CaseBuildForm from "./BuildComponentForms/CaseBuildForm"
import { FORM_CONFIG, COMPONENT_TYPES_STARTING_ALLOCATIONS, STARTING_BUDGET } from "./BuildGeneratorConstants"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ComponentTypes from "../../component_enums/ComponentTypesEnum"

const BuildGenerator = () => {
    const [allocations, setAllocations] = useState({})
    const [budget, setBudget] = useState(STARTING_BUDGET)

    const generateBuilds = () => {
        const allocationsBody = {
            budget: budget,
            components: allocations,
        }
        console.log(allocationsBody)
    }

    const makeBuildForms = (config) => {
        return Object.values(config).map( (component_data) => {
            const componentFormProp = { handleAllocations, allocations, component_data}
            switch (component_data.component_type) {
                case ComponentTypes.CPU:
                    return <CPUBuildForm {...componentFormProp} key={component_data.component_type}/>
                case ComponentTypes.VIDEOCARD:
                    return <VideoCardBuildForm {...componentFormProp} key={component_data.component_type}/>
                case ComponentTypes.MOTHERBOARD:
                    return <MotherboardBuildForm {...componentFormProp} key={component_data.component_type}/>
                case ComponentTypes.MEMORY:
                    return <MemoryBuildForm {...componentFormProp} key={component_data.component_type}/>
                case ComponentTypes.HARD_DRIVE:
                    return <HardDriveBuildForm {...componentFormProp} key={component_data.component_type}/>
                case ComponentTypes.POWER_SUPPLY:
                    return <PowerSupplyBuildForm {...componentFormProp} key={component_data.component_type}/>
                case ComponentTypes.CASE:
                    return <CaseBuildForm {...componentFormProp} key={component_data.component_type}/>
            }
        })
    }

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
                    {makeBuildForms(FORM_CONFIG)}
                    <button className='generate-build-form-submit-button' onClick={generateBuilds}>Generate Builds</button>
                </div> : null
            }
        </div>
    )
}

export default BuildGenerator