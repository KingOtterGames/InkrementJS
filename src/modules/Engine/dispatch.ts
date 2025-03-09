import { Action } from '@schemas/engine'
import * as Engine from './functions'

export const tab = (dispatch: React.Dispatch<Action>, id: string) => {
    const payload: Engine.TabPayload = {
        tab: id,
    }

    dispatch({
        func: Engine.tab,
        payload,
    })
}

export const subtab = (dispatch: React.Dispatch<Action>, id: string) => {
    const payload: Engine.SubtabPayload = {
        subtab: id,
    }

    dispatch({
        func: Engine.subtab,
        payload,
    })
}
