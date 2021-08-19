import { loadFilesSync, mergeResolvers, mergeTypeDefs } from 'graphql-tools'

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`)

const typeDefs = mergeTypeDefs(loadedTypes)
const resolvers = mergeResolvers(loadedResolvers)

export { typeDefs, resolvers }