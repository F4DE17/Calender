let {createPool} =  require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "mySQL17fire",
    database: "calender",
    connectionLimit: 10
})

function query(table, fields=["*"]) {
    if(!table) throw new SyntaxError("query(): table required")

    let promise = new Promise((resolve, reject) => {
        pool.query(`SELECT ${fields.join(", ")} FROM ${table}`, (err, result, fields) => {
            if(err) {
                resolve(err)
            }
            resolve(result)
        })
    })
    
    return promise; 
}

// Define meathods for CRUD

// Create

// Read

// Update

// Delete


module.exports = { query }