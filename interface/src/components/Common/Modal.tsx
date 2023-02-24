import { Paper } from '@mui/material';
import ModalContainer from '@mui/material/Modal';
import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export function Modal({ children, onClose, open }: ModalProps) {
  return (
    <ModalContainer open={open} onClose={onClose}>
      <Paper
        variant="outlined"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',

          width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
          p: 6,
          bgcolor: '#fff',
        }}
      >
        {children}
      </Paper>
    </ModalContainer>
  );
}
