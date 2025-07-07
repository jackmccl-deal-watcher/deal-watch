import { useState } from 'react'
import ComponentTypes from "../../component_enums/ComponentTypesEnum"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CPUForm from "./ComponentForms/CPUForm";
import VideoCardForm from './ComponentForms/VideoCardForm';
import MotherboardForm from './ComponentForms/MotherboardForm';

const ComponentForm = ({ handlePartEvaluation }) => {
    const [componentType, setComponentType] = useState('cpu')
    const selectComponentForm = () => {
        switch (componentType) {
            case ComponentTypes.CPU:
                return <CPUForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.VIDEOCARD:
                return <VideoCardForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.MOTHERBOARD:
                return <MotherboardForm handlePartEvaluation={handlePartEvaluation}/>
            case ComponentTypes.MEMORY:
                return 
            case ComponentTypes.HARD_DRIVE:
                return 
            case ComponentTypes.POWER_SUPPLY:
                return 
            case ComponentTypes.CASE:
                return
        }
    }

    return (
        <div className='componentform'>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Component Type:</InputLabel>
                <Select
                    value={componentType}
                    onChange={(e) => setComponentType(e.target.value)}
                >
                    <MenuItem value={ComponentTypes.CPU}>{ComponentTypes.CPU}</MenuItem>
                    <MenuItem value={ComponentTypes.VIDEOCARD}>{ComponentTypes.VIDEOCARD}</MenuItem>
                    <MenuItem value={ComponentTypes.MOTHERBOARD}>{ComponentTypes.MOTHERBOARD}</MenuItem>
                    <MenuItem value={ComponentTypes.MEMORY}>{ComponentTypes.MEMORY}</MenuItem>
                    <MenuItem value={ComponentTypes.HARD_DRIVE}>{ComponentTypes.HARD_DRIVE}</MenuItem>
                    <MenuItem value={ComponentTypes.POWER_SUPPLY}>{ComponentTypes.POWER_SUPPLY}</MenuItem>
                    <MenuItem value={ComponentTypes.CASE}>{ComponentTypes.CASE}</MenuItem>
                </Select>
            </FormControl>
            {selectComponentForm()}
        </div>
    )
}

export default ComponentForm