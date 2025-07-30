import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { MEMORY_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

const MemoryPartForm = ({ handlePartEvaluation }) => {
    const MODULE_TYPES = [ 
        'DDR', 
        'DDR2', 
        'DDR3', 
        'DDR4',
        'DDR5',
    ]

    const [speed, setSpeed] = useState(2400000000)
    const [totalSize, setTotalSize] = useState(4)
    const [moduleType, setModuleType] = useState('DDR4')

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
            <div className='component-form-input-label'><ToolTipText main_text={`Speed: ${getSpeedLabelText(speed)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.MEMORY][MEMORY_PROPERTIES.SPEED]}/></div>
            <Slider min={2000000000} max={4800000000} valueLabelDisplay='auto' valueLabelFormat={getSpeedLabelText} value={speed} onChange={(e, newValue) => setSpeed(newValue)}></Slider>
            <div className='component-form-input-label'><ToolTipText main_text={`Total Size: ${getTotalSizeLabelText(totalSize)}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.MEMORY][MEMORY_PROPERTIES.TOTAL_SIZE]}/></div>
            <Slider min={1} max={6} step={1} valueLabelDisplay='auto' valueLabelFormat={getTotalSizeLabelText} value={totalSize} onChange={(e, newValue) => setTotalSize(newValue)}></Slider>
            <OptionsDropdown options={MODULE_TYPES} optionsType={'Module Type'} currentOption={moduleType} setCurrentOption={setModuleType} component_type={ComponentTypes.MEMORY} spec_type={MEMORY_PROPERTIES.MODULE_TYPE}/>
            <button className='component-form-submit-button' onClick={memoryEvaluate}>Evaluate</button>
        </div>
    )
}

export default MemoryPartForm