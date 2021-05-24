// Create express app 
const express = require('express')
const app = express()
const db = require('./db.js')

// Server Information
const hostname = '127.0.0.1';
const port = 3000;

// Root endpoint
app.get('/', (req, res) => {res.send('Hello there!')})


// API endpoints
app.get('/entries', (req, res, next) => {
    var sql = "select * from Entry"
    var params = []
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    }
    )
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

// Start Server
app.listen(port, () => console.log('[+] Example app listening on port ' + port + '!'))