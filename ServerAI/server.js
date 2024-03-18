const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Route to handle the POST request for calculating water recommendation
app.post("/api/calculate", (req, res) => {
    // Assuming you perform some calculations here based on the received data
    const agriculturalData = req.body;
    // Dummy calculation for water recommendation
    const recommendation = 'Dummy water recommendation'; // Replace with actual calculation
    res.json({ recommendation });
});

// Serve static files from the 'build' folder
app.use(express.static('build'));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
