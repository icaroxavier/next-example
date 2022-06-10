import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import nookies from 'nookies'


export default function DashboardPage(){

  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>{ isAuthenticated ? 'You are authenticated!' : 'You are NOT authenticated :c'}</>
  )
}

export const getServerSideProps = async (ctx) => {
  const { ['nextexample.token']: token} = nookies.get(ctx)

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
