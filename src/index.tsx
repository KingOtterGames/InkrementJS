import ReactDOM from 'react-dom/client'
import App from './app'
import Steam from '@engine/steam'
import { createTheme, MantineProvider } from '@mantine/core'

/**
 * Styles
 */
import '@mantine/core/styles.css'
import '@styles/global.css'
import '@styles/navbar.css'

const theme = createTheme({
    /** Put your mantine theme override here */
})

declare global {
    interface Window {
        api: {
            save: Function
            load: Function
            remove: Function
            achievement: Function
            link: Function
            quit: Function
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <App />
            <Steam />
        </MantineProvider>
    </>
)
