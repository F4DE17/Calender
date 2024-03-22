let {createPool} =  require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "mySQL17fire",
    database: "calender",
    connectionLimit: 10
})

class DB {
    static query(table, fields=["*"]) {
        if(!table) throw new SyntaxError("query(): table required")
    
        let promise = new Promise((resolve, reject) => {
            pool.query(`SELECT ${fields.join(", ")} FROM ${table}`, (err, result, fields) => {
                if(err) {
                    resolve(err)
                }
                resolve(result)
            })
        })
        
        return promise; 
    }

    static sql(query) {

        let promise = new Promise((resolve, reject) => {
            pool.query(query, (err, result, fields) => {
                if(err) {
                    resolve(err)
                }
                resolve(result)
            })
        })
        
        return promise; 
    }

    // Permissions management
        // The row should be a {where: } object
    static async permissions(user, table, column, row) {
        let permission_level = user.permission_level;
        // Uppercase it like it is in the db
        table = table[0].toUpperCase() + table.slice(1);
        

        if(!permission_level) throw new SyntaxError("permissions(): permission_level must be defined")
        let data = await DB.sql(`
            SELECT * FROM permissions AS p
            WHERE p.auth_id = ${permission_level} 
        `)
        // Find the table
        let permissionsTable = data.find(d => d.table === table);
        console.log(permissionsTable)
        // If there is no table, return false because the user does not have permissions
        if(!permissionsTable) return {permission: false, reason: `No permissions for the ${table} table.`};

        // See if the user has permission for the column they are seeking
        let permissionColumn = permissionsTable.columns.split(", ").find(d => d === column);
        if(!permissionColumn) return {permission: false, reason: `No permissions for column ${column}.`};

        // Finally, see if our user has permission for the row they are requesting
        // If the row permission of the table is all, they are good
        if(permissionsTable.rows === "all") return {permission: true}
        // Otherwise, if it is "own" we need to make sure the row they are requesting a row that belongs to them
        else if(permissionsTable.rows === "own") {
            // The row should be a {where: {id: N}} object
            // Query the user's row based on its primary key

            switch(table.toLowerCase()) {
                // In the users table, the row belongs to the user if their id matches
                case "users":
                    if(row.where.id !== user.id) return {permission: false, reason: `No permissions`}
                break;
                default:

                break;
            } 
        }

        return {permission: true};
    }

    // Define meathods for CRUD

    // Create
    static create() {

    }
    // Read
    static async read(table, where, fields=["*"]) {
        if(!table) throw new SyntaxError("read(): table must be defined")

        let data;
        if(!where) {
            data = await DB.sql(`SELECT ${fields.join(", ")} FROM ${table};`)
        }else {
            let string = "";
            for(let [key, value] of Object.entries(where)) {
                string += `${key} = "${value}"`;
            }
            data = await DB.sql(`SELECT ${fields.join(", ")} FROM ${table} WHERE ${string};`)
        }
        return data
    }

    // Update

    // Delete
}







module.exports = { DB }