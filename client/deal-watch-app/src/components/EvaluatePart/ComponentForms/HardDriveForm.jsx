import { useState } from 'react'
import Slider from '@mui/material/Slider';
import { HARD_DRIVE_PROPERTIES } from '../../../component_enums/ComponentPropertiesEnums';
import './ComponentForm.css'
import OptionsDropdown from './OptionsDropdown';

const HardDriveForm = ({ handlePartEvaluation }) => {
    const STORAGE_TYPES = [ 'HDD', 'Hybrid', 'SSD' ]
    const FORM_FACTORS = [
        '1.8"',     '2.5"',
        '3.5"',     'M.2-22110',
        'M.2-2242', 'M.2-2260',
        'M.2-2280', 'PCI-E',
        'mSATA'
    ]
    const hardDriveInterfaces = [
        'M.2 (B+M)',         'M.2 (M)',
        'Micro SATA 3 Gb/s', 'Micro SATA 6 Gb/s',
        'PATA 100',          'PATA 133',
        'PCIe x1',           'PCIe x16',
        'PCIe x2',           'PCIe x4',
        'PCIe x8',           'SAS 12 Gb/s',
        'SAS 3 Gb/s',        'SAS 6 Gb/s',
        'SATA 1.5 Gb/s',     'SATA 3 Gb/s',
        'SATA 6 Gb/s',       'U.2',
        'mSATA'
    ]
    const [capacity, setCapacity] = useState(40)
    const [storageType, setStorageType] = useState('')
    const [formFactor, setFormFactor] = useState('')
    const [hardDriveInterface, setHardDriveInterface] = useState('')

    function getCapacityLabelText(value) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];

        let unitIndex = 0;
        let scaledValue = value;
        while (scaledValue >= 1024 && unitIndex < units.length-1) {
            unitIndex += 1;
            scaledValue = scaledValue / (2 ** 10);
        }

        return `${scaledValue} ${units[unitIndex]}`;
    }

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
            <p className='component-form-input-label'>Capacity: {getCapacityLabelText(calcCapacity(capacity))}</p>
            <Slider min={30} max={44} scale={calcCapacity} valueLabelDisplay='auto' valueLabelFormat={getCapacityLabelText} value={capacity} onChange={(e, newValue) => setCapacity(newValue)}></Slider>
            <OptionsDropdown options={STORAGE_TYPES} optionsType={'Storage Type'} currentOptions={storageType} setCurrentOption={setStorageType}/>
            <OptionsDropdown options={FORM_FACTORS} optionsType={'Form Factor'} currentOptions={formFactor} setCurrentOption={setFormFactor}/>
            <OptionsDropdown options={hardDriveInterfaces} optionsType={'Interface'} currentOptions={hardDriveInterface} setCurrentOption={setHardDriveInterface}/>
            <button className='component-form-submit-button' onClick={hardDriveEvaluate}>Evaluate</button>
        </div>
    )
}

export default HardDriveForm