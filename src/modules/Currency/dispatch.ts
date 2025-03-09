import { Action } from '@schemas/engine'
import * as Currency from './functions'

export const add = (dispatch: React.Dispatch<Action>, currency: string, amount: number) => {
    const payload: Currency.AddPayload = {
        currency: currency,
        amount: amount,
    }

    dispatch({
        func: Currency.add,
        payload,
    })
}

export const remove = (dispatch: React.Dispatch<Action>, currency: string, amount: number) => {
    const payload: Currency.RemovePayload = {
        currency: currency,
        amount: amount,
    }

    dispatch({
        func: Currency.remove,
        payload,
    })
}
