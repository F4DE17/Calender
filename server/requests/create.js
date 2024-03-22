const { DB } = require('../database.js')

module.exports = {
    execute: async function(request, response) {
        let data = request.body;

        if(data.sql) {
            let queryData = await DB.sql(data.sql)
            response.json(queryData)
        }else {
            switch (data.event) {
                case 'account':
                    let keys = Object.keys(data.values)
                    let values = Object.values(data.values)
                    let account = await DB.sql(`INSERT INTO user (${keys.join(", ")}) VALUES (${values.join(", ")})`)
                    console.log(account)
                    response.json(account)
                break;
            }
        }
    }
}
