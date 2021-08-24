export interface LoginArgs {
    code: string | null
}

export interface LoginReturnType {
    ok: boolean | null
    error?: string | null 
    accessToken?: string | null
    refreshToken?: string | null
    expiresIn?: number | null
    tokenType?: string | null
}

export interface OauthResult {
    access_token?: string
    refresh_token?: string 
    expires_in?: number 
    scope?: string 
    token_type?: string 
    error?: string 
    error_description?: string 
}

export interface UserResult {
    id?: string 
    username?: string 
    avatar?: string 
    discriminator?: string 
    banner_color?: string 
    email?: string 
}