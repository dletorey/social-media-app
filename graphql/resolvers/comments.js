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

            const post = await Post.findById(postId); // get the current post

            if(post) { // if there is a post
                post.comments.unshift({ // adds new comment to the top of the list
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                await post.save(); // waits until post has been saved
                return post; // returns post
            } else throw new UserInputError('Post can not be found');
         }
     }
 }