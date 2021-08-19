import { LoginArgs, LoginReturnType, OauthResult, UserResult } from 'typings/login'
import fetch from 'node-fetch'
import client from '../../client'

export default {
  Mutation: {
    login: async(_: void, { code }: LoginArgs): Promise<LoginReturnType> => {
      try {
        const CLIENT_SECRET: string = process.env.DISCORD_CLIENT_SECRET || '' 
        const CLIENT_ID: string = process.env.DISCORD_CLIENT_ID || ''
        const REDIRECT_URL: string = process.env.REDIRECT_URL || ''
  
        console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
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
        if(scope !== 'identify') {
          return {
            ok: false,
            error: 'Invaild scope.'
          }
        }
        
        const userResult = await fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${token_type} ${access_token}`
          }
        })
        const { 
          id, 
          username, 
          avatar, 
          discriminator, 
          banner_color, 
          email, 
          verified 
        }: UserResult = await userResult.json()
        const existingUser = await client.user.findUnique({
          select: {
            id: true
          }, where: {
            id
          }
        })

        if(!existingUser) {
          if(id && username && discriminator && banner_color && email && verified) {
            await client.user.create({
              data: {
                id,
                tag: `${username}#${discriminator}`,
                avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
                bannerColor: banner_color,
                email,
                verified
              }
            })
          }
        }

        return {
          ok: true,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in,
          tokenType: token_type,
        }
      } catch(err) {
        return {
          ok: false,
          error: err
        }
      }
            
    }
  }
}