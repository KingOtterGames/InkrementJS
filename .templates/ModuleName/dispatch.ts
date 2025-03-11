// @ts-nocheck
import { Action } from '@engine/types'
import * as Functions from './functions'

export const example = (dispatch: React.Dispatch<Action<Functions.ExamplePayload>>) => {
    const payload: Functions.ExamplePayload = {}

    dispatch({
        action: Functions.example,
        payload,
    })
}

const Example = {
    example,
}

export default Example
