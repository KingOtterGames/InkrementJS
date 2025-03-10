import { Action, Module, State } from './types'

const modulesContext = require.context('../modules', true, /updates\.ts$/)
const Modules: { [key: string]: any } = {}
modulesContext.keys().forEach((key: string) => {
    const moduleName = key.replace('./', '').replace('/updates.ts', '')
    Modules[moduleName] = modulesContext(key)
})
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
