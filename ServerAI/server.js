
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const UsersRouter = require('./routes/users');
const CalculatorRouter = require('./routes/calculator');
const ForumRouter = require('./routes/forum');

const app = express();
const httpsPort = normalizePort(process.env.HTTPS_PORT || '443');
const httpPort = normalizePort(process.env.HTTP_PORT || '80');

// Serve static files from the React app
const buildPath = path.resolve(__dirname, '../../WaterWiseAI-7/water-wize-ai/build');
app.use(express.static(buildPath));

// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Use the Users, Calculator, and Forum routers for specific API endpoints
app.use('/users', UsersRouter);
app.use('/calculator', CalculatorRouter);
app.use('/forum', ForumRouter);

// Swagger setup
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
        url: `https://localhost:${httpsPort}`,
        description: 'Local server'
      }
    ]
  },
  apis: ['./routes/*.js', './swaggerDefinitions.js'], // Paths to API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../WaterWiseAI-7/water-wize-ai/build', 'index.html'));
});

// SSL certificate
const privateKey = fs.readFileSync(path.resolve('C:/Users/user/Documents/WaterWiseAI-5/ServerAI/ssl/privkey2.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve('C:/Users/user/Documents/WaterWiseAI-5/ServerAI/ssl/cert2.pem'), 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate
};

// Create and start the HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server is running on https://waterwizeai.cs.bgu.ac.il:${httpsPort}`);
});

httpsServer.on('error', onError);
httpsServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = this.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Server listening on ${bind}`);
}

// Create and start the HTTP server to redirect to HTTPS
const httpApp = express();
httpApp.use((req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

const httpServer = http.createServer(httpApp);

httpServer.listen(httpPort, () => {
  console.log(`HTTP Server is running on port ${httpPort} and will redirect to HTTPS`);
});

httpServer.on('error', onError);
httpServer.on('listening', onListening);

module.exports = app; // Export the Express app
