// POST: create new resources from the server :: Create
// GET: new requests from the server :: Read
// PUT: edit resources :: Update
// DELETE: delete resources :: Delete

// Make a request handler for different paths

// Connect with database

let { query } = require("./database.js")

async function queryUsers() {
    let result = await query("user")

    console.log(result)
}


queryUsers();