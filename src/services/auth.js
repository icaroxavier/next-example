import { v4 as uuid } from 'uuid'


const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(params){
  await delay()

  return {
    token: uuid(),
    user: {
      name: "Ícaro Xavier",
      email: "icarogabriel999@gmail.com",
      avatar_url: "https://github.com/XaloDev.png"
    }
  }
}

export async function getMeRequest(params){
  await delay()

  return {
    user: {
      name: "Ícaro Xavier",
      email: "icarogabriel999@gmail.com",
      avatar_url: "https://github.com/XaloDev.png"
    }
  }
}
