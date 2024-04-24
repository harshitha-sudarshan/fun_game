const express = require('express');
const app = express();
const port = 3000;

// Data storage for form submissions
let formSubmissions = [];

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Handle form submissions
app.post('/submit-form', (req, res) => {
    // Access form data from req.body
    const formData = req.body;
    console.log('Form data:', formData);

    // Store form data
    formSubmissions.push(formData);

    // Respond to the client
    res.send('Form submitted successfully!');
});

// Retrieve all form submissions
app.get('/form-submissions', (req, res) => {
    // Send back the array of form submissions as JSON
    res.json(formSubmissions);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});