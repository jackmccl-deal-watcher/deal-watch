import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { MOTHERBOARD_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

const MotherboardPartForm = ({ handlePartEvaluation }) => {
    const SOCKETS = [
        "LGA1700",
        "LGA1151",
        "LGA1150",
        "LGA1155",
        "AM5",
        "LGA1200",
        "AM4",
        "AM3",
        "LGA1851",
        "LGA1156",
        "LGA775",
        "LGA2011-3",
        "LGA1366",
        "AM3/AM2+/AM2",
        "Integrated Celeron 1037U",
        "FM1",
        "2 x LGA2011-3 Narrow",
        "Integrated Atom D2700"
    ]
    const FORM_FACTORS = [
        "ATX", 
        "Micro ATX", 
        "Mini ITX", 
        "EATX",
    ]
    const [ramSlots, setRamSlots] = useState(4)
    const [maxRam, setMaxRam] = useState(7)
    const [socket, setSocket] = useState('AM5')
    const [formFactor, setFormFactor] = useState('ATX')

    const getRamSlotsLabelText = (ram_slots) => {
        return `${ram_slots} slots`
    }

    const getMaxRamLabelText = () => {
        return `${Math.round(calcMaxRam(maxRam)/1000000000 * 100) / 100} GBs`
    }

    const calcMaxRam = (value) => {
        return 2 ** value * 1000000000
    }

    const motherboardEvaluate = () => {
        const motherboard = {
            type: MOTHERBOARD_PROPERTIES.TYPE,
            [MOTHERBOARD_PROPERTIES.RAM_SLOTS]: ramSlots,
            [MOTHERBOARD_PROPERTIES.MAX_RAM]: calcMaxRam(maxRam),
            [MOTHERBOARD_PROPERTIES.SOCKET]: socket,
            [MOTHERBOARD_PROPERTIES.FORM_FACTOR]: formFactor,
        }
        handlePartEvaluation(motherboard)
    }
    return(
        <div className='component-form'>
            <div className='component-form-input-label'><ToolTipText main_text={`Ram Slots: ${getRamSlotsLabelText(ramSlots)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.MOTHERBOARD][MOTHERBOARD_PROPERTIES.RAM_SLOTS]}/></div>
            <Slider min={2} max={16} step={2} valueLabelDisplay='auto' valueLabelFormat={getRamSlotsLabelText} value={ramSlots} onChange={(e, newValue) => setRamSlots(newValue)}></Slider>
            <div className='component-form-input-label'><ToolTipText main_text={`Max Ram: ${getMaxRamLabelText(maxRam)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.MOTHERBOARD][MOTHERBOARD_PROPERTIES.RAM_SLOTS]}/></div>
            <Slider min={2} max={9} step={1} scale={calcMaxRam} valueLabelDisplay='auto' valueLabelFormat={getMaxRamLabelText} value={maxRam} onChange={(e, newValue) => setMaxRam(newValue)}></Slider>
            <OptionsDropdown options={SOCKETS} optionsType={'Socket'} currentOption={socket} setCurrentOption={setSocket} component_type={ComponentTypes.MOTHERBOARD} spec_type={MOTHERBOARD_PROPERTIES.SOCKET}/>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={setFormFactor} component_type={ComponentTypes.MOTHERBOARD} spec_type={MOTHERBOARD_PROPERTIES.FORM_FACTOR}/>
            <button className='component-form-submit-button' onClick={motherboardEvaluate}>Evaluate</button>
        </div>
    )
}

export default MotherboardPartForm