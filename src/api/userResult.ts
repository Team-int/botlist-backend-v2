import { UserResult } from 'typings/login'

const userResult = async(tokenType: string, accessToken: string): Promise<UserResult> => {
  try {
    const userResult = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${accessToken}`
      }
    })
    const { 
      id, 
      username, 
      avatar, 
      discriminator, 
      banner_color, 
      email
    }: UserResult = await userResult.json()

    return {
      id,
      username,
      avatar,
      discriminator,
      banner_color,
      email
    }
  } catch(err) {
    throw new Error(err)
  }
}

export default userResult