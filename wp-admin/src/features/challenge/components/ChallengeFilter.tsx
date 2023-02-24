import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ListParams, PathSlug } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface ChallengeFilterProps {
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
  filter: ListParams;
}

function ChallengeFilter({
  filter,
  onChange,
  onSearchChange,
}: ChallengeFilterProps) {
  const searchRef = useRef<HTMLInputElement>();
  const pathSlugList: PathSlug[] = [
    'responsive-web-developer',
    'front-end-developer',
    'full-stack-developer',
  ];

  const handleSearchByNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFilter = {
      ...filter,
      name_like: event.target.value,
      _page: 1,
    };

    onSearchChange?.(newFilter);
  };

  const handleFilterByPathSlugChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newFilter = {
      ...filter,
      pathSlug: event.target.value || undefined,
      _page: 1,
    };

    onChange?.(newFilter);
  };

  const handleSortByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [_sort, _order] = value.split('.');

    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
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

        <Grid item xs={12} md={6} lg={3}>
          <TextField
            id="filterByPathSlug"
            select
            label="Filter by path slug"
            value={filter.pathSlug || ''}
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleFilterByPathSlugChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>

            {pathSlugList.map((pathSlug, idx) => (
              <MenuItem key={idx} value={pathSlug}>
                {pathSlug}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <TextField
            id="sortBy"
            select
            label="Sort by"
            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleSortByChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>

            <MenuItem value="level.asc">level asc</MenuItem>
            <MenuItem value="level.desc">level desc</MenuItem>
          </TextField>
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
      </Grid>
    </Box>
  );
}

export default ChallengeFilter;
