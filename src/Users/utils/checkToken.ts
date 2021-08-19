import { Context } from 'typings/graphql'

/* eslint-disable @typescript-eslint/ban-types */
const checkToken = (resolvers: Function) => (root: any, args: any, context: Context, info: any) => {
  if(!context.user) {
    return {
      ok: false,
      error: 'Please Login.'
    }
  } else {
    return resolvers(root, args, context, info)
  }
}

export default checkToken