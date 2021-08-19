import { AddBotArgs, AddBotReturnType } from 'typings/addBot'
import { Context } from 'typings/graphql'
import client from '../../client'
import checkToken from '../../Users/utils/checkToken'

export default {
  Mutation: {
    addBot: checkToken(async(_: any, { name, description }: AddBotArgs, { user }: Context): Promise<AddBotReturnType> => {
            
      if(!name) {
        return {
          ok: false,
          error: 'Please fill in the required fields.'
        }
      }
      try {
        await client.bot.create({ data:{ name, description, author: user?.id || '' } })
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