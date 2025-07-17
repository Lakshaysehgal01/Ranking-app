# Ranking App

## Overview

The Ranking App is a full-stack web application designed to manage and display user rankings, history, and leaderboards. It consists of a TypeScript/Node.js backend and a React/TypeScript frontend, providing a seamless experience for users to view, add, and claim rankings.

## Features

- **User Management:** Add new users and select users for ranking actions.
- **Leaderboard:** View a dynamic leaderboard based on user scores or claims.
- **History Tracking:** Track and display user history for ranking changes and claims.
- **Claim System:** Users can claim points or ranks, updating their position on the leaderboard.

## Project Structure

### Backend (`backend/`)

- Built with Node.js and TypeScript
- RESTful API endpoints for user, history, and leaderboard management
- Uses Zod for schema validation
- Organized into controllers, models, routes, and utility libraries

### Frontend (`frontend/`)

- Built with React and TypeScript
- Modern UI using Tailwind CSS
- Components for user selection, leaderboard, history, and claim actions
- Utility functions and mock data for development and testing

## Getting Started

1. **Install dependencies:**
   - Run `npm install` in both `backend/` and `frontend/` directories.
2. **Start the backend server:**
   - Run `npm run dev` or `npm start` in the `backend/` directory.
3. **Start the frontend app:**
   - Run `npm run dev` in the `frontend/` directory.
4. **Access the app:**
   - Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).

## Technologies Used

- Node.js, Express, TypeScript (Backend)
- React, TypeScript, Vite, Tailwind CSS (Frontend)
- Zod for validation

## Contributing

Feel free to fork the repository, open issues, or submit pull requests to improve the app.

## License

This project is licensed under the MIT License.
