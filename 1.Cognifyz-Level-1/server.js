const express = require("express");

const app = express();

const PORT = 3000;

// Tell Express that we are using EJS
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    res.render("result", {
        name: name,
        email: email
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});