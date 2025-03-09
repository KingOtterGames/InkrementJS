import { State } from '@schemas/state'
import { DEFAULT_SAVE } from 'src/configs/state'

import cloneDeep from 'lodash.clonedeep'

import * as V0 from './versions/v0'
import * as V1 from './versions/v1'

export const load = (): Promise<State> => {
    return new Promise<State>((res, rej) => {
        window.api.load().then((json: object) => {
            if (json) res(patch(version(json as State), DEFAULT_SAVE as object) as State)
            res(cloneDeep(DEFAULT_SAVE))
        })
    })
}

export const save = (state: State): void => {
    window.api.save(state)
}

export const remove = () => {
    window.api.remove()
}

export const patch = (json: object, defaultJSON: object): object => {
    function isObject(item: any) {
        return item && typeof item === 'object' && !Array.isArray(item)
    }

    for (let key in json) {
        if (!defaultJSON.hasOwnProperty(key)) {
            delete json[key as keyof object]
        } else if (isObject(json[key as keyof object]) && isObject(defaultJSON[key as keyof object])) {
            patch(json[key as keyof object], defaultJSON[key as keyof object])
        }
    }

    for (let key in defaultJSON) {
        if (!json.hasOwnProperty(key)) {
            json[key as keyof object] = defaultJSON[key as keyof object]
        } else if (isObject(json[key as keyof object]) && isObject(defaultJSON[key as keyof object])) {
            patch(json[key as keyof object], defaultJSON[key as keyof object])
        }
    }
    return json
}

export const version = (json: State): State => {
    let state = json

    // Version 0 to 1
    if (state.version === 0) {
        state = cloneDeep(V1.convertPreviousVersion(state as V0.State))
    }

    return state
}
