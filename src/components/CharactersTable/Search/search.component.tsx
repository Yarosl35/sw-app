import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '../../../assets/glyphs/glyph_search_24.svg';
import * as styles from './search.styles';

const Search = () => {
  return (
    <styles.Container>
      <TextField
        id="search-textfield"
        placeholder="Search"
        fullWidth      
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <img src={SearchIcon} />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </styles.Container>
  )
}

export default Search;