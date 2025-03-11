import { Action } from '@engine/types'
import * as Functions from './functions'

const add = (dispatch: React.Dispatch<Action<Functions.AddPayload>>, currency: string, amount: number) => {
    dispatch({
        action: Functions.add,
        payload: {
            currency: currency,
            amount: amount,
        },
    })
}

const remove = (dispatch: React.Dispatch<Action<Functions.RemovePayload>>, currency: string, amount: number) => {
    dispatch({
        action: Functions.remove,
        payload: {
            currency: currency,
            amount: amount,
        },
    })
}

const Currency = {
    add,
    remove,
}

export default Currency
