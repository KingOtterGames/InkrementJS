import { Action } from '@schemas/engine'
import * as Achievements from './functions'

export const give = (dispatch: React.Dispatch<Action>, id: string) => {
    const payload: Achievements.GivePayload = {
        id,
    }

    dispatch({
        func: Achievements.give,
        payload,
    })
}
