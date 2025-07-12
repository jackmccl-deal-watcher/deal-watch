import SumSliders from '../SumSliders'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { POWER_SUPPLY_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM, POWER_SUPPLY_FORM_FACTORS } from '../BuildGeneratorConstants';
import { useState } from 'react';
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { getSliderLabelText, handleSpecialAllocation } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils';

const PowerSupplyBuildForm = ({ handleAllocations, allocations }) => {
    const [formFactor, setFormFactor] = useState('')

    const handleFormFactorAllocationPowerSupply = (newFormFactor) => {
        setFormFactor(newFormFactor)
        const specialAllocationParameters = {newAllocation: newFormFactor, spec_type: POWER_SUPPLY_PROPERTIES.FORM_FACTOR, component_type: ComponentTypes.POWER_SUPPLY, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    return(
        <div>
            { allocations?.[ComponentTypes.POWER_SUPPLY]?.['allocation'] ?
                <div className='build-form'>
                    <p>Power-Supply: {getSliderLabelText(allocations[ComponentTypes.POWER_SUPPLY]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.POWER_SUPPLY]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: ComponentTypes.POWER_SUPPLY, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={[{ key: POWER_SUPPLY_PROPERTIES.WATTAGE, tag: 'Wattage' }, { key: POWER_SUPPLY_PROPERTIES.EFFICIENCY_RATING, tag: 'Efficiency Rating' }, { key: POWER_SUPPLY_PROPERTIES.MODULAR, tag: 'Modularity' }]} handlePointsAllocationsParameters={{ component_type: ComponentTypes.POWER_SUPPLY, special_specs: {form_factor: formFactor}, allocations, handleAllocations }}/>
                    <OptionsDropdown options={POWER_SUPPLY_FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={handleFormFactorAllocationPowerSupply}/>
                </div> : null
            }
        </div>
    )
}

export default PowerSupplyBuildForm