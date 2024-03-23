
module.exports = {
    permission_level: 5,
    arguments: ['email', "password"],
    async execute(request, response, {DB, Crypto}) {
        let data = request.body

        let query = await DB.sql(`
            SELECT * FROM Users WHERE email = '${data.arguments.email}'
        `)

        // If there is no account tell the user
        if(query.length === 0) {
            return response.json({status: 400, error: "User does not exist"})
        }

        let user = query[0];

        // Now check to see if the hashes of both match
        let match = Crypto.saltyhashMatch(data.arguments.password, user.password);

        if(match) {
            // Give the user their account so they can login
            // Tell the user we found their email
            delete query[0].password;
            response.json({status: 200, user: query[0]})
        }else {
            response.json({status: 400, error: "Invalid credentials"})
        }
    }
}