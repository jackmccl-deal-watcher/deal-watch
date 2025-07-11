import { useState } from 'react'
import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { useEffect } from 'react'
import { MOTHERBOARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';

const MotherboardBuildForm = ({ handleAllocations, allocations }) => {
    const [formFactor, setFormFactor] = useState('')
    const FORM_FACTORS = [
        'ATX Mid Tower',
        'ATX Full Tower',
        'MicroATX Mid Tower',
        'ATX Desktop',
        'ATX Mini Tower',
        'ATX Test Bench',
        'HTPC',
        'MicroATX Desktop',
        'MicroATX Mini Tower',
        'MicroATX Slim',
        'Mini ITX Desktop',
        'Mini ITX Test Bench',
        'Mini ITX Tower'
    ]

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

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }


    return(
        <div>
            { allocations?.[ComponentTypes.MOTHERBOARD] ?
                <div className='build-form'>
                    <p>Motherboard:</p>
                    <Slider min={0.01} max={1} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.MOTHERBOARD]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: 'ram_slots', tag: 'Ram Slots' }, { key: 'max_ram', tag: 'Max Ram' }]} handlePointsAllocations={handlePointsAllocations}/>
                    <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={handleFormFactorAllocation}/>
                </div> : null
            }
        </div>
    )
}

export default MotherboardBuildForm