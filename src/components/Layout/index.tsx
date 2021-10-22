import { Box, styled } from '@mui/system';
import { Footer, Header, Sidebar } from 'components/Common';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',

  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '240px calc(100% - 240px)',
  gridTemplateAreas: "'header header' 'sidebar main' 'footer footer'",
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
  // backgroundColor: '#F9F8FD',
  padding: theme.spacing(2, 8),
  position: 'relative',
}));

const FooterBox = styled(Box)(({ theme }) => ({
  gridArea: 'footer',
  borderTop: '1px solid #EAEEF3',
}));

export interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
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

export default Layout;
