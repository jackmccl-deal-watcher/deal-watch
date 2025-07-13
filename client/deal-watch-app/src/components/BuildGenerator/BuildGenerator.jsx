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
import ComponentBuildForm from "./BuildComponentForms/ComponentBuildForm"

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
            return <ComponentBuildForm key={component_data.component_type} {...componentFormProp}/>
        })
    }

    const createAllocationsDict = () => {
        let newAllocationsDict = {}
        COMPONENT_TYPES_STARTING_ALLOCATIONS.forEach((component_type_dict) => {
            newAllocationsDict[component_type_dict.type] = {}
            newAllocationsDict[component_type_dict.type]['allocation'] = component_type_dict.starting_allocation
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