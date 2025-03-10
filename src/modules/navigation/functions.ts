import { State } from '@engine/types'

/**
 * Tab
 */
export type TabPayload = {
    tab: string
}

export const tab = (state: State, payload: TabPayload): State => {
    state.tab = payload.tab
    return state
}

/**
 * Subtab
 */
export type SubtabPayload = {
    subtab: string
}

export const subtab = (state: State, payload: { subtab: string }): State => {
    state.subtab = payload.subtab
    return state
}
