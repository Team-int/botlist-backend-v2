import { OauthResult } from 'typings/login'

export default async(code: string): Promise<OauthResult> => {
  try{
    const CLIENT_SECRET: string = process.env.DISCORD_CLIENT_SECRET || '' 
    const CLIENT_ID: string = process.env.DISCORD_CLIENT_ID || ''
    const REDIRECT_URL: string = process.env.REDIRECT_URL || ''

    const options = {
      url: 'https://discord.com/api/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URL,
        scope: 'identify'
      })
    }
    const oauthResult = await fetch('https://discord.com/api/oauth2/token', options)
    const { access_token, refresh_token, expires_in, scope, token_type }: OauthResult = await oauthResult.json() 
    return {
      access_token,
      refresh_token,
      expires_in,
      scope,
      token_type
    }
  } catch(err) {
    throw new Error(err)
  }
}