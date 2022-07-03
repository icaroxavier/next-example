import { AppEnvelopeWrapper } from './styles';
import { Layout, Button } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/router';
const { Header, Footer, Sider, Content } = Layout;
import { HomeOutlined, UserOutlined } from '@ant-design/icons';


export function AppEnvelope(props) {

  const { logout, user } = useContext(AuthContext)
  const router = useRouter()

  return (
    <AppEnvelopeWrapper>
      <Layout className='main-layout'>
        <Sider>
          <div className="topRow">
            <Link href={'/dashboard'}>
              <span>next-example</span>
            </Link>
          </div>
          <div className='menu-column'>
            <Link href={'/dashboard'}>
              <div className="menu-button">
                <HomeOutlined style={{fontSize: 24}}/>
                <span> Início</span>
              </div>
            </Link>
            <Link href={'/dashboard/perfil'}>
              <div className="menu-button">
                <UserOutlined style={{fontSize: 24}}/>
                <span> Perfil</span>
              </div>
            </Link>
          </div>
          <Button className='logout-button' onClick={logout}>Sair</Button>
        </Sider>
        <Layout>
          <Header>{user && `Bem-vind${user?.gender === 'FEMALE' ? 'a' : 'o'} ${user?.firstName} ${user?.lastName}`}</Header>
          <Content>{props.children}</Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </AppEnvelopeWrapper>
  );
}


