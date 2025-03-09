import { State } from '@schemas/state'

/**
 * Awards an achievement to a player if they haven't earned it yet
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
