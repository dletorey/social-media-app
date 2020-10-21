const { AuthenticationError,  UserInputError } = require('apollo-server');
const Post = require('../../models/Posts');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) =>{
            const { username } = checkAuth(context); // this uses the context with checkAuth module to make sure the user has a valid token
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
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save(); // waits until post has been saved
                return post; // returns post
            } else throw new UserInputError('Post can not be found');
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);
      
            const post = await Post.findById(postId);
      
            if (post) {
              const commentIndex = post.comments.findIndex((c) => c.id === commentId);
      
              if (post.comments[commentIndex].username === username) {
                post.comments.splice(commentIndex, 1);
                await post.save();
                return post;
              } else {
                throw new AuthenticationError('Action not allowed');
              }
            } else {
              throw new UserInputError('Post not found');
            }
        }
    }
}