// To generate a new secret key, run the following command: node generateSecretKey, It will Delete .env
// DATABASE_URI=mongodb://localhost:27017/WaterWiseDB
// PORT=80 
const fs = require('fs');
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Write the secret key to a .env file
fs.writeFileSync('.env', `JWT_SECRET=${secretKey}`);
console.log('Secret key generated and saved to .env file.');
