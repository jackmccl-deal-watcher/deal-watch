import { useState } from 'react'
import { CASE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import { handleSpecialAllocation } from './BuildFormUtils'
import ComponentBuildForm from './ComponentBuildForm'

const CaseBuildForm = ({ handleAllocations, allocations, component_data }) => {
    const [colors, setColors] = useState([])
    const [formFactor, setFormFactor] = useState('')

    const handleColorAllocationCase = (newColors) => {
        setColors(newColors)
        const specialAllocationParameters = {newAllocation: newColors, spec_type: CASE_PROPERTIES.COLOR, component_type: ComponentTypes.CASE, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    const handleFormFactorAllocationCase = (newFormFactor) => {
        setFormFactor(newFormFactor)
        const specialAllocationParameters = {newAllocation: newFormFactor, spec_type: CASE_PROPERTIES.FORM_FACTOR, component_type: ComponentTypes.CASE, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    component_data.special_specs[CASE_PROPERTIES.COLOR].currentOption = colors
    component_data.special_specs[CASE_PROPERTIES.COLOR].setCurrentOption = handleColorAllocationCase

    component_data.special_specs[CASE_PROPERTIES.FORM_FACTOR].currentOption = formFactor
    component_data.special_specs[CASE_PROPERTIES.FORM_FACTOR].setCurrentOption = handleFormFactorAllocationCase

    return(
        <ComponentBuildForm handleAllocations={handleAllocations} allocations={allocations} component_data={component_data}/>
    )
}

export default CaseBuildForm