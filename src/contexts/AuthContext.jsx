import { createContext, useState, useEffect } from 'react'
import { getMeRequest, signInRequest } from '../services/auth';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import api from '../services/api';


export const AuthContext = createContext({})

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextexample.token': token } = parseCookies()

    if (token) {
      getMeRequest().then(response => {
        setUser(response.data?.user)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [])

  async function signIn(params) {
    const response = await signInRequest({
      username: params.username,
      password: params.password
    })

    const { token, user } = response.data

    if(token){
      setCookie(null, 'nextexample.token', token, {
        maxAge: 60 * 60 * 2, // 2 hours
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      user && setUser(user)

      Router.push('/dashboard')
    }
  }

  function logout(){
    destroyCookie(null, 'nextexample.token', {
      path: '/'
    })
    api.defaults.headers['Authorization'] = ``
    setUser(null)
    Router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}
