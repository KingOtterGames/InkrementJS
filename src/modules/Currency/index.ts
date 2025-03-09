import { FixedUpdate, Update } from '@schemas/engine'
import { State } from '@schemas/state'

export * as Actions from './functions'
export * as Helpers from './helpers'
export * as Dispatch from './dispatch'

export const onUpdate = (state: State, { deltaTime }: Update) => {
    return state
}

export const onFixedUpdate = (state: State, { deltaTime }: FixedUpdate) => {
    return state
}
