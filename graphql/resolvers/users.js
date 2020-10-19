const User = require('../../Models/User');

module.exports = {
    Mutation: {
        register(_, args, context, info){
            // TODO: Validate user data
            // TODO: Make sure user is unique
            // TODO: hash password and create an auth token 
        }
    }
}