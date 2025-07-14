import { useState, useEffect } from "react"
import './BuildGenerator.css'
import { FORM_CONFIG, COMPONENT_TYPES_STARTING_ALLOCATIONS, STARTING_BUDGET } from "./BuildGeneratorConstants"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ComponentBuildForm from "./BuildComponentForms/ComponentBuildForm"
import { generateBuilds } from "../../utils/ApiUtils";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ComponentTypes from "../../component_enums/ComponentTypesEnum";
import { CASE_PROPERTIES, MOTHERBOARD_PROPERTIES, POWER_SUPPLY_PROPERTIES } from "../../component_enums/ComponentPropertiesEnums";

const BuildGenerator = () => {
    const [allocations, setAllocations] = useState({})
    const [budget, setBudget] = useState(STARTING_BUDGET)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    
    const handleUpdateAllocations = (component_type, component_allocations) => {
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
            newAllocationsDict[component_type] = {...prevAllocations[component_type], ...component_allocations}
            return newAllocationsDict
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

    const makeBuildForms = (config) => {
        return Object.values(config).map( (component_data) => {
            const componentFormProp = { component_data, handleUpdateAllocations, allocations }
            return <ComponentBuildForm key={component_data.component_type} {...componentFormProp}/>
        })
    }

    const getGeneratedBuilds = async () => {
        if (allocations?.[ComponentTypes.MOTHERBOARD]?.[MOTHERBOARD_PROPERTIES.SOCKET] 
            && allocations?.[ComponentTypes.MOTHERBOARD]?.[MOTHERBOARD_PROPERTIES.FORM_FACTOR]
            && allocations?.[ComponentTypes.POWER_SUPPLY]?.[POWER_SUPPLY_PROPERTIES.FORM_FACTOR]
            && allocations?.[ComponentTypes.CASE]?.[CASE_PROPERTIES.FORM_FACTOR]) {
            setMessage('Generating builds...')
        } else {
            setMessage('Please ensure all fields are filled!')
            return
        }
        const allocationsBody = {
            budget: budget,
            components: allocations,
        }
        let builds = {}
        let buildsResponse = {}
        setLoading(true)
        navigate('/loading')
        try {
            buildsResponse = await generateBuilds(allocationsBody)
            switch (buildsResponse['status']) {
                case 'success':
                    setMessage(`${buildsResponse['message']}`)
                    builds = buildsResponse['builds']
                case 'error':
                    setMessage(`Error: ${buildsResponse['message']}`)
                    return
            }
        } finally {
            setLoading(false)
            navigate('/builds/display', { state: builds } )
        }
    }

    useEffect(() => {
        createAllocationsDict()
    }, [])

    return(
        <div className='builds-gen'>
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
                    <button className='generate-build-form-submit-button' onClick={getGeneratedBuilds}>Generate Builds</button>
                </div> : null
            }
            <div className='message'>{message}</div>
        </div>
    )
}

export default BuildGenerator