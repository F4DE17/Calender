const { Crypto } = require('../crypto.js');
const { DB } = require('../database.js')


// Date is either an object with the property event and values
// Or it is an object with the property table, values, and user
// The former is for certain actions, and the latter is for reading data

module.exports = {
    execute: async function(request, response) {
        let data = request.body;

        // Command handle here
        if(data.command) {
            let data = request.body;

            // Command handle
            let command = data.command;
            let args = data.arguments;
    
            // Find which file to access
            let file = require(`./commands/read_${command}.js`)
    
            // Check to see if user has permission or if the user object is null (in the case of login stuff)
            if(!data.user || data.user.permission_level <= file.permission_level) {
                let keys = Object.keys(args)
                // Make sure right arguments are present
                for(let argument of file.arguments) {
                    if(!keys.find(k => k === argument)) return response.json({status: 400, error: "Lacking sufficient arguments."})
                }
    
                // Execute file with request, response
                await file.execute(request, response, {DB, Crypto})
            }else {
                response.json({status: 400, error: `No permissions for read_${command}`})
            }
        }
        // This is a read request for certain data
        // Dont touch :>
        else if(data.table) {
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