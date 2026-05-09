const Booking = require("../models/Booking");
const Expert = require("../models/Expert");
const socket = require("../socket/socket");

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res, next) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    const expert = await Expert.findById(expertId);
    if (!expert) {
      res.status(404);
      throw new Error("Expert not found");
    }

    // Attempt to create booking - Compound unique index prevents duplicates
    const booking = await Booking.create({
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    });

    // Remove the booked slot from the expert's availableSlots (Optional but good practice)
    await Expert.updateOne(
      { _id: expertId, "availableSlots.date": date },
      { $pull: { "availableSlots.$.slots": timeSlot } }
    );

    // Emit socket event for real-time updates
    const io = socket.getIO();
    io.emit("slotBooked", {
      expertId,
      date,
      timeSlot,
    });

    res.status(201).json(booking);
  } catch (error) {
    // Handle MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      res.status(400);
      return next(new Error("This slot has already been booked. Please choose another one."));
    }
    next(error);
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Public
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!["Pending", "Confirmed", "Completed"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings by email
// @route   GET /api/bookings?email=
// @access  Public
const getBookingsByEmail = async (req, res, next) => {
  try {
    const email = req.query.email;
    
    if (!email) {
      res.status(400);
      throw new Error("Email query parameter is required");
    }

    const bookings = await Booking.find({ email }).populate("expertId", "name category").sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail,
};
