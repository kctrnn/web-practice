import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { City, ListParams } from "models";
import { useRef } from "react";
import { ChangeEvent } from "react";

export interface StudentFiltersProps {
  onChange?: (newFilter: Partial<ListParams>) => void;
  onSearchChange?: (newFilter: Partial<ListParams>) => void;

  filter: Partial<ListParams>;
  cityList: City[];
}

function StudentFilters({
  filter,
  onChange,
  onSearchChange,
  cityList,
}: StudentFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchByNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFilter = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    };

    if (onSearchChange) {
      onSearchChange(newFilter);
    }
  };

  const handleFilterByCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFilter = {
      ...filter,
      city: event.target.value || undefined,
      _page: 1,
    };

    if (onChange) {
      onChange(newFilter);
    }
  };

  const handleSortByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [_sort, _order] = value.split(".");

    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    };

    if (onChange) {
      onChange(newFilter);
    }
  };

  const handleClearClick = () => {
    if (onChange) {
      onChange({
        _page: 1,
        _limit: 15,
      });
    }

    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  return (
    <Box mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id='searchByName'
            label='Search by name'
            variant='outlined'
            fullWidth
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearchByNameChange}
            inputRef={searchRef}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <TextField
            id='filterByCity'
            select
            label='Filter by city'
            value={filter.city || ""}
            variant='outlined'
            fullWidth
            size='small'
            onChange={handleFilterByCityChange}
          >
            <MenuItem value=''>
              <em>All</em>
            </MenuItem>

            {cityList.map((city) => (
              <MenuItem key={city.code} value={city.code}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <TextField
            id='sortBy'
            select
            label='Sort by'
            value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
            variant='outlined'
            fullWidth
            size='small'
            onChange={handleSortByChange}
          >
            <MenuItem value=''>
              <em>All</em>
            </MenuItem>

            <MenuItem value='name.asc'>Name ASC</MenuItem>
            <MenuItem value='name.desc'>Name DESC</MenuItem>
            <MenuItem value='mark.asc'>Mark ASC</MenuItem>
            <MenuItem value='mark.desc'>Mark DESC</MenuItem>
            <MenuItem value='age.asc'>Age ASC</MenuItem>
            <MenuItem value='age.desc'>Age DESC</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button
            variant='outlined'
            color='secondary'
            fullWidth
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilters;
