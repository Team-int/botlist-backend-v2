import { LoginArgs, LoginReturnType, UserResult } from 'typings/login'
import oauthResult from '../../api/oauthResult'
import client from '../../client'
import userResult from '../../api/userResult'

export default {
  Mutation: {
    login: async(_: void, { code }: LoginArgs): Promise<LoginReturnType> => {
      try {
        if(!code) throw new Error('Please fill in the required fields.')
        
        const { access_token, refresh_token, expires_in, scope, token_type } = await oauthResult(code)
        if(scope !== 'identify')  throw new Error('Invaild scope.')
        if((!access_token) || (!token_type)) throw new Error('Invaild access token or token type.')
        const { 
          id, 
          username, 
          avatar, 
          discriminator, 
          banner_color, 
          email
        }: UserResult = await userResult(token_type, access_token)
        const existingUser = await client.user.findUnique({
          select: {
            id: true
          }, where: {
            id
          }
        })

        if(!existingUser) {
          if(id && username && discriminator && banner_color && email) {
            await client.user.create({
              data: {
                id,
                tag: `${username}#${discriminator}`,
                avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
                bannerColor: banner_color,
                email,
              }
            })
          }
        } else {
          await client.user.update({
            where: {
              id
            }, data: {
              id,
              tag: `${username}#${discriminator}`,
              avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
              bannerColor: banner_color,
              email,
            }
          })
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