import { gql } from 'apollo-server'

export default gql`
    type AddBotResult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        addBot(name: String! description: String): AddBotResult!
    }
`