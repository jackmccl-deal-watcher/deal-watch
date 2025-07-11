import { useState } from 'react'
import SumSliders from '../SumSliders'
import OptionsDropdown from '../../EvaluatePart/ComponentForms/OptionsDropdown'
import { CASE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums'
import ComponentTypes from '../../../component_enums/ComponentTypesEnum'
import Slider from '@mui/material/Slider';
import { CASE_FORM_FACTORS, COLORS, COMPONENT_ALLOCATION_MAXIMUM, COMPONENT_ALLOCATION_MINIMUM, SPEC_ALLOCATION_MINIMUM } from '../BuildGeneratorConstants'
import MultiSelect from './MultiSelect'

const CaseBuildForm = ({ handleAllocations, allocations }) => {
    const [formFactor, setFormFactor] = useState('')
    const [colors, setColors] = useState([])

    const handlePointsAllocations = (pointsDict) => {
        let componentAllocationsDict = {...pointsDict}
        pointsDict && Object.keys(pointsDict).forEach((key) => {
            if (key !== CASE_PROPERTIES.COLOR) {
                componentAllocationsDict[key] = allocations[ComponentTypes.CASE]['allocation']
            } else if (key === CASE_PROPERTIES.COLOR) {
                componentAllocationsDict[key] = {
                    allocation: allocations[ComponentTypes.CASE]['allocation'],
                    colors: colors,
                }
            }
        })
        componentAllocationsDict['allocation'] = allocations[ComponentTypes.CASE]['allocation']
        componentAllocationsDict[CASE_PROPERTIES.FORM_FACTOR] = formFactor
        handleAllocations(ComponentTypes.CASE, componentAllocationsDict)
    }

    const updateComponentAllocation = ({newValue}) => {
        let componentAllocationsDict = {...allocations[ComponentTypes.CASE]}
        componentAllocationsDict['allocation'] = newValue
        handleAllocations(ComponentTypes.CASE, componentAllocationsDict)
    }

    const handleColorAllocation = (newColors) => {
        setColors(newColors)
        let componentAllocationsDict = {...allocations[ComponentTypes.CASE]}
        componentAllocationsDict[CASE_PROPERTIES.COLOR] = {
            allocation: allocations[ComponentTypes.CASE]['allocation'],
            colors: newColors,
        }
        handleAllocations(ComponentTypes.CASE, componentAllocationsDict)
    }

    const handleFormFactorAllocation = (newFormFactor) => {
        setFormFactor(newFormFactor)
        let componentAllocationsDict = {...allocations[ComponentTypes.CASE]}
        componentAllocationsDict[CASE_PROPERTIES.FORM_FACTOR] = newFormFactor
        handleAllocations(ComponentTypes.CASE, componentAllocationsDict)
    }

    const getSliderLabelText = (points) => {
        return Math.floor(points * 100)
    }


    return(
        <div>
            { allocations?.[ComponentTypes.CASE]?.['allocation'] ?
                <div className='build-form'>
                    <p>Case: {getSliderLabelText(allocations[ComponentTypes.CASE]['allocation'])}</p>
                    <Slider min={COMPONENT_ALLOCATION_MINIMUM} max={COMPONENT_ALLOCATION_MAXIMUM} step={0.01} valueLabelDisplay='auto' valueLabelFormat={getSliderLabelText} value={allocations[ComponentTypes.CASE]['allocation']} onChange={(e, newValue) => updateComponentAllocation({ newValue })}></Slider>
                    <SumSliders specs={[{ key: CASE_PROPERTIES.INTERNAL_BAYS, tag: 'Internal Bays' }, { key: CASE_PROPERTIES.COLOR, tag: 'Color' }]} handlePointsAllocations={handlePointsAllocations}/>
                    <MultiSelect options={COLORS} optionsType={'Colors'} currentOptions={colors} setCurrentOptions={handleColorAllocation}/>
                    <OptionsDropdown options={CASE_FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={handleFormFactorAllocation}/>
                </div> : null
            }
        </div>
    )
}

export default CaseBuildForm