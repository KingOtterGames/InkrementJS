export type Update = {
    deltaTime: number
}

export type FixedUpdate = {
    deltaTime: number
}

export type Action = {
    func: Function
    payload: object
}

export type Module = {
    onUpdate: Function
    onFixedUpdate: Function
}
