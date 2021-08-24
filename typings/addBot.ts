export interface AddBotArgs {
    id: string | null
    description: string | null
    prefix: string | null
}

export interface AddBotReturnType {
    ok: boolean,
    error?: string | null
}