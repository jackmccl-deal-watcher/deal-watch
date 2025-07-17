import { useState } from 'react'
import ComponentTypes from "../../enums/ComponentTypesEnum"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CPUPartForm from "./ComponentForms/CPUPartForm";
import VideoCardPartForm from './ComponentForms/VideoCardPartForm';
import MotherboardPartForm from './ComponentForms/MotherboardPartForm';
import MemoryPartForm from './ComponentForms/MemoryPartForm';
import HardDrivePartForm from './ComponentForms/HardDrivePartForm';
import PowerSupplyPartForm from './ComponentForms/PowerSupplyPartForm';
import CasePartForm from './ComponentForms/CasePartForm';
import './ComponentPartForm.css'


const ComponentPartForm = ({ handlePartEvaluation }) => {
    const [componentType, setComponentType] = useState('cpu')
    const selectComponentForm = () => {
        switch (componentType) {
            case ComponentTypes.CPU:
                return <CPUPartForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.VIDEOCARD:
                return <VideoCardPartForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.MOTHERBOARD:
                return <MotherboardPartForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.MEMORY:
                return <MemoryPartForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.HARD_DRIVE:
                return <HardDrivePartForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.POWER_SUPPLY:
                return <PowerSupplyPartForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.CASE:
                return <CasePartForm handlePartEvaluation={handlePartEvaluation}/>
        }
    }

    return (
        <div id='component-part-form' className='component-part-form'>
            <FormControl id='component-part-form-type-selector' variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Component Type:</InputLabel>
                <Select
                    value={componentType}
                    onChange={(e) => setComponentType(e.target.value)}
                >
                    <MenuItem id='component-form-cpu' value={ComponentTypes.CPU}>{ComponentTypes.CPU}</MenuItem>
                    <MenuItem id='component-form-video-card' value={ComponentTypes.VIDEOCARD}>{ComponentTypes.VIDEOCARD}</MenuItem>
                    <MenuItem id='component-form-motherboard' value={ComponentTypes.MOTHERBOARD}>{ComponentTypes.MOTHERBOARD}</MenuItem>
                    <MenuItem id='component-form-memory' value={ComponentTypes.MEMORY}>{ComponentTypes.MEMORY}</MenuItem>
                    <MenuItem id='component-form-hard-drive' value={ComponentTypes.HARD_DRIVE}>{ComponentTypes.HARD_DRIVE}</MenuItem>
                    <MenuItem id='component-form-power-supply' value={ComponentTypes.POWER_SUPPLY}>{ComponentTypes.POWER_SUPPLY}</MenuItem>
                    <MenuItem id='component-form-case' value={ComponentTypes.CASE}>{ComponentTypes.CASE}</MenuItem>
                </Select>
            </FormControl>
            <div className='evaluate-part-component-form'>
                {selectComponentForm()}
            </div>
        </div>
    )
}

export default ComponentPartForm