// Create SQLite database 
const sqlite3 = require('sqlite3').verbose();

// Database information
const DBSOURCE = "db.sqlite"

// Start SQLite database
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error('[-] A problem occured - ' + err.message)
      throw err
    }else{
        console.log('[+] Connected to the SQLite database.')
        db.run(`CREATE TABLE Entry (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            entry text, 
            CONSTRAINT id_unique UNIQUE (id)
            )`,
            console.log('[+] Build Table Entry'),
        (err) => {
            if (err) {
                // Table already created
                console.log('[-] A problem occured - ' + err.message)
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO Entry (entry) VALUES (?)'
                db.run(insert, "First ToDo Entry")
                db.run(insert, "Second ToDo Entry")
                console.log('[+] Inserted first and second row')
            }
        });  
    }
});


module.exports = db