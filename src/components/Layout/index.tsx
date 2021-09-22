import { Box, styled } from '@mui/system';
import { Header, Sidebar } from 'components/Common';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '150vh',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '240px 1fr',
  gridTemplateAreas: "'header header' 'sidebar main' 'footer footer'",
}));

const SidebarBox = styled(Box)(({ theme }) => ({
  gridArea: 'sidebar',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  gridArea: 'header',
  borderBottom: '1px solid #e5eaf0',
}));

const FooterBox = styled(Box)(({ theme }) => ({
  gridArea: 'footer',
  borderTop: '1px solid #e5eaf0',
}));

const Main = styled(Box)(({ theme }) => ({
  gridArea: 'main',
  backgroundColor: '#F9F8FD',
}));

function Layout() {
  return (
    <Container>
      <HeaderBox>
        <Header />
      </HeaderBox>

      <SidebarBox>
        <Sidebar />
      </SidebarBox>

      <Main>MAIN</Main>

      <FooterBox>FOOTER</FooterBox>
    </Container>
  );
}

export default Layout;
