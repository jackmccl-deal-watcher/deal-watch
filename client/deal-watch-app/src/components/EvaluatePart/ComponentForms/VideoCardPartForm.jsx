import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { VIDEOCARD_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

const VideoCardPartForm = ({ handlePartEvaluation }) => {
    const [vram, setVram] = useState(6000000000)
    const [baseClock, setBaseClock] = useState(1350000000)
    const [boostClock, setBoostClock] = useState(1750000000)

    const getVramLabelText = (vram) => {
        return `${Math.round(vram/1000000000 * 100) / 100} GBs`
    }

    const getClockSpeedLabelText = (speed) => {
        return `${Math.round(speed/1000000000 * 100) / 100} GHz`
    }

    const videocardEvaluate = () => {
        const videocard = {
            type: VIDEOCARD_PROPERTIES.TYPE,
            [VIDEOCARD_PROPERTIES.VRAM]: vram,
            [VIDEOCARD_PROPERTIES.BASE_CLOCK]: baseClock,
            [VIDEOCARD_PROPERTIES.BOOST_CLOCK]: boostClock,
        }
        handlePartEvaluation(videocard)
    }

    return(
        <div className='component-form'>
            <div className='component-form-input-label'><ToolTipText main_text={`VRAM: ${getVramLabelText(vram)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.VIDEOCARD][VIDEOCARD_PROPERTIES.VRAM]}/></div>
            <Slider min={1000000000} max={48000000000} step={1000000000} valueLabelDisplay='auto' valueLabelFormat={getVramLabelText} value={vram} onChange={(e, newValue) => setVram(newValue)}></Slider>
            <div className='component-form-input-label'><ToolTipText main_text={`Base Clock: ${getClockSpeedLabelText(baseClock)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.VIDEOCARD][VIDEOCARD_PROPERTIES.BASE_CLOCK]}/></div>
            <Slider min={115000000} max={1825000000} step={100000000} valueLabelDisplay='auto' valueLabelFormat={getClockSpeedLabelText} value={baseClock} onChange={(e, newValue) => setBaseClock(newValue)}></Slider>
            <div className='component-form-input-label'><ToolTipText main_text={`Boost Clock: ${getClockSpeedLabelText(boostClock)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.VIDEOCARD][VIDEOCARD_PROPERTIES.BOOST_CLOCK]}/></div>
            <Slider min={250000000} max={2250000000} step={100000000} valueLabelDisplay='auto' valueLabelFormat={getClockSpeedLabelText} value={boostClock} onChange={(e, newValue) => setBoostClock(newValue)}></Slider>
            <button className='component-form-submit-button' onClick={videocardEvaluate}>Evaluate</button>
        </div>
    )
}

export default VideoCardPartForm