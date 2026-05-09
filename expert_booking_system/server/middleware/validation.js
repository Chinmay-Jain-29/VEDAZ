const { body, validationResult } = require("express-validator");

const validateBooking = [
  body("expertId").notEmpty().withMessage("Expert ID is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("timeSlot").notEmpty().withMessage("Time slot is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    next();
  },
];

module.exports = {
  validateBooking,
};
