import { BasicProps } from '@engine/types'

function Game({ state, dispatch }: BasicProps) {
    return <>{JSON.stringify(state)}</>
}

export default Game
