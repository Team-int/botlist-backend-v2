import { gql } from 'apollo-server'

export default gql`
    type loginResult {
        ok: Boolean!
        error: String
        accessToken: String
        refreshToken: String
        expiresIn: String
        tokenType: String
    }
    type Mutation {
        login(code: String!): loginResult!
    }
`