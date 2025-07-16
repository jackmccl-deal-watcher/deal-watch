import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { MEMORY_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';

const MemoryPartForm = ({ handlePartEvaluation }) => {
    const MODULE_TYPES = [ 
        'DDR', 
        'DDR2', 
        'DDR3', 
        'DDR4' 
    ]

    const [speed, setSpeed] = useState(2400000000)
    const [totalSize, setTotalSize] = useState(4)
    const [moduleType, setModuleType] = useState('')

    const getSpeedLabelText = (speed) => {
        return `${Math.round(speed/1000000000 * 100) / 100} GHz`
    }

    const getTotalSizeLabelText = () => {
        return `${Math.round(calcTotalSize(totalSize)/1000000000 * 100) / 100} GBs`
    }

    const calcTotalSize = (value) => {
        return 2 ** value * 1000000000
    }

    const memoryEvaluate = () => {
        const memory = {
            type: MEMORY_PROPERTIES.TYPE,
            [MEMORY_PROPERTIES.SPEED]: speed,
            [MEMORY_PROPERTIES.TOTAL_SIZE]: calcTotalSize(totalSize),
            [MEMORY_PROPERTIES.MODULE_TYPE]: moduleType,
        }
        handlePartEvaluation(memory)
    }

    return(
        <div className='component-form'>
            <p className='component-form-input-label'>Speed: {getSpeedLabelText(speed)}</p>
            <Slider min={2000000000} max={4800000000} valueLabelDisplay='auto' valueLabelFormat={getSpeedLabelText} value={speed} onChange={(e, newValue) => setSpeed(newValue)}></Slider>
            <p className='component-form-input-label'>Total Size: {getTotalSizeLabelText(totalSize)}</p>
            <Slider min={1} max={6} step={1} valueLabelDisplay='auto' valueLabelFormat={getTotalSizeLabelText} value={totalSize} onChange={(e, newValue) => setTotalSize(newValue)}></Slider>
            <OptionsDropdown options={MODULE_TYPES} optionsType={'Module Type'} currentOptions={moduleType} setCurrentOption={setModuleType}/>
            <button className='component-form-submit-button' onClick={memoryEvaluate}>Evaluate</button>
        </div>
    )
}

export default MemoryPartForm