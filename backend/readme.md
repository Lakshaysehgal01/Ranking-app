# Ranking App Backend

## Overview

This is the backend for the Ranking App, built with Node.js, Express, and TypeScript. It provides RESTful APIs for user management, claiming points, and tracking user history, using MongoDB for data storage.

## Features

- **User Management:** Add new users, fetch all users, and ensure unique emails.
- **Claim Points:** Users can claim points, which updates their score and history.
- **History Tracking:** Every claim is recorded in the history for auditing and leaderboard purposes.
- **Leaderboard:** Users are sorted by their total points.

## Main Files & Structure

- `src/index.ts`: Entry point. Sets up Express server, CORS, loads environment variables, connects to MongoDB, and mounts API routes.
- `src/controllers/user.controller.ts`: Contains logic for user operations (add, get all, claim, get history).
- `src/models/user.model.ts`: Mongoose schema/model for users (name, email, points).
- `src/models/history.model.ts`: Mongoose schema/model for history (userId, points, username, timestamps).
- `src/lib/db.ts`: MongoDB connection logic using Mongoose.
- `src/lib/zod.ts`: Zod schema for validating user input.
- `src/routes/user.route.ts`: Express routes for user-related endpoints (`/getalluser`, `/adduser`, `/claim`, `/history`).
- `src/types/env/env.d.ts`: TypeScript types for environment variables.

## API Endpoints

Base URL: `/api/v1`

- `GET /getalluser`: Get all users sorted by points.
- `POST /adduser`: Add a new user (requires `name` and `email`).
- `POST /claim`: Claim points for a user.
- `GET /history`: Get history of all claims.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB & Mongoose
- Zod (validation)

## License

MIT
