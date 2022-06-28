import { AppEnvelopeWrapper} from './styles';
import { Layout, Button } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link'
import {BiUser, BiHome} from "react-icons/bi";
import { useRouter } from 'next/router';
const { Header, Footer, Sider, Content } = Layout;


export function AppEnvelope(props) {

  const { logout, user } = useContext(AuthContext)
  const router = useRouter()

  return (
    <AppEnvelopeWrapper>
      <Layout className='main-layout'>
        <Sider>
          <div className='sider-logo-row'>

            <Image width={50} height={50} src={'/assets/images/logo.png'} alt="Logo" onClick={() => router.push('/dashboard')}></Image>

          </div>
          <div className='menu-column'>
            <Link href={'/dashboard'}>
              <div className="menu-button">
                <BiHome size={24}/>
                <span> Início</span>
              </div>
            </Link>
            <Link href={'/dashboard/perfil'}>
              <div className="menu-button">
                <BiUser  size={'24'}/>
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


