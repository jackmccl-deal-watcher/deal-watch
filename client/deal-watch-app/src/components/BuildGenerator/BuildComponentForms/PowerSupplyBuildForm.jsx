import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import { POWER_SUPPLY_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import { useState } from 'react';
import { handleSpecialAllocation } from './BuildFormUtils'
import ComponentBuildForm from './ComponentBuildForm';

const PowerSupplyBuildForm = ({ handleAllocations, allocations, component_data }) => {
    const [formFactor, setFormFactor] = useState('')

    const handleFormFactorAllocationPowerSupply = (newFormFactor) => {
        setFormFactor(newFormFactor)
        const specialAllocationParameters = {newAllocation: newFormFactor, spec_type: POWER_SUPPLY_PROPERTIES.FORM_FACTOR, component_type: ComponentTypes.POWER_SUPPLY, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    component_data.special_specs[POWER_SUPPLY_PROPERTIES.FORM_FACTOR].currentOption = formFactor
    component_data.special_specs[POWER_SUPPLY_PROPERTIES.FORM_FACTOR].setCurrentOption = handleFormFactorAllocationPowerSupply

    return(
        <div>
            <ComponentBuildForm handleAllocations={handleAllocations} allocations={allocations} component_data={component_data}/>
        </div>
    )
}

export default PowerSupplyBuildForm