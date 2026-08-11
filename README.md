# Calne

Calne is a full-featured car marketplace frontend where customers can discover vehicles, explore dealers, manage a shopping cart, place orders, and connect with other car enthusiasts.

![Calne hero](public/assets/hero-img.png)

## Features

- Browse featured vehicles and dealers
- Search and filter the car catalog
- View dealer and vehicle details
- Sign up, sign in, and manage a member profile
- Add vehicles to a persistent shopping cart
- Create orders and track their status
- Publish and read community posts
- Follow other members and view followers
- Real-time communication through Socket.IO
- Responsive interface for desktop and mobile devices

## Tech Stack

- React 18 and TypeScript
- Redux Toolkit and React Redux
- React Router v5
- Material UI, Joy UI, Emotion, and styled-components
- Axios for API communication
- Socket.IO Client for real-time features
- Toast UI Editor for community content
- SweetAlert2 for notifications
- Create React App

## Prerequisites

Before starting, install:

- [Node.js](https://nodejs.org/) 16 or newer
- npm or Yarn
- A running Calne backend API

## Getting Started

1. Clone the repository and switch to the development branch:

   ```bash
   git clone -b develop https://github.com/dragonmm98/calne.git
   cd calne
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

   Replace the example URL with the address of your Calne backend. The frontend uses this value for both HTTP API calls and its Socket.IO connection.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app in development mode |
| `npm test` | Starts the test runner in watch mode |
| `npm run build` | Creates an optimized production build in `build/` |
| `npm run start:prod` | Serves the production build locally |

> `start:prod` requires the `serve` package to be available. Install it globally with `npm install --global serve`, or add it to the project dependencies.

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Home page and featured content |
| `/dealer` | Dealer listings and dealer details |
| `/allcars` | Complete vehicle catalog |
| `/community` | Community articles and discussions |
| `/orders` | Member order management |
| `/member-page` | Member profile and settings |
| `/help` | Help page |
| `/login` | Login page |

## Project Structure

```text
calne/
├── public/                  # Static images, icons, and metadata
├── src/
│   ├── app/
│   │   ├── apiService/     # Backend API clients
│   │   ├── components/     # Shared UI components
│   │   ├── context/        # Socket.IO context
│   │   ├── screens/        # Route-level pages and Redux slices
│   │   ├── App.tsx         # Routing and application shell
│   │   └── store.ts        # Redux store configuration
│   ├── css/                # Global and page-specific styles
│   ├── lib/                # Configuration and shared utilities
│   ├── types/              # TypeScript domain models
│   └── index.tsx           # Application entry point
├── deploy.sh               # Production deployment script
├── package.json
└── tsconfig.json
```

## Production Build

Create an optimized build with:

```bash
npm run build
```

The generated files are written to the `build/` directory and can be served by any static hosting provider. Because the app uses `BrowserRouter`, configure the host to redirect unknown routes to `index.html`.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a pull request against the `develop` branch.

## License

No license is currently included in this repository. Contact the repository owner before reusing or distributing the project.
