import fetch from 'node-fetch'
import { UserResult } from 'typings/getUser'

export default async(accessToken: string): Promise<UserResult | null> => {
  try {
    const userResult = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: accessToken
      }
    })
    const { id }: UserResult = await userResult.json()
    return { id }
  } catch(err) {
    return null
  }
}
  
