import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import _ from 'lodash';
import SearchIcon from '../../../assets/glyphs/glyph_search_24.svg';
import * as styles from './search.styles';

interface Props {
  onChange: Function;
  debounce?: number;
}

const Search: React.FC<Props> = (props) => {
  const changeHandler = _.debounce((event) => {
    props.onChange(event.target.value);
  }, props.debounce || 0);

  return (
    <styles.Container>
      <TextField
        id="search-textfield"
        placeholder="Search"
        fullWidth
        onChange={changeHandler}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <img src={SearchIcon} alt="Search icon" />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </styles.Container>
  )
}

export default Search;
