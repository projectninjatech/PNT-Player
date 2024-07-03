# PNT Player

PNT Player is a React Native application that allows users to stream movies and TV shows from their own server. The server is built with NodeJS and can be deployed easily. This guide will walk you through setting up the server and running the React Native project on your local machine.

## Features

- Stream movies and TV shows from your own server
- User-friendly interface
- Volume control, brightness adjustment, audio and subtitle selection
- Add Movie or Shows to User Mylist
- Continue Watching where you left off
- Built with React Native and NodeJS

## Prerequisites

- Node.js installed on your machine
- React Native development environment set up (Node, Watchman, the React Native command line interface, Xcode, and Android Studio)
- Git installed on your machine

## Server Setup

To set up the server, go to [PNT Player API](https://github.com/projectninjatech/PNT-Player-API) and follow the mentioned steps.

## Client Setup (React Native App)

To set up and run the React Native app, follow these steps:

1. Clone this repository:

    ```plaintext
    git clone https://github.com/projectninjatech/PNT-Player.git
    ```

2. Navigate to the project directory:

    ```plaintext
    cd PNT-Player
    ```

3. Install the dependencies:

    ```plaintext
    npm install
    ```

4. Start the Metro bundler:

    ```plaintext
    npx react-native start
    ```

5. Run the app on an Android device or emulator:

    ```plaintext
    npx react-native run-android
    ```

    Or, run the app on an iOS device or simulator:

    ```plaintext
    npx react-native run-ios
    ```

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Node.js](https://nodejs.org/)