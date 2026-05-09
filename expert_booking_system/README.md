# Real-Time Expert Session Booking System

A full-stack web application that allows users to find experts, view their available time slots, and book sessions in real-time. Built with React, Node.js, Express, MongoDB, and Socket.io.

## Features

- **Expert Listing**: Browse experts with pagination, search by name, and filter by category.
- **Expert Detail**: View expert information and available time slots grouped by date.
- **Real-Time Booking**: Book a slot and see it disappear instantly for other users (powered by Socket.io).
- **Double-Booking Prevention**: Database-level compound unique indexing ensures no two users can book the same slot at the same time.
- **My Bookings**: View a history of your booked sessions using your email address.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router DOM, Axios, Socket.io Client, Lucide React, React Hot Toast
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, Express Validator, Cors, Dotenv

## Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd expert-booking-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expert_booking
CLIENT_URL=http://localhost:5173
```

Run the seed script to populate dummy experts:

```bash
node seed/seedData.js
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

## API Endpoints

- `GET /api/experts` - Get all experts (supports `?page`, `?limit`, `?search`, `?category`)
- `GET /api/experts/:id` - Get a single expert by ID
- `POST /api/bookings` - Create a new booking
- `PATCH /api/bookings/:id/status` - Update booking status
- `GET /api/bookings?email=` - Get bookings for a specific email

## License

This project is licensed under the MIT License.
