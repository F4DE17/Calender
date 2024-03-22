// CONVENIENCE VARIABLES

const log = console.log

let q = document.querySelector.bind(document)

// Replace this with function that gets user
var user = {permission_level: 5, id: 1};


// CRYPTOGRAPHY
const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzZlixVDExDPkQnZprmtg
EAoIYgRkovaryVmNoWTULObHtsVfngb8eYQAgZQ7vNPUusDJZ6lqZP795lMVgfoG
ex7iXWOWLh6KfM8rU+/GSzcbqiRf/CNcRpQMNSINDeiSDTGHCljmsP3kmKU+L4z5
plocyhWH5dQgch7sNQHtnS7vTydhOblvNCqjXbXlA3voKxOOeEZNyhGQRerP0Hza
UKaoH//5i30xsppI35bWvedRkH93Bd2jXBXHnF1QiGYV/2EP14Z9hehl3fx35A6d
AripeSq8Bx+0uTSY+87jeWxqGI8leHn2BrgGOLmQEqL6unoCpiuUS0nrYY2XDlom
/QIDAQAB`

class Crypto {
    static hash(value, method="") {
        return value;
    }
}

// A class for making database requests to the server
class DB {
    /*
        INSERT INTO $table $(values.key)
        VALUES $(values.value);

        values like {email: "email@gmial.com", password: "querty"}
    */
    static async create(table, values) {
        
        // Pass it specified args but also
        // TODO, pass user object
        let data = await post("/create", {table: table, values: values, user: user})
        return data;
    }

    /*
        SELECT * FROM $table WHERE $where{value: condition};
    */
    static async read(table, where) {
        let data = await post("/read", {table: table, where: where, user: user})
        return data;
    }

    static async update(table, where) {
        
    }

    static async delete(table, where) {
        
    }
}

// HTTP MEATHODS

// When making a request for data use the syntax:
// {action: "CREATE|READ|UPDATE|DELETE", table: "<any table in our database>", values: "any data that needs to be used to execute the action"}
// Maybe make a native sql reqeust form but it has to be secure so anyone cant do anything
// For example
// (path = /read) {sql: "SELECT * FROM user WHERE email = "abc@test.com";"}

async function get(path, data) {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(path, options);
    let json = await response.json();
    
    return json;
}

async function post(path, data) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(path, options);
    let json = await response.json();
    
    return json;
}