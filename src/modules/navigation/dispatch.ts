import { Action } from '@engine/types'
import * as Functions from './functions'

/**
 * Allows the user to navigate to a tab
 * @param dispatch {React.Dispatch<Action>} The dispatcher
 * @param id {string} The id of the tab
 */
const tab = (dispatch: React.Dispatch<Action<Functions.TabPayload>>, id: string) => {
    dispatch({
        action: Functions.tab,
        payload: { tab: id },
    })
}

/**
 * Allows the user to navigate to a subtab, within a tab
 * @param dispatch {React.Dispatch<Action>} The dispatcher
 * @param id {string} The id of the subtab
 */
const subtab = (dispatch: React.Dispatch<Action<Functions.SubtabPayload>>, id: string) => {
    dispatch({
        action: Functions.subtab,
        payload: { subtab: id },
    })
}

const Navigation = {
    tab,
    subtab,
}

export default Navigation
