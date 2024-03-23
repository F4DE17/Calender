// CONVENIENCE VARIABLES

const log = console.log

let q = document.querySelector.bind(document)

// Replace this with function that gets user
var user = {permission_level: 5, id: 1};


// CRYPTOGRAPHY


class Crypto {
    static async hash(string) {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((bytes) => bytes.toString(16).padStart(2, '0'))
          .join('');
        return hashHex;
    }

    static publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzZlixVDExDPkQnZprmtg
    EAoIYgRkovaryVmNoWTULObHtsVfngb8eYQAgZQ7vNPUusDJZ6lqZP795lMVgfoG
    ex7iXWOWLh6KfM8rU+/GSzcbqiRf/CNcRpQMNSINDeiSDTGHCljmsP3kmKU+L4z5
    plocyhWH5dQgch7sNQHtnS7vTydhOblvNCqjXbXlA3voKxOOeEZNyhGQRerP0Hza
    UKaoH//5i30xsppI35bWvedRkH93Bd2jXBXHnF1QiGYV/2EP14Z9hehl3fx35A6d
    AripeSq8Bx+0uTSY+87jeWxqGI8leHn2BrgGOLmQEqL6unoCpiuUS0nrYY2XDlom
    /QIDAQAB`
}


// A class for making database requests to the server
class Req {
    static async create(command, args) {
        let data = await post("/create", {user: user, command: command, arguments: args})
        return data;
    }

    static async read(command, args) {
        let data = await post("/read", {user: user, command: command, arguments: args})
        return data;
    }

    static async update(command, args) {
        let data = await post("/update", {user: user, command: command, arguments: args})
        return data;
    }

    static async delete(command, args) {
        let data = await post("/delete", {user: user, command: command, arguments: args})
        return data;
    }
}




// HTTP MEATHODS
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