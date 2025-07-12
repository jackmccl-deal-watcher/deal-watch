import { useState } from 'react'
import { MOTHERBOARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import { handleSpecialAllocation } from './BuildFormUtils'
import ComponentBuildForm from './ComponentBuildForm'

const MotherboardBuildForm = ({ handleAllocations, allocations, component_data }) => {
    const [formFactor, setFormFactor] = useState('')
    const [socket, setSocket] = useState('')

    const handleFormFactorAllocationMotherboard = (newFormFactor) => {
        setFormFactor(newFormFactor)
        const specialAllocationParameters = {newAllocation: newFormFactor, spec_type: MOTHERBOARD_PROPERTIES.FORM_FACTOR, component_type: ComponentTypes.MOTHERBOARD, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    const handleSocketAllocationMotherboard = (newSocket) => {
        setSocket(newSocket)
        const specialAllocationParameters = {newAllocation: newSocket, spec_type: MOTHERBOARD_PROPERTIES.SOCKET, component_type: ComponentTypes.MOTHERBOARD, allocations: allocations, handleAllocations: handleAllocations}
        handleSpecialAllocation(specialAllocationParameters)
    }

    component_data.special_specs[MOTHERBOARD_PROPERTIES.FORM_FACTOR].currentOption = formFactor
    component_data.special_specs[MOTHERBOARD_PROPERTIES.FORM_FACTOR].setCurrentOption = handleFormFactorAllocationMotherboard

    component_data.special_specs[MOTHERBOARD_PROPERTIES.SOCKET].currentOption = socket
    component_data.special_specs[MOTHERBOARD_PROPERTIES.SOCKET].setCurrentOption = handleSocketAllocationMotherboard

    return(
        <div>
            <ComponentBuildForm handleAllocations={handleAllocations} allocations={allocations} component_data={component_data}/>
        </div>
    )
}

export default MotherboardBuildForm