import {Button} from 'antd'
import Head from 'next/head';
import {useRouter} from "next/router";

export default function Home() {

  const router = useRouter()

  function goToLoginScreen(){
    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>Next Example</title>
      </Head>
      <div style={{display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center"}}>
        <Button onClick={goToLoginScreen}>Ir para a tela de Login</Button>
      </div>
    </>
  )
}
