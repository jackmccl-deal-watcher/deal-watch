import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { CPU_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';

const CPUPartForm = ({ handlePartEvaluation }) => {
    const [cores, setCores] = useState(4)
    const [baseClock, setBaseClock] = useState(3200000000)
    const [boostClock, setBoostClock] = useState(3400000000)

    const getCoresLabelText = (cores) => {
        return `${cores} cores`
    }

    const getClockSpeedLabelText = (speed) => {
        return `${Math.round(speed/1000000000 * 100) / 100} GHz`
    }

    const cpuEvaluate = () => {
        const cpu = {
            type: CPU_PROPERTIES.TYPE,
            [CPU_PROPERTIES.CORES]: cores,
            [CPU_PROPERTIES.BASE_CLOCK]: baseClock,
            [CPU_PROPERTIES.BOOST_CLOCK]: boostClock,
        }
        handlePartEvaluation(cpu)
    }

    return(
        <div className='component-form'>
            <div className='component-form-input-label'><ToolTipText main_text={`Cores: ${cores}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.CPU][CPU_PROPERTIES.CORES]}/></div>
            <Slider slotProps={{'input': {'className': `cpu-cores-slider-input`}}} min={2} max={64} step={2} valueLabelDisplay='auto' valueLabelFormat={getCoresLabelText} value={cores} onChange={(e, newValue) => setCores(newValue)}></Slider>
            <div className='component-form-input-label'><ToolTipText main_text={`Base Clock: ${getClockSpeedLabelText(baseClock)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.CPU][CPU_PROPERTIES.BASE_CLOCK]}/></div>
            <Slider min={1000000000} max={4800000000} step={100000000} valueLabelDisplay='auto' valueLabelFormat={getClockSpeedLabelText} value={baseClock} onChange={(e, newValue) => setBaseClock(newValue)}></Slider>
            <div className='component-form-input-label'><ToolTipText main_text={`Boost Clock: ${getClockSpeedLabelText(boostClock)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.CPU][CPU_PROPERTIES.BOOST_CLOCK]}/></div>
            <Slider min={1000000000} max={5500000000} step={100000000} valueLabelDisplay='auto' valueLabelFormat={getClockSpeedLabelText} value={boostClock} onChange={(e, newValue) => setBoostClock(newValue)}></Slider>
            <button className='component-form-submit-button' onClick={cpuEvaluate}>Evaluate</button>
        </div>
    )
}

export default CPUPartForm