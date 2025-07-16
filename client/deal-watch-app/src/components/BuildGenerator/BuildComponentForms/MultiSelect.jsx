import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import './MultiSelect.css'
import { VARIABLE_TYPES } from '../../../enums/VariableTypeEnums';

const MultiSelect = ({ options, optionsType, currentOptions, setCurrentOptions }) => {
    return(
        <div className='multi-select-div'>
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