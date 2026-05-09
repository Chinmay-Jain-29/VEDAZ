const express = require("express");
const router = express.Router();
const {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail,
} = require("../controllers/bookingController");
const { validateBooking } = require("../middleware/validation");

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Create a booking for an expert at a specific date and time slot.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - expertId
 *               - name
 *               - email
 *               - phone
 *               - date
 *               - timeSlot
 *             properties:
 *               expertId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               date:
 *                 type: string
 *               timeSlot:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error or double booking error
 *       404:
 *         description: Expert not found
 *       500:
 *         description: Server error
 */
router.post("/", validateBooking, createBooking);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Confirmed, Completed]
 *     responses:
 *       200:
 *         description: Booking status updated
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.patch("/:id/status", updateBookingStatus);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get bookings by email
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email address
 *     responses:
 *       200:
 *         description: A list of bookings
 *       400:
 *         description: Email query parameter is missing
 *       500:
 *         description: Server error
 */
router.get("/", getBookingsByEmail); // Using query param ?email=

module.exports = router;
