import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { CASE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import Slider from '@mui/material/Slider';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants'
import MultiSelect from './MultiSelect'
import { getSliderLabelText } from './BuildFormUtils'
import { useEffect, useState } from 'react';

const ComponentBuildForm = ({ component_data, handleUpdateAllocations, allocations }) => {
    const [trigger, useTrigger] = useState(false)

    const handleUpdatePoints = (pointsDict) => {
        let newAllocationsDict = {...pointsDict}
        if(pointsDict?.[CASE_PROPERTIES.COLOR]) {
            newAllocationsDict[CASE_PROPERTIES.COLOR] = {
                allocation: pointsDict[CASE_PROPERTIES.COLOR],
                colors: component_data.special_specs[CASE_PROPERTIES.COLOR].currentOption,
            }
            component_data.special_specs.color.allocation = pointsDict[CASE_PROPERTIES.COLOR]
        }
        handleUpdateAllocations(component_data.component_type, newAllocationsDict)
    }

    const createComponentAllocations = () => {
        let newAllocationsDict = {}
        component_data?.main_specs?.forEach( (main_spec) => {
            newAllocationsDict[main_spec.key] = 1 /  component_data.main_specs.length
        })
        component_data?.special_specs && Object.values(component_data.special_specs).forEach( (special_spec) => {
            switch (special_spec.type) {
                case 'color':
                    newAllocationsDict[special_spec.type] = {
                        allocation: 1 /  component_data.main_specs.length,
                        colors: [],
                    }
                    special_spec.currentOption = newAllocationsDict[special_spec.type]['colors']
                    special_spec.allocaton = newAllocationsDict[special_spec.type]['allocation']
                    special_spec.setCurrentOption = (newValue) => {
                        let newAllocationsDict = {}
                        newAllocationsDict[special_spec.type] = {
                            allocation: special_spec.allocation,
                            colors: newValue,
                        }
                        handleUpdateAllocations(component_data.component_type, newAllocationsDict)
                        special_spec.currentOption = newValue
                        useTrigger(prev => !prev)
                    }
                    break
                default:
                    newAllocationsDict[special_spec.type] = ''
                    special_spec.currentOption = newAllocationsDict[special_spec.type]
                    special_spec.setCurrentOption = (newValue) => {
                        let newAllocationsDict = {}
                        newAllocationsDict[special_spec.type] = newValue
                        handleUpdateAllocations(component_data.component_type, newAllocationsDict)
                        special_spec.currentOption = newValue
                        useTrigger(prev => !prev)
                    }
            }
        })
        handleUpdateAllocations(component_data.component_type, newAllocationsDict)
    }

    useEffect(() => {
        createComponentAllocations()
    }, [])
    
    return(
        <div className='build-form'>
            { component_data && allocations?.[component_data.component_type]?.['allocation'] ?
                <div className='build-form-container'>
                    <p>{component_data.component_name}: {getSliderLabelText(allocations[component_data.component_type]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[component_data.component_type]['allocation']} onChange={(e, newValue) => handleUpdateAllocations(component_data.component_type, {'allocation': newValue} )}></Slider>
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