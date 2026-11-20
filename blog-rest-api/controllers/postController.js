
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const dataFile = path.join(__dirname, "../data/posts.json");

// Read all posts from JSON file
const readPosts = async () => {
  const data = await fs.readFile(dataFile, "utf8");
  return JSON.parse(data);
};

// Save posts to JSON file
const savePosts = async (posts) => {
  await fs.writeFile(
    dataFile,
    JSON.stringify(posts, null, 2),
    "utf8"
  );
};

// Allowed blog post fields
const allowedFields = [
  "title",
  "content",
  "authorName",
  "category"
];

// Validate input fields
const validatePost = (body, isUpdate = false) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be a JSON object.";
  }

  const keys = Object.keys(body);

  if (keys.length === 0) {
    return "Please provide blog post details.";
  }

  const invalidFields = keys.filter(
    (key) => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    return `Invalid fields: ${invalidFields.join(", ")}`;
  }

  for (const field of allowedFields) {
    if (!isUpdate && !(field in body)) {
      return `${field} is required.`;
    }

    if (field in body) {
      if (
        typeof body[field] !== "string" ||
        body[field].trim() === ""
      ) {
        return `${field} must be a non-empty string.`;
      }
    }
  }

  return null;
};

// 1. CREATE BLOG POST
const createPost = async (req, res, next) => {
  try {
    const error = validatePost(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const posts = await readPosts();

    const newPost = {
      id: randomUUID(),
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      authorName: req.body.authorName.trim(),
      category: req.body.category.trim(),
      createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    await savePosts(posts);

    res.status(201).json({
      message: "Blog post created successfully.",
      post: newPost
    });
  } catch (error) {
    next(error);
  }
};

// 2. GET ALL BLOG POSTS
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await readPosts();

    res.status(200).json({
      count: posts.length,
      posts
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET SINGLE BLOG POST
const getPostById = async (req, res, next) => {
  try {
    const posts = await readPosts();

    const post = posts.find(
      (post) => post.id === req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Blog post not found."
      });
    }

    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE BLOG POST
const updatePost = async (req, res, next) => {
  try {
    const error = validatePost(req.body, true);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const posts = await readPosts();

    const index = posts.findIndex(
      (post) => post.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Blog post not found."
      });
    }

    const updatedFields = {};

    for (const field of allowedFields) {
      if (field in req.body) {
        updatedFields[field] = req.body[field].trim();
      }
    }

    posts[index] = {
      ...posts[index],
      ...updatedFields,
      updatedAt: new Date().toISOString()
    };

    await savePosts(posts);

    res.status(200).json({
      message: "Blog post updated successfully.",
      post: posts[index]
    });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE BLOG POST
const deletePost = async (req, res, next) => {
  try {
    const posts = await readPosts();

    const index = posts.findIndex(
      (post) => post.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Blog post not found."
      });
    }

    const deletedPost = posts.splice(index, 1)[0];

    await savePosts(posts);

    res.status(200).json({
      message: "Blog post deleted successfully.",
      post: deletedPost
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
