import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import './MultiSelect.css'
import { VARIABLE_TYPES } from '../../../enums/VariableTypeEnums';
import { TOOL_TIPCS_DICT } from '../../../enums/ComponentToolTipsEnum';
import ToolTipText from '../../ToolTip/ToolTipText';

const MultiSelect = ({ options, optionsType, currentOptions, setCurrentOptions, component_type, spec_type }) => {
    return(
        <div className='multi-select-div'>
            <ToolTipText main_text={optionsType} tool_tip={TOOL_TIPCS_DICT[component_type][spec_type]}/>
            <div className='selected-options'>
                {
                    currentOptions?.map( (option) => {
                        return <Chip key={option} label={option} onDelete={() => setCurrentOptions(currentOptions.filter((curr_option) => curr_option !== option))}/>
                    })
                }
            </div>
            <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => {
                    if (typeof option === VARIABLE_TYPES.STRING) {
                        return option
                    } else {
                        return ''
                    }
                }}
                sx={{ width: 300 }}
                freeSolo
                value={currentOptions}
                onChange={ (event, newValue) => {
                    if (newValue && !currentOptions.includes(newValue)) {
                        setCurrentOptions([...currentOptions, newValue])}
                    }
                }
                renderInput={(params) => <TextField {...params} label={optionsType} />}
                getOptionDisabled={(option) => currentOptions.includes(option)}
                filterSelectedOptions
            />
        </div>
    )
}

export default MultiSelect