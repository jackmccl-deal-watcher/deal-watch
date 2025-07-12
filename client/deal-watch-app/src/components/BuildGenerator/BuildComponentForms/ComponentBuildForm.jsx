import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { CASE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import Slider from '@mui/material/Slider';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants'
import MultiSelect from './MultiSelect'
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils'

const ComponentBuildForm = ({ handleAllocations, allocations, component_data }) => {

    const getSpecialSpecsDict = () => {
        let special_specs = {}
        if (!(component_data.special_spec)) {
            return special_specs
        } else {
            Object.values(component_data?.special_specs).forEach( (special_spec) => {
                special_specs[special_spec.type] = special_spec.currentOption 
            })
            return special_specs
        }
    }

    return(
        <div>
            { component_data && allocations?.[component_data.component_type]?.['allocation'] ?
                <div className='build-form'>
                    <p>{component_data.component_name}: {getSliderLabelText(allocations[component_data.component_type]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[component_data.component_type]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: component_data.component_type, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={component_data.main_specs} handlePointsAllocationsParameters={{ component_type: component_data.component_type, special_specs: getSpecialSpecsDict(), allocations, handleAllocations }}/>
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