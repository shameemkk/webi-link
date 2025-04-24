# WebiLink

WebiLink is a comprehensive web conferencing platform that allows users to create, join, and manage video meetings. The application features user authentication, event management, and payment processing capabilities.

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application built with Vite
- **Backend**: Express.js API with MongoDB database

## Frontend

### Tech Stack

- **React 19** with Vite for fast development and optimized builds
- **React Router DOM** for client-side routing
- **TailwindCSS** for styling
- **React Query** for data fetching and state management
- **Axios** for API requests
- **React Toastify** for notifications
- **Zego UI Kit** for video conferencing capabilities

### Setup and Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env example` file and add your environment variables.

4. Start the development server:
   ```
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Backend

### Tech Stack

- **Node.js** with **Express** framework
- **MongoDB** with **Mongoose** ODM for database operations
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Stripe** for payment processing
- **Express Validator** for request validation
- **Helmet**, **CORS**, and **Rate Limiting** for security

### Setup and Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Available Scripts

- `npm run start` - Start the server in production mode
- `npm run dev` - Start the server with nodemon for development

## Features

- **User Authentication**: Register, login, and profile management
- **Event Management**: Create, update, and delete events
- **Video Conferencing**: Real-time video meetings with multiple participants
- **Payment Processing**: Secure payment handling with Stripe integration

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user information

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get a specific event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Payments
- `POST /api/payment` - Process a payment
- `POST /api/payment/webhook` - Handle Stripe webhook events

## Security

The application implements several security measures:

- Password hashing with bcryptjs
- JWT-based authentication
- Rate limiting to prevent brute force attacks
- Helmet for setting secure HTTP headers
- CORS configuration to restrict access to the API

## Development

For local development, you'll need to run both the frontend and backend servers:

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a separate terminal, start the frontend server:
   ```
   cd frontend
   npm run dev
   ```

## Deployment

### Frontend

Build the frontend for production:
```
cd frontend
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Backend

For the backend, set the environment variables in your production environment and run:
```
cd backend
npm run start
```