import { v4 as uuid } from 'uuid'
import api from './api'

const baseURL = 'auth/'


const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(params){
  await delay()
  return {
    data: {
      token: uuid(),
      user: {
        firstName: "Ícaro",
        lastName: "Gabriel",
        gender: "MALE"
      }
    }
  }
  // return await api.post(baseURL + 'login', params)
}

export async function getMeRequest(){
  await delay()
  return {
    data: {
      firstName: "Ícaro",
      lastName: "Gabriel",
      gender: "MALE"
    }
  }
  // return await api.get(baseURL + 'getMe')
}

export async function registerRequest(params){
  await delay()
  return {
    data: {
      token: uuid(),
      user: {
        firstName: "Ícaro",
        lastName: "Gabriel",
        gender: "MALE"
      }
    }
  }
  // return await api.post(baseURL + 'register', params)
}
