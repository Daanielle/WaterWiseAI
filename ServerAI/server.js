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
app.use(express.static("C:\\Users\\user\\Desktop\\WaterWiseAI\\water-wize-ai\\build"));

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

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join("C:\\Users\\user\\Desktop\\WaterWiseAI\\water-wize-ai\\build", 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
