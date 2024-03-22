// POST: create new resources from the server :: Create
// GET: new requests from the server :: Read
// PUT: edit resources :: Update
// DELETE: delete resources :: Delete


/*  TODO
    1. Make database actually good structurally
*/
const log = console.log

// Make a request handler for different paths

// Connect with database

let { DB } = require("./database.js")

async function queryUsers() {
    let result = await DB.query("user")

    console.log(result)
}


//queryUsers();


// Serve our client with Express

const express = require("express");

// Initiate our express app
const app = express();

// Listen at our port (this is where the webpage will be served)
app.listen(3000, () => { log("Listening at port 3000")})

// Host ../client/index.js
app.use(express.static("../client"))

// Accept data in json format
app.use(express.json())


// Command handle http requests / routes with CRUD

const create = require("./requests/create.js")
const read = require("./requests/read.js")
const update = require("./requests/update.js")
const del = require("./requests/delete.js")

app.post("/read", read.execute)

app.post("/create", create.execute)

app.post("/update", update.execute)

app.post("/delete", del.execute)