import { gql } from 'apollo-server'

export default gql`
    type loginResult {
        ok: Boolean!
        error: String
        accessToken: String
        refreshToken: String
    }
    type Mutation {
        login(code: String!): loginResult!
    }
`