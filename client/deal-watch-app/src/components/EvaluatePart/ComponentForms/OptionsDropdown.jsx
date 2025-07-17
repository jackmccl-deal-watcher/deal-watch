import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './OptionsDropdown.css'
import ToolTipText from '../../ToolTip/ToolTipText';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';

const OptionsDropdown = ({ options, optionsType, currentOption, setCurrentOption, component_type, spec_type }) => {
    return(
        <div className='options-dropdown'>
            <ToolTipText main_text={optionsType} tool_tip={TOOL_TIPCS_DICT[component_type][spec_type]}/>
            <Autocomplete
                disablePortal
                options={options}
                sx={{ width: 300 }}
                value={currentOption}
                onChange={ (event, newValue) => setCurrentOption(newValue)}
                renderInput={(params) => <TextField {...params} label={optionsType} />}
            />
        </div>
    )
}

export default OptionsDropdown