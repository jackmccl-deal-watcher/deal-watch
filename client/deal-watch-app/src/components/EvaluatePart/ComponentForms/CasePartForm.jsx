import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { CASE_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';
import ToolTipText from '../../ToolTip/ToolTipText';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';

const CasePartForm = ({ handlePartEvaluation }) => {
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
    const COLORS = [
        'Black',
        'Black / Black',
        'Black / Blue',
        'Black / Gold',
        'Black / Gray',
        'Black / Green',
        'Black / Multicolor',
        'Black / Orange',
        'Black / Pink',
        'Black / Red',
        'Black / Silver',
        'Black / White',
        'Black / Yellow',
        'Beige / Gray',
        'Blue',
        'Blue / Black',
        'Blue / Silver',
        'Blue / Yellow',
        'Brown',
        'Camo',
        'Clear',
        'Gold',
        'Gray',
        'Gray / Black',
        'Gray / Silver',
        'Green',
        'Green / Black',
        'Green / Silver',
        'Gunmetal',
        'Multicolor',
        'Orange',
        'Pink',
        'Red',
        'Red / Black',
        'Red / Blue',
        'Red / White',
        'Silver',
        'Silver / Black',
        'Silver / Gray',
        'Silver / Orange',
        'White',
        'White / Black',
        'White / Blue',
        'White / Purple',
        'White / Red',
        'White / Silver',
        'Yellow'
    ]

    const [internalBays, setInternalBays] = useState(2)
    const [formFactor, setFormFactor] = useState('ATX Mid Tower')
    const [color, setColor] = useState('Black')

    const getInternalBaysLabelText = (internal_bays) => {
        return `${internal_bays} bays`
    }

    const caseEvaluate = () => {
        const casePart = {
            type: CASE_PROPERTIES.TYPE,
            [CASE_PROPERTIES.INTERNAL_BAYS]: internalBays,
            [CASE_PROPERTIES.FORM_FACTOR]: formFactor,
            [CASE_PROPERTIES.COLOR]: color,
        }
        handlePartEvaluation(casePart)
    }

    return(
        <div className='component-form'>
            <div className='component-form-input-label'><ToolTipText main_text={`Interal Bays: ${getInternalBaysLabelText(internalBays)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.CASE][CASE_PROPERTIES.INTERNAL_BAYS]}/></div>
            <Slider min={0} max={10} valueLabelDisplay='auto' valueLabelFormat={getInternalBaysLabelText} value={internalBays} onChange={(e, newValue) => setInternalBays(newValue)}></Slider>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={setFormFactor} component_type={ComponentTypes.CASE} spec_type={CASE_PROPERTIES.FORM_FACTOR}/>
            <OptionsDropdown options={COLORS} optionsType={'Color'} currentOption={color} setCurrentOption={setColor} component_type={ComponentTypes.CASE} spec_type={CASE_PROPERTIES.COLOR}/>
            <button className='component-form-submit-button' onClick={caseEvaluate}>Evaluate</button>
        </div>
    )
}

export default CasePartForm