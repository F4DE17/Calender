
module.exports = {
    permission_level: 5,
    arguments: ['email', 'password', 'firstname', 'lastname', 'birthday'],
    async execute(request, response, {DB, Crypto}) {
        let data = request.body
        // Make sure user has all of the arguments
        let { email, password, firstname, lastname, birthday } = data.arguments

        // Salty hash password
        password = Crypto.saltyhash(password);
        let query = await DB.sql(
            `INSERT INTO \`Users\` (\`email\`, \`password\`, \`firstname\`, \`lastname\`, \`birthday\`, \`group_id\`, \`permission_level\`)
            VALUES ('${email}', '${password}','${firstname}', '${lastname}', '${birthday}', 0, 5);
        `)
        console.log(query);
        // Check for errors
        if(query.error) {
            return response.json({status: 400, error: query.error})
        }
        // Now query the account to send it back to the user
        let account = await DB.sql(
            `SELECT *
            FROM \`Users\` AS u WHERE u.id = ${query.insertId};`
        )[0]

        console.log(`Account created with email: ${account.email} and id ${account.id}`)
        
        response.json(account)
    }
}