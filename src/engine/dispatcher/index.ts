import * as Modules from '@modules'

import { Action, Module } from '@schemas/engine'
import { State } from '@schemas/state'

const ModuleKeys = Object.keys(Modules)

export const reducer = (state: State, action: Action): State => {
    return JSON.parse(JSON.stringify(action.func(state, action.payload)))
}

export const update = (dispatch: any, deltaTime: number) => {
    ModuleKeys.forEach((Module) => {
        dispatch({ func: ((Modules as any)[Module] as Module).onUpdate, payload: { deltaTime } })
    })
}

export const fixedUpdate = (dispatch: any, deltaTime: number) => {
    ModuleKeys.forEach((Module) => {
        dispatch({ func: ((Modules as any)[Module] as Module).onFixedUpdate, payload: { deltaTime } })
    })
}
