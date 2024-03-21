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

function rawq(query) {

    let promise = new Promise((resolve, reject) => {
        pool.query(query, (err, result, fields) => {
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
async function create() {

}
// Read
async function read(table, where, fields=["*"]) {
    if(!table) throw new SyntaxError("read(): table must be defined")

    let data;
    if(!where) {
        data = await rawq(`SELECT ${fields.join(", ")} FROM ${table};`)
    }else {
        let string = "";
        for(let [key, value] of Object.entries(where)) {
            string += `${key} = "${value}"`;
        }
        data = await rawq(`SELECT ${fields.join(", ")} FROM ${table} WHERE ${string};`)
    }
    return data
}

// Update

// Delete


module.exports = { query, rawq, read }