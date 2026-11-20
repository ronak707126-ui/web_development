
const express = require("express");

const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require("../controllers/postController");

// Create a blog post
router.post("/", createPost);

// Get all blog posts
router.get("/", getAllPosts);

// Get a single blog post
router.get("/:id", getPostById);

// Update a blog post
router.put("/:id", updatePost);

// Delete a blog post
router.delete("/:id", deletePost);

module.exports = router;
