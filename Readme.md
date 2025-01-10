##Architecture 
![image](https://github.com/user-attachments/assets/fadcefd6-cb19-4dd6-a4df-e4c6d409264b)



## How to Start the Client

1. **Navigate to the client directory**:

   ```bash
   cd client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The client will be available at `http://localhost:5173`.

---

## How to Start Only the Backend

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the backend server**:

   ```bash
   docker-compose up 
   npm run dev
   ```

   The backend server will be available at `http://localhost:3000`.

---


# Pub-Sub React Client

This project is a React application for a pub-sub game with real-time updates using `socket.io`. It allows users to create and join game sessions, and view real-time updates of participants in the game.

## Features

- **Home Page**: Options to join or create a game session.
- **Create Page**: Generates a unique game ID and navigates to the game session as a player.
- **Game Page**: Displays game information, including the game ID and socket ID, and allows interaction (e.g., incrementing a counter) based on the user's mode (player or observer).

## Technologies

- **React**: Front-end library for building the user interface.
- **React Router**: For routing and navigation within the app.
- **Socket.IO**: For real-time communication between the client and server.


## Development Notes

- **Socket Connection**: Ensure that the server (backend) is running on `http://localhost:3000` or update the URL in the `Game` component if the backend server URL changes.
- **Environment Variables**: If needed, create a `.env` file for environment-specific configurations.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact
For questions or support, please contact [devitaliya22@gmail.com](mailto:devitaliya22@gmail.com).

---

Here’s a `README.md` file specifically for the server part of your project:

---

# Pub-Sub Game Server

This server application handles real-time communication for a pub-sub game application. It uses Node.js, Express, Redis, and Socket.IO to provide a robust backend for managing game sessions, user subscriptions, and real-time updates.

## Features

- **Pub-Sub Management**: Manages user subscriptions and message publishing using Redis.
- **WebSocket Integration**: Provides real-time updates through Socket.IO.
- **Job Queues**: Handles subscription and publication tasks using BullMQ.

## Technologies

- **Node.js**: Runtime environment for executing JavaScript code.
- **Express**: Web framework for Node.js.
- **Redis**: In-memory data structure store for pub-sub messaging.
- **Socket.IO**: Real-time communication library for WebSocket.
- **BullMQ**: Job and queue management library.

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Redis](https://redis.io/download) (running instance)

## API Endpoints

- **GET `/`**: A test endpoint to check if the server is running.

## WebSocket Events

- **`connection`**: Triggered when a client connects.
- **`subscribe`**: Subscribe a user to a game.
- **`unsubscribe`**: Unsubscribe a user from a game.
- **`publish`**: Publish an update to a game.
- **`message`**: Log any received messages.

## Jobs and Queues

- **`subscribeQueue`**: Processes user subscriptions to games.
- **`unsubscribeQueue`**: Processes user unsubscriptions from games.
- **`publishQueue`**: Processes publishing updates to games.

## Docker Setup (Optional)

To containerize the server application, ensure Docker and Docker Compose are installed. Dockerfiles for the server are provided in the project directory.

## Development Notes

- **Socket Connection**: Ensure the WebSocket server is correctly configured and running.
- **Redis**: Make sure Redis is operational and accessible at the specified URL.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact [devitaliya22@gmail.com](mailto:devitaliya22@gmail.com).
