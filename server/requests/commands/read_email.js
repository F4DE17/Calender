
module.exports = {
    permission_level: 5,
    arguments: ['email'],
    async execute(request, response, {DB, Crypto}) {
        let data = request.body

        let query = await DB.sql(`
            SELECT email FROM Users WHERE email = '${data.arguments.email}'
        `)
        // Check for errors
        if(query.error) {
            return response.json({status: 400, error: query.error})
        }

        // If there is no email
        if(query.length === 0) {
            return response.json({status: 400, email: false})
        }

        // Tell the user we found their email
        response.json({status: 200, email: query[0].email})
        
    }
}