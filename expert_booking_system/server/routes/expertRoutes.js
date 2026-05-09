const express = require("express");
const router = express.Router();
const { getExperts, getExpertById } = require("../controllers/expertController");

/**
 * @swagger
 * /api/experts:
 *   get:
 *     summary: Get all experts
 *     description: Retrieve a paginated list of experts. Can be filtered by search term and category.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to match expert names
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter experts by category
 *     responses:
 *       200:
 *         description: A list of experts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 experts:
 *                   type: array
 *                   items:
 *                     type: object
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalExperts:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get("/", getExperts);

/**
 * @swagger
 * /api/experts/{id}:
 *   get:
 *     summary: Get a single expert by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The expert ID
 *     responses:
 *       200:
 *         description: Expert details
 *       404:
 *         description: Expert not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getExpertById);

module.exports = router;
