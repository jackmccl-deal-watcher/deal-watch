import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './OptionsDropdown.css'

const OptionsDropdown = ({ options, optionsType, currentOption, setCurrentOption }) => {
    return(
        <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            value={currentOption}
            onChange={ (event, newValue) => setCurrentOption(newValue)}
            renderInput={(params) => <TextField {...params} label={optionsType} />}
        />
    )
}

export default OptionsDropdown