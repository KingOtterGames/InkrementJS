import { State } from '@engine/types'

/**
 * Add
 */
export type AddPayload = {
    currency: string
    amount: number
}

export const add = (state: State, payload: AddPayload): State => {
    state.currencies[payload.currency] += payload.amount
    return state
}

/**
 * Remove
 */
export type RemovePayload = {
    currency: string
    amount: number
}

export const remove = (state: State, payload: RemovePayload): State => {
    state.currencies[payload.currency] -= payload.amount
    return state
}
