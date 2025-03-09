import { useEffect, useReducer } from 'react'
import * as Core from '@engine'
import * as ENGINE from '@configs/engine'
import * as INFO from '@configs/info'
import { State } from '@schemas/state'
import { Navbar } from './navbar'

type DataProps = {
    data: State
}

function Game({ data }: DataProps) {
    const [state, dispatch] = useReducer(Core.Dispatcher.reducer, data)

    useEffect(() => {
        document.title = INFO.PROJECT_NAME + ' - ' + state.tab
    }, [state.tab])

    /**
     * Gameplay Loop
     */
    useEffect(() => {
        // Required Variables and Tracking
        const fixedUpdateInSeconds = 1
        const fixedUpdateRate = 1 / fixedUpdateInSeconds
        let frameId = 0
        let prevFrameTime = 0
        let accumulatedLagTime = 0

        // Offline Progress & Catchup
        if (ENGINE.OFFLINE_PROGRESS) {
            // Implement Offline Progress
        }

        // Stopping Gameplay Loop Handler
        const stop = () => {
            cancelAnimationFrame(frameId)
        }

        // Ticks
        let currentFrameTime = 0
        let lastSave = 0
        const tick = (currentFrameTime: number) => {
            try {
                frameId = requestAnimationFrame(tick)

                // Calculate Lag & Delta Time
                const deltaMS = currentFrameTime - prevFrameTime
                const deltaTime = Math.min(fixedUpdateRate, deltaMS / 1000)
                accumulatedLagTime += deltaTime
                lastSave += deltaTime

                // Handle onFixedUpdate Logic
                while (accumulatedLagTime >= fixedUpdateRate) {
                    accumulatedLagTime -= fixedUpdateRate
                    Core.Dispatcher.fixedUpdate(dispatch, deltaTime)
                }

                // Handle onUpdate Logic
                Core.Dispatcher.update(dispatch, deltaTime)

                // Check if save is needed
                if (lastSave >= ENGINE.AUTO_SAVE_TIMER_MINUTES * 60) {
                    Core.Saves.save(state)
                    lastSave = 0
                }

                // Set Frame Time
                prevFrameTime = currentFrameTime
            } catch (err) {
                stop()
                throw err
            }
        }

        tick(currentFrameTime)

        return stop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Save on Reload & Safe Exit
     */
    useEffect(() => {
        const handler = () => {
            Core.Saves.save(state)
        }

        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div>
            <Navbar state={state} dispatch={dispatch} />
        </div>
    )
}

export default Game
