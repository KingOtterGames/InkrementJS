# InkrementJS

InkrementJS is an incremental/simulation-based game framework built with Electron and React, using TypeScript. This framework provides a robust structure for creating and managing incremental games with features like state management, dynamic module loading, and Steam integration.

## Features

- **Electron Integration**: Leverage the power of Electron to create desktop applications with web technologies.
- **React and TypeScript**: Utilize the modern React library with TypeScript for type-safe development.
- **Dynamic Module Loading**: Automatically load and manage game modules dynamically.
- **State Management**: Efficiently manage game state with `useReducer` and custom dispatcher.
- **Steam Integration**: Connect to Steamworks for achievements and other Steam features.
- **Offline Progress**: Support for offline progress and catch-up mechanics.
- **Auto-Save**: Automatically save game state at regular intervals.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/InkrementJS.git
    cd InkrementJS
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the Application

To start the application in development mode, run:
```sh
npm start
```
This will concurrently start the React frontend and the Electron application.

### Building the Application

To build the application for production, run:
```sh
npm run package
```
This will create a packaged version of the application in the package directory.

## Project Structure
* src: Contains the source code for the application.
    - content: Game content such as data, images, sounds, and configurations.
    - engine: Core game engine logic including state management, dispatcher, and save/load functionality.
    - modules: Game modules that define specific game mechanics and updates.
    - views: React components for the user interface.
    - utils: Utility functions and helpers.
* electron: Electron main process scripts and configurations.
* build: Compiled output for the Electron application.
* public: Static assets and the main HTML file.

## Configuration

### Environment Variables
The application uses environment variables defined in the .env file:

```
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
```

### Electron Configuration

Electron-specific configurations are defined in `electron/configs.ts`:
```js
export const COMPANY_NAME: string = 'COMPANY NAME'
export const GAME_NAME: string = 'GAME NAME'
export const APPID: number = 480
export const MIN_WINDOW_WIDTH: number = 1250
export const MIN_WINDOW_HEIGHT: number = 700
export const BACKUP_INTERVAL: number = 30
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.