const log = console.log

let q = document.querySelector.bind(document)

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