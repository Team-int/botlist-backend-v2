import { gql } from 'apollo-server'

export default gql`
    type AddBotResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        addBot(id: String! description: String!, prefix: String! ): AddBotResult!
    }
`