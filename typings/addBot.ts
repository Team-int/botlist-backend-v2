export interface AddBotArgs {
    name: string | null
    description?: string | null
}

export interface AddBotReturnType {
    ok: boolean,
    error?: string | null
}