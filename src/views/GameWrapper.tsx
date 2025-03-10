import { useEffect, useReducer, useState } from 'react'
import GlobalConfig from '@configs/global'
import Dispatcher from '@engine/dispatcher'
import Saves, { DEFAULT_SAVE } from '@engine/saves'
import Layout from './Layout'

function GameWrapper() {
    const [state, dispatch] = useReducer(Dispatcher.reducer, DEFAULT_SAVE)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        document.title = `${GlobalConfig.PROJECT_INFO.TITLE}`

        const loadingState = async () => {
            const initialState = await Saves.load()
            dispatch({ action: () => initialState, payload: {} })
            setLoaded(true)
        }
        loadingState()
    }, [])

    /**
     * Gameplay Loop
     */
    useEffect(() => {
        // Skip if not Loaded yet
        if (!loaded) return

        // Required Variables and Tracking
        const fixedUpdateInSeconds = 1
        const fixedUpdateRate = 1 / fixedUpdateInSeconds
        let frameId = 0
        let prevFrameTime = 0
        let accumulatedLagTime = 0

        // Capping FPS
        const targetFPS = 60
        const frameDuration = 1000 / targetFPS

        // Offline Progress & Catchup
        if (GlobalConfig.OFFLINE_PROGRESS.ENABLED) {
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

                // Skip frame if it hasn't reached the target frame duration
                if (deltaMS < frameDuration) return

                // Calculate Delta Time
                const deltaTime = Math.min(fixedUpdateRate, deltaMS / 1000)
                accumulatedLagTime += deltaTime
                lastSave += deltaTime

                // Handle onFixedUpdate Logic
                while (accumulatedLagTime >= fixedUpdateRate) {
                    accumulatedLagTime -= fixedUpdateRate
                    Dispatcher.fixedUpdate(dispatch, deltaTime)
                }

                // Handle onUpdate Logic
                Dispatcher.update(dispatch, deltaTime)

                // Check if save is needed
                if (lastSave >= GlobalConfig.SAVING.AUTO_SAVE_TIMER_MINUTES * 60) {
                    Saves.save(state)
                    lastSave = 0
                }

                // Set Frame Time
                prevFrameTime = currentFrameTime - (deltaMS % frameDuration)
            } catch (err) {
                stop()
                throw err
            }
        }

        tick(currentFrameTime)

        return stop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded])

    /**
     * Save on Reload & Safe Exit
     */
    useEffect(() => {
        // Skip if not Loaded yet
        if (!loaded) return

        const handler = () => {
            Saves.save(state)
        }

        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, loaded])

    if (!loaded) return <div>Loading...</div>

    return (
        <div>
            <Layout state={state} dispatch={dispatch} />
        </div>
    )
}

export default GameWrapper
