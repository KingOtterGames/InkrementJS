import { app, BrowserWindow, ipcMain } from 'electron'
import * as configs from './configs'
import * as path from 'path'
import * as steamworks from 'steamworks.js'
import * as ipc from './ipc'
import * as fs from 'fs'
import * as os from 'os'

/**
 * Setup Folder Structure for Saving
 */
const homedir = os.homedir() + '/Saved Games'
const gamedir = homedir + '/' + configs.COMPANY_NAME + '/' + configs.GAME_NAME
const dirs = [homedir, homedir + '/' + configs.COMPANY_NAME, gamedir, gamedir + '/backups']

try {
    dirs.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            console.log(dir + ' does not exist, creating it.')
            fs.mkdirSync(dir)
        }
    })
} catch (err) {
    console.error(err)
}

/**
 * Pre-load Options for Chromium
 */
app.commandLine.appendSwitch('in-process-gpu')
app.commandLine.appendSwitch('disable-direct-composition')
app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.commandLine.appendSwitch('disable-background-timer-throttling')
app.commandLine.appendSwitch('disable-accelerated-2d-canvas')
app.commandLine.appendSwitch('disable-accelerated-mjpeg-decode')
app.commandLine.appendSwitch('disable-accelerated-video-decode')
app.commandLine.appendSwitch('disable-accelerated-video-encode')

/**
 * Options to enable WORSE CASE for memory issues, BUT Steam Overlay will not show
 */
//app.commandLine.appendSwitch('disable-gpu-compositing')
//app.commandLine.appendSwitch('disable-gpu')
//app.disableHardwareAcceleration()
//app.commandLine.appendSwitch('disable-audio-output')

/**
 * Connect to Steamworks
 */
let steamClient: any
const initSteamworks = () => {
    try {
        steamClient = steamworks.init(configs.APPID)
        if (!steamClient) return null
        console.log('Connected to Steam with the SteamID of: ', steamClient.localplayer.getSteamId().steamId64)
    } catch (err) {
        throw err
    }
}

/**
 * Create the Electron Window
 */
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: configs.MIN_WINDOW_WIDTH,
        minHeight: configs.MIN_WINDOW_HEIGHT,
        width: configs.MIN_WINDOW_WIDTH,
        height: configs.MIN_WINDOW_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            backgroundThrottling: false,
        },
        autoHideMenuBar: true,
        center: true,
    })

    if (app.isPackaged) {
        win.loadURL(`file://${__dirname}/../index.html`)
        win.removeMenu()
    } else {
        win.loadURL('http://localhost:3000/index.html')

        win.webContents.openDevTools({ mode: 'detach' })

        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron' + (process.platform === 'win32' ? '.cmd' : '')),
            forceHardReset: true,
            hardResetMethod: 'exit',
        })
    }

    win.on('closed', () => {
        app.quit()
        return
    })
}

/**
 * Electron Startup
 */
app.whenReady().then(() => {
    initSteamworks()

    createWindow()

    ipc.init(ipcMain, steamClient, gamedir, app)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
})

/**
 * Catching Errors
 */
process.on('uncaughtException', function (err) {
    console.log(err)
})

process.on('unhandledRejection', function (err) {
    console.log(err)
})

/**
 * Enable Single Instance of Game
 */
let isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
    app.quit()
}
