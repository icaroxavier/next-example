import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import nookies from 'nookies'
import DashboardScreenComponent from "../../components/DashboardScreen"
import Head from "next/head"


export default function DashboardPage(){
  return (
    <>
      <Head>
        <title>NE - Dashboard</title>
      </Head>
      <DashboardScreenComponent/>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { ['next-example.token']: token} = nookies.get(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
