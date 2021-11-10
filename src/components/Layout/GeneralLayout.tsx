import { Box, styled } from '@mui/system';
import { Sidebar } from 'components/Common';
import { Footer } from './Footer';
import { Header } from './Header';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',

  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '15rem calc(100% - 15rem)',
  gridTemplateAreas: "'header header' 'sidebar main' 'footer footer'",

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '5.5rem calc(100% - 5.5rem)',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  gridArea: 'header',
  borderBottom: '1px solid #EAEEF3',
}));

const SidebarBox = styled(Box)(({ theme }) => ({
  gridArea: 'sidebar',
  borderRight: '1px solid #EAEEF3',
}));

const Main = styled(Box)(({ theme }) => ({
  gridArea: 'main',
  padding: theme.spacing(2, 8),
  position: 'relative',

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2, 6),
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2, 4),
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2),
  },
}));

const FooterBox = styled(Box)(({ theme }) => ({
  gridArea: 'footer',
  borderTop: '1px solid #EAEEF3',
}));

export interface GeneralLayoutProps {
  children: JSX.Element;
}

export function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <Container>
      <HeaderBox>
        <Header />
      </HeaderBox>

      <SidebarBox>
        <Sidebar />
      </SidebarBox>

      <Main>{children}</Main>

      <FooterBox>
        <Footer />
      </FooterBox>
    </Container>
  );
}
