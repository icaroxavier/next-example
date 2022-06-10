import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function LoginPage(){

  const { signIn } = useContext(AuthContext)

  async function handleSignIn(params){
    await signIn(params)
  }

  return (
    <button onClick={handleSignIn}>Login</button>
  )

}
