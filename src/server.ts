import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './schema'
import getUser from './Users/utils/getUser'
import { Context } from 'typings/graphql'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }): Promise<Context | null> => {
    if(!req.headers.authorization) {
      return null
    }
    const token = req.headers.authorization
    const user = await getUser(token)
    if(!user) {
      return null
    }
    return { user }
  }
})

const PORT = process.env.PORT

server.listen({
  port: PORT
}, () => {
  console.log(`Server is running on http://localhost:${PORT} ✅`)
})