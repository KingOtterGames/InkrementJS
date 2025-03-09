import { State } from '@schemas/state'

/**
 * Checks if they have the achievement
 */
export const has = (state: State, id: string) => {
    const achievement = state.achievements.find((a) => a === id)
    return achievement ? true : false
}
