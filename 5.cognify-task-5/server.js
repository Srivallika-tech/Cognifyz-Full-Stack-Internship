const express = require("express");

const app = express();

const PORT = 3000;


// ==========================================
// STORE USERS
// ==========================================

let users = [
    {
        id: 1,
        name: "John",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@example.com"
    }
];


// ==========================================
// MIDDLEWARE
// ==========================================

// Allow JSON data
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static("public"));


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html");

});


// ==========================================
// GET - READ ALL USERS
// ==========================================

app.get("/api/users", (req, res) => {

    res.json(users);

});


// ==========================================
// POST - CREATE A NEW USER
// ==========================================

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;


    // Check required fields
    if (!name || !email) {

        return res.status(400).json({

            message: "Name and email are required."

        });

    }


    // Create new user
    const newUser = {

        id: users.length + 1,

        name: name,

        email: email

    };


    // Add user to array
    users.push(newUser);


    // Send response
    res.status(201).json({

        message: "User created successfully!",

        user: newUser

    });

});


// ==========================================
// PUT - UPDATE AN EXISTING USER
// ==========================================

app.put("/api/users/:id", (req, res) => {

    const userId = Number(req.params.id);

    const { name, email } = req.body;


    // Find user
    const user = users.find(function (user) {

        return user.id === userId;

    });


    // Check if user exists
    if (!user) {

        return res.status(404).json({

            message: "User not found."

        });

    }


    // Check required fields
    if (!name || !email) {

        return res.status(400).json({

            message: "Name and email are required."

        });

    }


    // Update user details
    user.name = name;

    user.email = email;


    // Send response
    res.json({

        message: "User updated successfully!",

        user: user

    });

});


// ==========================================
// DELETE - DELETE AN EXISTING USER
// ==========================================

app.delete("/api/users/:id", (req, res) => {

    const userId = Number(req.params.id);


    // Find user index
    const userIndex = users.findIndex(function (user) {

        return user.id === userId;

    });


    // Check if user exists
    if (userIndex === -1) {

        return res.status(404).json({

            message: "User not found."

        });

    }


    // Remove user
    const deletedUser = users.splice(userIndex, 1);


    // Send response
    res.json({

        message: "User deleted successfully!",

        user: deletedUser[0]

    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});