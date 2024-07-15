require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const UsersRouter = require('./routes/users');
const CalculatorRouter = require('./routes/calculator');
const ForumRouter = require('./routes/forum');


const app = express();
const port = process.env.PORT || 443;

// Serve static files from the React app
// app.use(express.static("../../WaterWiseAI/water-wize-ai/build"));
// const buildPath = path.resolve(__dirname, '../../WaterWiseAI-5/water-wize-ai/build');
// app.use(express.static(buildPath));

// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Use the Users, Calculator, and Forum routers for specific API endpoints
app.use('/users', UsersRouter);
app.use('/calculator', CalculatorRouter);
app.use('/forum', ForumRouter);

// Swagger setup (example)
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Express application'
    },
    servers: [
      {
        url: 'http://localhost:80',
        description: 'Local server'
      }
    ]
  },
  apis: ['./routes/*.js','./swaggerDefinitions.js'], // Paths to API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join("../../WaterWiseAI/water-wize-ai/build", 'index.html'));
// });
// Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../../WaterWiseAI-5/water-wize-ai/build", 'index.html'));
// });
// C:\Users\user\Documents\WaterWiseAI-5\water-wize-ai\build
// Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   const indexPath = path.resolve(buildPath, 'index.html');
//   console.log('Serving index.html from:', indexPath); // Debugging log
//   res.sendFile(indexPath);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the Express app