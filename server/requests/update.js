const { query, rawq, read } = require('../database.js')

module.exports = {
    execute: async function({request, response}, data) {
        if(data.sql) {
            let queryData = await rawq(data.sql)
            response.json(queryData)
        }else {
            switch (data.event) {
                case 'authorize':
                    let d = await read("user", {email: data.values.email})  //rawq(`SELECT * WHERE email = ${data.values.email};`)
                    console.log(data)
                    console.log(d)
                    if(d && d[0].password === data.values.password) {
                        response.json(d)
                    }else{
                        response.json({status: 404})
                    }
                break;
            }
        }
    }
}
