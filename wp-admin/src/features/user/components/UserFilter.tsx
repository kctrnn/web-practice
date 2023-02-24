import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface UserFilterProps {
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
  filter: ListParams;
}

function UserFilter({ filter, onChange, onSearchChange }: UserFilterProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchByNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFilter = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    };

    onSearchChange?.(newFilter);
  };

  const handleClearClick = () => {
    if (onChange) {
      onChange({
        _page: 1,
        _limit: 15,
      });
    }

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="searchByName"
            label="Search by name"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearchByNameChange}
            inputRef={searchRef}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Grid>

        <Grid item xs={12} md={6} lg={3}></Grid>
        <Grid item xs={12} md={6} lg={2}></Grid>
      </Grid>
    </Box>
  );
}

export default UserFilter;
