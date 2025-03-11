import { State } from '@engine/types'

/**
 * Give
 */
export type GivePayload = {
    id: string
}

export const give = (state: State, payload: GivePayload): State => {
    const achievements = state.achievements
    const achievement = achievements.find((id) => id === payload.id)
    if (!achievement) {
        window.api.achievement(payload.id)
        achievements.push(payload.id)
    }
    return state
}
