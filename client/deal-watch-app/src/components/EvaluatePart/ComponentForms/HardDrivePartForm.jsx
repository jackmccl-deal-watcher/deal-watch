import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { HARD_DRIVE_PROPERTIES } from '../../../enums/ComponentPropertiesEnums';
import OptionsDropdown from './OptionsDropdown';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ComponentTypes from '../../../enums/ComponentTypesEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

export const getCapacityLabelText = (value) => {
    const units = [
        'B', 
        'KB', 
        'MB', 
        'GB', 
        'TB'
    ]

    let unitIndex = 0
    let scaledValue = value
    while (scaledValue >= 1024 && unitIndex < units.length-1) {
        unitIndex += 1
        scaledValue = scaledValue / (2 ** 10)
    }

    return `${Math.round(scaledValue * 100) / 100} ${units[unitIndex]}`
}

const HardDrivePartForm = ({ handlePartEvaluation }) => {
    const STORAGE_TYPES = [ 
        'SSD', 
        'HDD', 
        'Hybrid'
    ]
    const FORM_FACTORS = [
        '1.8"',
        '2.5"',
        '3.5"',
        'M.2-22110',
        'M.2-2242',
        'M.2-2260',
        'M.2-2280',
        'PCI-E',
        'mSATA'
    ]
    const hardDriveInterfaces = [
        'M.2 (B+M)',
        'M.2 (M)',
        'Micro SATA 3 Gb/s',
        'Micro SATA 6 Gb/s',
        'PATA 100',
        'PATA 133',
        'PCIe x1',
        'PCIe x16',
        'PCIe x2',
        'PCIe x4',
        'PCIe x8',
        'SAS 12 Gb/s',
        'SAS 3 Gb/s',
        'SAS 6 Gb/s',
        'SATA 1.5 Gb/s',
        'SATA 3 Gb/s',
        'SATA 6 Gb/s',
        'U.2',
        'mSATA'
    ]
    const [capacity, setCapacity] = useState(40)
    const [storageType, setStorageType] = useState('SSD')
    const [formFactor, setFormFactor] = useState('2.5"')
    const [hardDriveInterface, setHardDriveInterface] = useState('SATA 6 Gb/s')

    function calcCapacity(value) {
        return 2 ** value;
    }

    const hardDriveEvaluate = () => {
        const hardDrive = {
            type: HARD_DRIVE_PROPERTIES.TYPE,
            [HARD_DRIVE_PROPERTIES.CAPACITY]: calcCapacity(capacity),
            [HARD_DRIVE_PROPERTIES.STORAGE_TYPE]: storageType,
            [HARD_DRIVE_PROPERTIES.FORM_FACTOR]: formFactor,
            [HARD_DRIVE_PROPERTIES.INTERFACE]: hardDriveInterface,
        }
        handlePartEvaluation(hardDrive)
    }

    return(
        <div className='component-form'>
            <div className='component-form-input-label'><ToolTipText main_text={`Capacity: ${getCapacityLabelText(calcCapacity(capacity))}`} tool_tip={TOOL_TIPCS_DICT[ComponentTypes.HARD_DRIVE][HARD_DRIVE_PROPERTIES.CAPACITY]}/></div>
            <Slider min={30} max={44} scale={calcCapacity} valueLabelDisplay='auto' valueLabelFormat={getCapacityLabelText} value={capacity} onChange={(e, newValue) => setCapacity(newValue)}></Slider>
            <OptionsDropdown options={STORAGE_TYPES} optionsType={'Storage Type'} currentOption={storageType} setCurrentOption={setStorageType} component_type={ComponentTypes.HARD_DRIVE} spec_type={HARD_DRIVE_PROPERTIES.STORAGE_TYPE}/>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOption={formFactor} setCurrentOption={setFormFactor} component_type={ComponentTypes.HARD_DRIVE} spec_type={HARD_DRIVE_PROPERTIES.FORM_FACTOR}/>
            <OptionsDropdown options={hardDriveInterfaces} optionsType={'Interface'} currentOption={hardDriveInterface} setCurrentOption={setHardDriveInterface} component_type={ComponentTypes.HARD_DRIVE} spec_type={HARD_DRIVE_PROPERTIES.INTERFACE}/>
            <button className='component-form-submit-button' onClick={hardDriveEvaluate}>Evaluate</button>
        </div>
    )
}

export default HardDrivePartForm