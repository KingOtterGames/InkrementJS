import * as Modules from '@modules'
import { Action, Module, State } from './types'

const ModuleKeys = Object.keys(Modules)

export const reducer = (state: State, action: Action<any>): State => {
    return JSON.parse(JSON.stringify(action.action({ ...state }, action.payload)))
}

export const update = (dispatch: any, deltaTime: number) => {
    ModuleKeys.forEach((Module) => {
        dispatch({ action: ((Modules as any)[Module] as Module).onUpdate, payload: { deltaTime } })
    })
}

export const fixedUpdate = (dispatch: any, deltaTime: number) => {
    ModuleKeys.forEach((Module) => {
        dispatch({ action: ((Modules as any)[Module] as Module).onFixedUpdate, payload: { deltaTime } })
    })
}

const Dispatcher = {
    reducer,
    update,
    fixedUpdate,
}

export default Dispatcher
