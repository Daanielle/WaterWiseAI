const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ["U1", "U2", "U3"]})
})
app.listen(5000, () => {console.log("server started on port 5000")})
