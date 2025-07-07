import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { VIDEOCARD_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import './ComponentForm.css'

const VideoCardForm = ({ handlePartEvaluation }) => {
    const [vram, setVram] = useState(8000000000)
    const [baseClock, setBaseClock] = useState(1000000000)
    const [boostClock, setBoostClock] = useState(1200000000)

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
            <p className='component-form-input-label'>VRAM: {getVramLabelText(vram)}</p>
            <Slider min={1000000000} max={48000000000} step={1000000000} valueLabelDisplay='auto' valueLabelFormat={getVramLabelText} value={vram} onChange={(e, newValue) => setVram(newValue)}></Slider>
            <p className='component-form-input-label'>Base Clock: {getClockSpeedLabelText(baseClock)}</p>
            <Slider min={115000000} max={1825000000} step={10000000} valueLabelDisplay='auto' valueLabelFormat={getClockSpeedLabelText} value={baseClock} onChange={(e, newValue) => setBaseClock(newValue)}></Slider>
            <p className='component-form-input-label'>Boost Clock: {getClockSpeedLabelText(boostClock)}</p>
            <Slider min={250000000} max={2250000000} step={10000000} valueLabelDisplay='auto' valueLabelFormat={getClockSpeedLabelText} value={boostClock} onChange={(e, newValue) => setBoostClock(newValue)}></Slider>
            <button className='component-form-submit-button' onClick={videocardEvaluate}>Evaluate</button>
        </div>
    )
}

export default VideoCardForm