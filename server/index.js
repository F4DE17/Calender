// POST: create new resources from the server :: Create
// GET: new requests from the server :: Read
// PUT: edit resources :: Update
// DELETE: delete resources :: Delete


/*  TODO
    1. Make database actually good structurally
*/

// Convenience variables

const log = console.log



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

// Path for the read() function executed in browser
app.post("/read", read.execute)

// Path for the create() function executed in browser
app.post("/create", create.execute)

// Path for the update() function executed in browser
app.post("/update", update.execute)

// Path for the delete() function executed in browser
app.post("/delete", del.execute)


const { Crypto } = require("./crypto.js");

console.log(Crypto.saltyhash("Himom"))