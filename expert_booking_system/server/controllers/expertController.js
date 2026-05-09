const Expert = require("../models/Expert");

// @desc    Get all experts (with pagination, search, filter)
// @route   GET /api/experts
// @access  Public
const getExperts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const startIndex = (page - 1) * limit;
    const total = await Expert.countDocuments(query);

    const experts = await Expert.find(query)
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      experts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalExperts: total,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single expert by ID
// @route   GET /api/experts/:id
// @access  Public
const getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      res.status(404);
      throw new Error("Expert not found");
    }

    res.status(200).json(expert);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperts,
  getExpertById,
};
