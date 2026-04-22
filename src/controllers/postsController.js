// A simple array to act as our database for now
let posts = [
    { id: 1, title: "Hello World", content: "Modular code is great!", author: "Admin" }
];

const getAllPosts = (req, res) => {
    res.json(posts);
};

const createPost = (req, res) => {
    const { title, content, author } = req.body;
    const newPost = { id: posts.length + 1, title, content, author };
    posts.push(newPost);
    res.status(201).json(newPost);
};

module.exports = { getAllPosts, createPost };
