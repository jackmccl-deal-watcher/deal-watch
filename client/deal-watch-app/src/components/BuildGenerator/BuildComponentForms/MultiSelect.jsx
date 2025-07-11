import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import './MultiSelect.css'

const MultiSelect = ({ options, optionsType, currentOptions, setCurrentOptions }) => {
    return(
        <div className='multi-select-div'>
            <div className='selected-options'>
                {
                    currentOptions.map( (option) => {
                        return <Chip key={option} label={option} onDelete={() => setCurrentOptions(currentOptions.filter((curr_option) => curr_option !== option))}/>
                    })
                }
            </div>
            <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option
                    } else {
                        return ''
                    }
                }}
                sx={{ width: 300 }}
                filterSelectedOptions
                value={currentOptions}
                onChange={ (event, newValue) => {
                    newValue && setCurrentOptions([...currentOptions, newValue])}
                }
                renderInput={(params) => <TextField {...params} label={optionsType} />}
            />
        </div>
    )
}

export default MultiSelect