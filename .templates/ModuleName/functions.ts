// @ts-nocheck
import { State } from '@schemas/state'

/**
 * Sets the Tab for the Player
 */
export type TabPayload = {
    tab: string
}

export const tab = (state: State, payload: TabPayload): State => {
    state.tab = payload.tab
    return state
}
