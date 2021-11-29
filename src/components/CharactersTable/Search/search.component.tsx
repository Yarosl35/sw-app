import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import _ from 'lodash';
import SearchIcon from '../../../assets/glyphs/glyph_search_24.svg';
import * as styles from './search.styles';

interface ISearchProps {
  onChange: Function;
  debounce?: number;
}

const Search: React.FC<ISearchProps> = (props) => {
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
