import fetch from 'node-fetch'
import { GetUserReturnType, UserResult } from 'typings/getUser'

export default async(accessToken: string): Promise<GetUserReturnType | null> => {
  try {
    const userResult = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: accessToken
      }
    })
    const { id }: UserResult = await userResult.json()
    if(!id) return null
    return { id }
  } catch(err) {
    return null
  }
}
  
