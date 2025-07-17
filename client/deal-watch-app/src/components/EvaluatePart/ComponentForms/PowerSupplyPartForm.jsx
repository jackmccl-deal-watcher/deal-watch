import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { POWER_SUPPLY_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

const PowerSupplyPartForm = ({ handlePartEvaluation }) => {
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
    const [formFactor, setFormFactor] = useState('ATX')
    const [efficiencyRating, setEfficiencyRating] = useState('80+ Gold')
    const [modular, setModular] = useState('Full')

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
            <div className='component-form-input-label'><ToolTipText main_text={`Wattage: ${getWattageLabelText(wattage)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.POWER_SUPPLY][POWER_SUPPLY_PROPERTIES.WATTAGE]}/></div>
            <Slider min={150} max={2000} step={50} valueLabelDisplay='auto' valueLabelFormat={getWattageLabelText} value={wattage} onChange={(e, newValue) => setWattage(newValue)}></Slider>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={setFormFactor} component_type={ComponentTypes.POWER_SUPPLY} spec_type={POWER_SUPPLY_PROPERTIES.FORM_FACTOR}/>
            <OptionsDropdown options={EFFICIENCY_RATINGS} optionsType={'Efficiency Rating'} currentOption={efficiencyRating} setCurrentOption={setEfficiencyRating} component_type={ComponentTypes.POWER_SUPPLY} spec_type={POWER_SUPPLY_PROPERTIES.EFFICIENCY_RATING}/>
            <OptionsDropdown options={MODULARITIES} optionsType={'Modularity'} currentOption={modular} setCurrentOption={setModular} component_type={ComponentTypes.POWER_SUPPLY} spec_type={POWER_SUPPLY_PROPERTIES.MODULAR}/>
            <button className='component-form-submit-button' onClick={powerSupplyEvaluate}>Evaluate</button>
        </div>
    )
}

export default PowerSupplyPartForm