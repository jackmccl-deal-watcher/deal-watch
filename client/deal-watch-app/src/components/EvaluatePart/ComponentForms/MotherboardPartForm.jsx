import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { MOTHERBOARD_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

const MotherboardPartForm = ({ handlePartEvaluation }) => {
    const SOCKETS = [
        '2 x G34',
        '2 x LGA1366',
        '2 x LGA2011',
        '2 x LGA2011-3',
        '2 x LGA2011-3 Narrow',
        'AM1',
        'AM2',
        'AM2+/AM2',
        'AM3',
        'AM3+',
        'AM3+/AM3',
        'AM3/AM2+',
        'AM3/AM2+/AM2',
        'AM4',
        'FM1',
        'FM2',
        'FM2+',
        'Integrated A4-5000',
        'Integrated Athlon II X2 215',
        'Integrated Atom 230',
        'Integrated Atom 330',
        'Integrated Atom C2358',
        'Integrated Atom C2550',
        'Integrated Atom C2750',
        'Integrated Atom D2500',
        'Integrated Atom D2550',
        'Integrated Atom D2700',
        'Integrated Atom D410',
        'Integrated Atom D425',
        'Integrated Atom D510',
        'Integrated Atom D525',
        'Integrated Atom N550',
        'Integrated C-Series C-70',
        'Integrated Celeron 1037U',
        'Integrated Celeron 847',
        'Integrated Celeron J1900',
        'Integrated Celeron N3050',
        'Integrated Celeron N3150',
        'Integrated E-Series E-350',
        'Integrated E-Series E-450',
        'Integrated Pentium J3710',
        'Integrated Pentium N3700',
        'Integrated Xeon D-1520',
        'Integrated Xeon D-1521',
        'Integrated Xeon D-1537',
        'Integrated Xeon D-1541',
        'LGA1150',
        'LGA1151',
        'LGA1155',
        'LGA1156',
        'LGA1200',
        'LGA1366',
        'LGA2011',
        'LGA2011-3',
        'LGA2011-3 Narrow',
        'LGA2066',
        'LGA775',
        'sTR4',
        'sTRX4'
    ]
    const FORM_FACTORS = [
        'ATX',
        'EATX',
        'Flex ATX',
        'HPTX',
        'Micro ATX',
        'Mini DTX',
        'Mini ITX',
        'SSI CEB',
        'SSI EEB',
        'Thin Mini ITX',
        'XL ATX'
    ]
    const [ramSlots, setRamSlots] = useState(4)
    const [maxRam, setMaxRam] = useState(7)
    const [socket, setSocket] = useState('')
    const [formFactor, setFormFactor] = useState('')

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
            <OptionsDropdown options={SOCKETS} optionsType={'Socket'} currentOptions={socket} setCurrentOption={setSocket} component_type={ComponentTypes.MOTHERBOARD} spec_type={MOTHERBOARD_PROPERTIES.SOCKET}/>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOptions={formFactor} setCurrentOption={setFormFactor} component_type={ComponentTypes.MOTHERBOARD} spec_type={MOTHERBOARD_PROPERTIES.FORM_FACTOR}/>
            <button className='component-form-submit-button' onClick={motherboardEvaluate}>Evaluate</button>
        </div>
    )
}

export default MotherboardPartForm