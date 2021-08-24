import { AddBotArgs, AddBotReturnType } from 'typings/addBot'
import { Context } from 'typings/graphql'
import client from '../../client'
import checkToken from '../../Users/utils/checkToken'
import fetch from 'node-fetch'

export default {
  Mutation: {
    addBot: checkToken(async(_: void, { id, description, prefix }: AddBotArgs, { user }: Context): Promise<AddBotReturnType> => {            
      if((!id) || (!description) || (!prefix)) throw new Error('Please fill in the required fields.')
      try {
        const botResult = await fetch(`https://discord.com/api/v8/users/${id}`, {
          headers: {
            Authorization: `Bot ${process.env.TOKEN}`
          }
        })
        console.log(await botResult.json())

        await client.bot.create({ data: { id, description, name: 'demo', prefix, authorId: user?.id || '', servers: 0 } })
        return {
          ok: true
        }
        
      } catch(err) {
        return {
          ok: false,
          error: String(err)
        }
      }
    }
    )
  }

}