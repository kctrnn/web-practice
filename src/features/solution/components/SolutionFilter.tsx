import { Button, Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import { SolutionFilter as SolutionFilterModel } from 'api/solutionApi';
import { PathSlug } from 'models';

const BUTTON_LIST = [
  { name: 'Responsive', pathName: 'responsive-web-developer' },
  { name: 'Frontend', pathName: 'front-end-developer' },
  { name: 'Fullstack', pathName: 'full-stack-developer' },
];

const ButtonStyled = styled(Button)(() => ({
  textTransform: 'capitalize',
}));

export interface SolutionFilterProps {
  filter: SolutionFilterModel;
  onFilterChange?: (newFilter: SolutionFilterModel) => void;
}

function SolutionFilter({ filter, onFilterChange }: SolutionFilterProps) {
  const handleClick = (pathSlug: PathSlug) => {
    if (!onFilterChange) return;

    onFilterChange({
      pathSlug,
    });
  };

  return (
    <Box mb={2}>
      <Stack direction="row" justifyContent="center" spacing={2}>
        {BUTTON_LIST.map((button) => (
          <ButtonStyled
            key={button.name}
            variant="contained"
            disableElevation
            size="small"
            color={filter.pathSlug === button.pathName ? 'primary' : 'inherit'}
            onClick={() => handleClick(button.pathName as PathSlug)}
          >
            {button.name}
          </ButtonStyled>
        ))}
      </Stack>
    </Box>
  );
}

export default SolutionFilter;
