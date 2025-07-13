import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { CASE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import Slider from '@mui/material/Slider';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants'
import MultiSelect from './MultiSelect'
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils'
import { handleSpecialAllocation } from './BuildFormUtils';
import { useEffect } from 'react';

const ComponentBuildForm = ({ component_data, handleUpdateAllocations, allocations }) => {
    const [componentAllocations, setComponentAllocations] = useState({})

    const handleUpdatePoints = (pointsDict) => {
        let newAllocationsDict = {...componentAllocations, ...pointsDict}
        handleUpdateAllocations(component_data.component_type, newAllocationsDict)
        setComponentAllocations(newAllocationsDict)
    }

    const createComponentAllocations = () => {
        let newAllocationsDict = {}
        component_data?.main_specs?.forEach( (main_spec) => {
            newAllocationsDict[main_spec.key] = 1 /  component_data.main_specs.length
        })
        component_data?.special_specs && Object.values(component_data.special_specs).forEach( (special_spec) => {
            switch (component_data.special_specs.type) {
                case 'case':
                    newAllocationsDict[component_data.special_specs.type] = {
                        allocation: 1 /  component_data.main_specs.length,
                        colors: [],
                    }
                    special_spec.currentOption = newAllocationsDict[component_data.special_specs.type]
                    special_spec.setCurrentOption = (newValue) => {
                        let newAllocationsDict = {}
                        setComponentAllocations( (prevAllocations) => {
                            newAllocationsDict = {...prevAllocations}
                            newAllocationsDict[component_data.special_specs.type]['colors'] = newValue
                            return newAllocationsDict
                        })
                        return newAllocationsDict
                    }
                    break
                default:
                    newAllocationsDict[component_data.special_specs.type] = ''
                    special_spec.currentOption = newAllocationsDict[component_data.special_specs.type]
                    special_spec.setCurrentOption = (newValue) => {
                        let newAllocationsDict = {}
                        setComponentAllocations( (prevAllocations) => {
                            newAllocationsDict = {...prevAllocations}
                            newAllocationsDict[component_data.special_specs.type] = newValue
                            return newAllocationsDict
                        })
                        return newAllocationsDict
                    }
            }
        })
        handleUpdateAllocations(component_data.component_type, newAllocationsDict)
        setComponentAllocations(newAllocationsDict)
    }

    useEffect(() => {
        createComponentAllocations()
    }, [])

    return(
        <div>
            { component_data && allocations?.[component_data.component_type]?.['allocation'] ?
                <div className='build-form'>
                    <p>{component_data.component_name}: {getSliderLabelText(allocations[component_data.component_type]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={componentAllocations[allocation]} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: component_data.component_type, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={component_data.main_specs} handleUpdatePoints={handleUpdatePoints}/>
                    { component_data.special_specs && Object.values(component_data.special_specs).map( ( special_spec ) => {
                        if (special_spec.type === CASE_PROPERTIES.COLOR) {
                            return <MultiSelect key={special_spec.type} options={special_spec.options} optionsType={special_spec.optionsType} currentOptions={special_spec.currentOption} setCurrentOptions={special_spec.setCurrentOption}/>
                        } else {
                            return <OptionsDropdown key={special_spec.type} options={special_spec.options} optionsType={special_spec.optionsType} currentOption={special_spec.currentOption} setCurrentOption={special_spec.setCurrentOption}/>
                        }
                    })}
                </div> : null
            }
        </div>
    )
}

export default ComponentBuildForm