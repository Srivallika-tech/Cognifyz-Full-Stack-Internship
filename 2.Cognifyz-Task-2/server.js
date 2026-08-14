const express = require("express");

const app = express();

const PORT = 3001;

// EJS setup
app.set("view engine", "ejs");

// Read form data
app.use(express.urlencoded({ extended: true }));

// Temporary server-side storage
const users = [];

// Display registration form
app.get("/", (req, res) => {
    res.render("index");
});

// Handle form submission
app.post("/submit", (req, res) => {

    const {
        name,
        email,
        age,
        password,
        confirmPassword,
        course,
        gender,
        terms
    } = req.body;


    // Server-side validation

    if (!name || name.trim() === "") {
        return res.status(400).send("Server Error: Full name is required.");
    }

    if (!email || email.trim() === "") {
        return res.status(400).send("Server Error: Email is required.");
    }

    if (!age || Number(age) < 18) {
        return res.status(400).send("Server Error: Age must be 18 or above.");
    }

    if (!password || password.length < 6) {
        return res.status(400).send("Server Error: Password must contain at least 6 characters.");
    }

    if (password !== confirmPassword) {
        return res.status(400).send("Server Error: Passwords do not match.");
    }

    if (!course) {
        return res.status(400).send("Server Error: Please select a course.");
    }

    if (!terms) {
        return res.status(400).send("Server Error: Please accept the terms and conditions.");
    }


    // Store validated data temporarily
    const user = {
        name: name.trim(),
        email: email.trim(),
        age: Number(age),
        course: course,
        gender: gender || "Not specified"
    };

    users.push(user);


    // Display successful submission
    res.render("result", {
        user: user
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Task 2 server is running on http://localhost:${PORT}`);
});