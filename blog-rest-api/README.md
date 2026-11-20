# Blog REST API

A simple Blog REST API built using **Node.js** and **Express.js**. This project performs CRUD (Create, Read, Update, Delete) operations on blog posts using a JSON file for data storage.

## Features

- Create a new blog post
- Get all blog posts
- Get a single blog post by ID
- Update an existing blog post
- Delete a blog post
- Input validation
- Error handling
- JSON file-based data storage

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON
- Nodemon

## Project Structure

```text
blog-rest-api/
├── controllers/
│   └── postController.js
├── routes/
│   └── postRoutes.js
├── middleware/
│   └── errorMiddleware.js
├── data/
│   └── posts.json
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Open the project folder:

```bash
cd blog-rest-api
```

3. Install dependencies:

```bash
npm install
```

## Run the Project

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The server runs at:

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/posts` | Create a new post |
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get a post by ID |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

## Sample Request Body

```json
{
  "title": "My First Blog",
  "content": "This is my first blog post.",
  "authorName": "John",
  "category": "Technology"
}
```

## Data Storage

All blog post data is stored in the `data/posts.json` file.

## Testing

API endpoints can be tested using **Postman**.

## Author

Created as a Week 06 Minor Project.

## License

This project is created for educational purposes.