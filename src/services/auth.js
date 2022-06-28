import { v4 as uuid } from 'uuid'
import api from './api'

const baseURL = 'auth/'


const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(params){
  return await api.post(baseURL + 'login', params)
}

export async function getMeRequest(){
  return await api.get(baseURL + 'getMe')
}

export async function registerRequest(params){
  return await api.post(baseURL + 'register', params)
}
