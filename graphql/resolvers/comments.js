const { UserInputError } = require('apollo-server');
const Post = require('../../models/Posts');

 module.exports = {
     Mutation: {
         createComment: async (_, { postId, body }, context) =>{
            const user = checkAuth(context); // this uses the context with checkAuth module to make sure the user has a valid token
            if(body.trim() === ''){ // checks to see if the body of the comment is empty
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment must not be empty'
                    }
                })
            }

            
         }
     }
 }