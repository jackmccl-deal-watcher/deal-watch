import { useState } from 'react'
import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { MOTHERBOARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM, MOTHERBOARD_FORM_FACTORS, SOCKETS } from '../BuildGeneratorConstants'

const MotherboardBuildForm = ({ handleAllocations, allocations }) => {
    const [formFactor, setFormFactor] = useState('')
    const [socket, setSocket] = useState('')

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            componentAllocationsDict[key] = pointsDict[key]
        })
        componentAllocationsDict[MOTHERBOARD_PROPERTIES.FORM_FACTOR] = formFactor
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.MOTHERBOARD]['allocation']
        handleAllocations(ComponentTypes.MOTHERBOARD, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.MOTHERBOARD]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.MOTHERBOARD, componentAllocationsDict)
    }

    const handleFormFactorAllocation = (newFormFactor) => {
        setFormFactor(newFormFactor)
        let componentAllocationsDict = {...allocations[ComponentTypes.MOTHERBOARD]}
        componentAllocationsDict[MOTHERBOARD_PROPERTIES.FORM_FACTOR] = newFormFactor
        handleAllocations(ComponentTypes.MOTHERBOARD, componentAllocationsDict)
    }

    const handleSocketAllocation = (newSocket) => {
        setSocket(newSocket)
        let componentAllocationsDict = {...allocations[ComponentTypes.MOTHERBOARD]}
        componentAllocationsDict[MOTHERBOARD_PROPERTIES.SOCKET] = newSocket
        handleAllocations(ComponentTypes.MOTHERBOARD, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }


    return(
        <div>
            { allocations?.[ComponentTypes.MOTHERBOARD]?.['allocation'] ?
                <div className='build-form'>
                    <p>Motherboard: {getSliderLabelText(allocations[ComponentTypes.MOTHERBOARD]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.MOTHERBOARD]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: MOTHERBOARD_PROPERTIES.RAM_SLOTS, tag: 'Ram Slots' }, { key: MOTHERBOARD_PROPERTIES.MAX_RAM, tag: 'Max Ram' }]} handlePointsAllocations={handlePointsAllocations}/>
                    <OptionsDropdown options={MOTHERBOARD_FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={handleFormFactorAllocation}/>
                    <OptionsDropdown options={SOCKETS} optionsType={'Socket'} currentOption={socket} setCurrentOption={handleSocketAllocation}/>
                </div> : null
            }
        </div>
    )
}

export default MotherboardBuildForm