import { List, ListItem, ListItemButton } from '@mui/material';
import { Project } from 'models';
import ProjectItem from './ProjectItem';

export interface CompletedProjectListProps {
  projectList: Project[];
  onItemClick: (id: string | undefined) => void;
}

function CompletedProjectList({
  projectList,
  onItemClick,
}: CompletedProjectListProps) {
  return (
    <List>
      {projectList.map((project) => (
        <ListItem
          disableGutters
          key={project._id}
          onClick={() => onItemClick(project.solutionId)}
        >
          <ListItemButton sx={{ borderRadius: '.25rem' }}>
            <ProjectItem
              imgUrl={project.thumbnailImage}
              title={project.name}
              votes={project.voteLength}
              feedbacks={project.feedbackLength}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CompletedProjectList;
