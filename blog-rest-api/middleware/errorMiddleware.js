
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Handle invalid JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format."
    });
  }

  res.status(500).json({
    message: "Internal Server Error.",
    error: err.message
  });
};

module.exports = errorMiddleware;
