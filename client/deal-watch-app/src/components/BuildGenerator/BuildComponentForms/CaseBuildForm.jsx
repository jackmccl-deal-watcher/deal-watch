import { useState } from 'react'
import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { CASE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { CASE_FORM_FACTORS, COLORS, COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants'
import MultiSelect from './MultiSelect'
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils'
import { handleSpecialAllocation } from './BuildFormUtils'

const CaseBuildForm = ({ handleAllocations, allocations }) => {
    const [formFactor, setFormFactor] = useState('')
    const [colors, setColors] = useState([])

    const handleCaseColorAllocation = (newColors) => {
        setColors(newColors)
        const specialAllocationParameters = {newAllocation: newColors, spec_type: CASE_PROPERTIES.COLOR, component_type: ComponentTypes.CASE, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    const handleFormFactorAllocationCase = (newFormFactor) => {
        setFormFactor(newFormFactor)
        const specialAllocationParameters = {newAllocation: newFormFactor, spec_type: CASE_PROPERTIES.FORM_FACTOR, component_type: ComponentTypes.CASE, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    return(
        <div>
            { allocations?.[ComponentTypes.CASE]?.['allocation'] ?
                <div className='build-form'>
                    <p>Case: {getSliderLabelText(allocations[ComponentTypes.CASE]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.CASE]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: ComponentTypes.CASE, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={[{ key: CASE_PROPERTIES.INTERNAL_BAYS, tag: 'Internal Bays' }, { key: CASE_PROPERTIES.COLOR, tag: 'Color' }]} handlePointsAllocationsParameters={{ component_type: ComponentTypes.CASE, special_specs: {form_factor: formFactor, color: colors}, allocations, handleAllocations }}/>
                    <MultiSelect options={COLORS} optionsType={'Colors'} currentOptions={colors} setCurrentOptions={handleCaseColorAllocation}/>
                    <OptionsDropdown options={CASE_FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={handleFormFactorAllocationCase}/>
                </div> : null
            }
        </div>
    )
}

export default CaseBuildForm