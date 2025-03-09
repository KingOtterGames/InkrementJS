import { useState, useEffect } from 'react'
import * as Core from 'src/engine'
import { State } from '@schemas/state'
import * as INFO from 'src/configs/info'
import Game from '@views/game'

function App() {
    const [data, setData] = useState<State>()

    useEffect(() => {
        // Set Page Title
        document.title = INFO.PROJECT_NAME || document.title

        // Load Save Data
        Core.Saves.load().then((res: State) => {
            setData(res)
        })
    }, [])
    return <div>{data && <Game data={data} />}</div>
}

export default App
