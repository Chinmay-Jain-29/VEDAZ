require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const socket = require("./socket/socket");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Connect Database
connectDB();

const app = express();
const server = http.createServer(app);

// Init Socket.io
const io = socket.init(server);

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expert Session Booking System API',
      version: '1.0.0',
      description: 'API documentation for the Real-Time Expert Session Booking System',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Files containing annotations for the OpenAPI Specification
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/experts', require('./routes/expertRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Error Handler Middleware
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

// Socket connection event
io.on("connection", (client) => {
  console.log("Client connected:", client.id);
  client.on("disconnect", () => {
    console.log("Client disconnected:", client.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
