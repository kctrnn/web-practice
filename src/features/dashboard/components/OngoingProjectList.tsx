import { List, ListItem, ListItemButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Project } from 'models';
import ProjectItem from './ProjectItem';

dayjs.extend(relativeTime);

export interface OngoingProjectListProps {
  projectList: Project[];
  onItemClick: (id: string | undefined) => void;
}

function OngoingProjectList({
  projectList,
  onItemClick,
}: OngoingProjectListProps) {
  return (
    <>
      {projectList.length === 0 && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          You got no challenges yet. Start adding some? 🎉
        </Typography>
      )}

      {projectList.length > 0 && (
        <List>
          {projectList.map((project) => (
            <ListItem
              disableGutters
              key={project._id}
              onClick={() => onItemClick(project._id)}
            >
              <ListItemButton sx={{ borderRadius: '.25rem' }}>
                <ProjectItem
                  imgUrl={project.thumbnailImage}
                  title={project.name}
                  time={dayjs(project.createdAt).fromNow()}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default OngoingProjectList;
