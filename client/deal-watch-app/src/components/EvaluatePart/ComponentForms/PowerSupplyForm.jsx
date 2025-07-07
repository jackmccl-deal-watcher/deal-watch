import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { POWER_SUPPLY_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import './ComponentForm.css'
import OptionsDropdown from './OptionsDropdown';

const PowerSupplyForm = ({ handlePartEvaluation }) => {
    const FORM_FACTORS = [ 
        'ATX', 
        'BTX', 
        'Flex ATX', 
        'Micro ATX', 
        'Mini ITX', 
        'SFX', 
        'TFX'
    ]
    const EFFICIENCY_RATINGS = [
        '80+',
        '80+ Bronze',
        '80+ Silver',
        '80+ Gold',
        '80+ Platinum',
        '80+ Titanium'
    ]
    const MODULARITIES = [ 
        'Full', 
        'Semi', 
        'No' 
    ]
    const [wattage, setWattage] = useState(600)
    const [formFactor, setFormFactor] = useState('')
    const [efficiencyRating, setEfficiencyRating] = useState('')
    const [modular, setModular] = useState('')

    const getWattageLabelText = (wattage) => {
        return `${wattage} watts`
    }

    const powerSupplyEvaluate = () => {
        const powerSupply = {
            type: POWER_SUPPLY_PROPERTIES.TYPE,
            [POWER_SUPPLY_PROPERTIES.WATTAGE]: wattage,
            [POWER_SUPPLY_PROPERTIES.FORM_FACTOR]: formFactor,
            [POWER_SUPPLY_PROPERTIES.EFFICIENCY_RATING]: efficiencyRating,
            [POWER_SUPPLY_PROPERTIES.MODULAR]: modular,
        }
        handlePartEvaluation(powerSupply)
    }

    return(
        <div className='component-form'>
            <p className='component-form-input-label'>Wattage: {getWattageLabelText(wattage)}</p>
            <Slider min={180} max={2000} valueLabelDisplay='auto' valueLabelFormat={getWattageLabelText} value={wattage} onChange={(e, newValue) => setWattage(newValue)}></Slider>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOptions={formFactor} setCurrentOption={setFormFactor}/>
            <OptionsDropdown options={EFFICIENCY_RATINGS} optionsType={'Efficiency Rating'} currentOptions={efficiencyRating} setCurrentOption={setEfficiencyRating}/>
            <OptionsDropdown options={MODULARITIES} optionsType={'Modularity'} currentOptions={modular} setCurrentOption={setModular}/>
            <button className='component-form-submit-button' onClick={powerSupplyEvaluate}>Evaluate</button>
        </div>
    )
}

export default PowerSupplyForm