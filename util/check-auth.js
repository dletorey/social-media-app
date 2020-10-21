
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // context = { ... headers } this is an example of what context will return
    const authHeader = context.req.headers.authorization; // this sets the authorization header to context
    if(authHeader){
        // if authHeader exists split it to get the token
        const token = authHeader.split('Bearer ')[1]; // this takes the token from Bearer and sets it to token
        if(token){
            try{
                // if the token exists we use verify to check it is valid
                const user = jwt.verify(token, SECRET_KEY);
                return user;   
            } catch(err) {
                throw new AuthenticationError('Invalid or Expired token')
            }
        }
        throw new Error('Authentication token must be of format Bearer [token]')
    }
    throw new Error('Authorization header must be provided')
}