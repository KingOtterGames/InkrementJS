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

/**
 * Sets the Sub Tab for the Player
 */
export type SubtabPayload = {
    subtab: string
}

export const subtab = (state: State, payload: SubtabPayload): State => {
    state.subtab = payload.subtab
    return state
}
