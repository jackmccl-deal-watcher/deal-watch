import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { CASE_PROPERTIES } from '../../../enums/ComponentPropertiesEnums'
import Slider from '@mui/material/Slider';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants'
import MultiSelect from './MultiSelect'
import { getSliderLabelText } from './BuildFormUtils'
import { useEffect, useState } from 'react';
import { ComponentSpecs } from '../../DisplayBuilds/BuildConstants';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

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
            newAllocationsDict[main_spec.key] = 1 / component_data.main_specs.length
        })
        component_data?.special_specs && Object.values(component_data.special_specs).forEach( (special_spec) => {
            switch (special_spec.type) {
                case ComponentSpecs.COLOR:
                    newAllocationsDict[special_spec.type] = {
                        allocation: 1 /  component_data.main_specs.length,
                        colors: special_spec.currentOption,
                    }
                    special_spec.currentOption = newAllocationsDict[special_spec.type][ComponentSpecs.COLORS]
                    special_spec.allocaton = newAllocationsDict[special_spec.type][ComponentSpecs.ALLOCATION]
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
                    newAllocationsDict[special_spec.type] = special_spec.currentOption
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
        setTimeout(createComponentAllocations, 100)
    }, [])
    return(
        <div className='build-form'>
            { component_data && allocations?.[component_data.component_type]?.[ComponentSpecs.ALLOCATION] ?
                <div className='build-form-container'>
                    <div className='build-form-component-type'><ToolTipText main_text={`${component_data.component_name}: ${getSliderLabelText(allocations[component_data.component_type][ComponentSpecs.ALLOCATION])}`} tool_tip={TOOL_TIPCS_DICT[component_data.component_type][component_data.component_type]}/></div>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText(allocations[component_data.component_type][ComponentSpecs.ALLOCATION])} value={allocations[component_data.component_type][ComponentSpecs.ALLOCATION]} onChange={(e, newValue) => handleUpdateAllocations(component_data.component_type, {[ComponentSpecs.ALLOCATION]: newValue} )}></Slider>
                    <SumSliders specs={component_data.main_specs} component_type={component_data.component_type} handleUpdatePoints={handleUpdatePoints}/>
                    { component_data.special_specs && Object.values(component_data.special_specs).map( ( special_spec ) => {
                        if (special_spec.type === CASE_PROPERTIES.COLOR) {
                            return <MultiSelect key={special_spec.type} options={special_spec.options} optionsType={special_spec.optionsType} currentOptions={special_spec.currentOption} setCurrentOptions={special_spec.setCurrentOption} component_type={component_data.component_type} spec_type={special_spec.type}/>
                        } else {
                            return <OptionsDropdown key={special_spec.type} options={special_spec.options} optionsType={special_spec.optionsType} currentOption={special_spec.currentOption} setCurrentOption={special_spec.setCurrentOption} component_type={component_data.component_type} spec_type={special_spec.type}/>
                        }
                    })}
                </div> : null
            }
        </div>
    )
}

export default ComponentBuildForm