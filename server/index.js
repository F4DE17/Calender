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

let { query } = require("./database.js")

async function queryUsers() {
    let result = await query("user")

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


// Handle http requests / routes with CRUD


const read = require("./requests/read.js")


app.post("/read", async (request, response) => {
    let data = request.body

    read.execute({request, response}, data);

})


// Encryption

const { generateKeyPairSync } = require("crypto")

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
})

