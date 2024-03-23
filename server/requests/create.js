const { Crypto } = require('../crypto.js');
const { DB } = require('../database.js')

module.exports = {
    execute: async function(request, response) {
        let data = request.body;

        // Command handle
        console.log(data)
        let command = data.command;
        let args = data.arguments;

        // Find which file to access
        let file = require(`./commands/create_${command}.js`)

        // Check to see if user has permission or if the user object is null (in the case of create account)
        if(!data.user || data.user.permission_level <= file.permission_level) {
            let keys = Object.keys(args)
            // Make sure right arguments are present
            for(let argument of file.arguments) {
                if(!keys.find(k => k === argument)) return response.json({status: 400, error: "Lacking sufficient arguments."})
            }

            // Execute file with request, response
            await file.execute(request, response, {DB, Crypto})
        }else {
            response.json({status: 400, error: `No permissions for create_${command}`})
        }
    }
}
