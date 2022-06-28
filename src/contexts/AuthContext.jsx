import { createContext, useState, useEffect } from 'react'
import { getMeRequest, registerRequest, signInRequest } from '../services/auth';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import api from '../services/api';
import { useAppDispatch } from '../redux/hooks';
import { sendErrorMessage, sendMessage, startLoadingGlobal, stopLoadingGlobal } from '../redux/utils/actions';


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const dispatch = useAppDispatch()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'next-example.token': token } = parseCookies()


    if (token) {
      getMeRequest().then(response => {
        setUser(response.data)
      }).catch(error => {
        if(error.response?.status !== 500){
          dispatch(sendErrorMessage(error.response?.data?.message))
        } else {
          dispatch(sendErrorMessage("Erro ao recuperar as suas informações no nosso sistema, tente novamente mais tarde."))
        }
        logout()
      })
    }
  }, [])

  async function register(params) {
    try {
      dispatch(startLoadingGlobal())
      const response = await registerRequest(params)

      dispatch(sendMessage({ type: "success", title: "Parabéns", message: `Seja bem-vind${params.gender === "FEMALE" ? "a" : "o"} ${params.firstName} ${params.lastName}!`}))

      const { token, user } = response.data

      if(token){
        setCookie(null, 'next-example.token', token, {
          maxAge: 60 * 60 * 2, // 2 hours
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`
      }

      user && setUser(user)


      token && Router.push('/dashboard')
    } catch (error) {
      if(error.response?.status !== 500){
        dispatch(sendErrorMessage(error.response?.data?.message))
      } else {
        dispatch(sendErrorMessage("Erro ao cadastrar, caso persista, entre em contato com o suporte."))
      }
    } finally {
      dispatch(stopLoadingGlobal())
    }
  }

  async function signIn(params) {
    try {
      dispatch(startLoadingGlobal())

      const response = await signInRequest({
        username: params.username,
        password: params.password
      })

      const { token, user } = response.data

      if(token){
        setCookie(null, 'next-example.token', token, {
          maxAge: 60 * 60 * 2, // 2 hours
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`
      }

      user && setUser(user)

      token && Router.push('/dashboard')
    } catch (error) {
      if(error.response?.status === 401){
        dispatch(sendErrorMessage("Credenciais inválidas."))
      } else if(error.response?.status !== 500) {
        dispatch(sendErrorMessage(error.response?.data?.message))
      } else {
        dispatch(sendErrorMessage("Erro interno no servidor, entre em contato com o suporte."))
      }
    } finally {
      dispatch(stopLoadingGlobal())
    }

  }

  function logout(){
    destroyCookie(null, 'next-example.token', {
      path: '/'
    })
    api.defaults.headers['Authorization'] = ``
    setUser(null)
    Router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout, register}}>
      {children}
    </AuthContext.Provider>
  )
}
