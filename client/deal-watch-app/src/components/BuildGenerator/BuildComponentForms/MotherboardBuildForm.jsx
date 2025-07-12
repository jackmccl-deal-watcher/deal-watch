import { useState } from 'react'
import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { MOTHERBOARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM, MOTHERBOARD_FORM_FACTORS, SOCKETS } from '../BuildGeneratorConstants'
import { getSliderLabelText } from './BuildFormUtils'
import { updateComponentAllocation } from './BuildFormUtils'
import { handleSpecialAllocation } from './BuildFormUtils'

const MotherboardBuildForm = ({ handleAllocations, allocations }) => {
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

    return(
        <div>
            { allocations?.[ComponentTypes.MOTHERBOARD]?.['allocation'] ?
                <div className='build-form'>
                    <p>Motherboard: {getSliderLabelText(allocations[ComponentTypes.MOTHERBOARD]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.MOTHERBOARD]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue, component_type: ComponentTypes.MOTHERBOARD, allocations, handleAllocations })}></Slider>
                    <SumSliders specs={[{ key: MOTHERBOARD_PROPERTIES.RAM_SLOTS, tag: 'Ram Slots' }, { key: MOTHERBOARD_PROPERTIES.MAX_RAM, tag: 'Max Ram' }]} handlePointsAllocationsParameters={{ component_type: ComponentTypes.MOTHERBOARD, special_specs: {form_factor: formFactor}, allocations, handleAllocations }}/>
                    <OptionsDropdown options={MOTHERBOARD_FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={handleFormFactorAllocationMotherboard}/>
                    <OptionsDropdown options={SOCKETS} optionsType={'Socket'} currentOption={socket} setCurrentOption={handleSocketAllocationMotherboard}/>
                </div> : null
            }
        </div>
    )
}

export default MotherboardBuildForm