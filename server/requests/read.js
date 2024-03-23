const { DB } = require('../database.js')

// Date is either an object with the property event and values
// Or it is an object with the property table, values, and user
// The former is for certain actions, and the latter is for reading data

module.exports = {
    execute: async function(request, response) {
        let data = request.body;
        if(data.sql) {
            let queryData = await DB.sql(data.sql)
            response.json(queryData)
        }else {
            if(data.event) {
                switch (data.event) {
                    case 'authorize':
                        let d = await DB.read("user", {email: data.values.email})  //rawq(`SELECT * WHERE email = ${data.values.email};`)
                        if(d && d[0].password === data.values.password) {
                            response.json(d)
                        }else{
                            response.json({status: 404})
                        }
                    break;
                }
            }else if(data.table) {
                console.log(data.user.permission_level)
                // First check and see if the permissions are valid
                let permissions = await DB.permissions(data.user, data.values.column, data.values.row, {where: {id: data.user.id}})

                if(permissions.permission) {
                    // Now we want to query the data
                    let query = await DB.read(data.table, data.values.row)
                    return response.json(query);
                }
            }
        }
    }
}
