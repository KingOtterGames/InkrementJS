import { Action } from '@engine/types'
import * as Functions from './functions'

export const give = (dispatch: React.Dispatch<Action<Functions.GivePayload>>, id: string) => {
    dispatch({
        action: Functions.give,
        payload: {
            id,
        },
    })
}

const Achievements = {
    give,
}

export default Achievements
