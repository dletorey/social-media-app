const { AuthenticationError, UserInputError } = require('apollo-server');

const { getOperationAST } = require('graphql');
const { argsToArgsConfig } = require('graphql/type/definition');
const Post = require('../../models/Posts');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context){
      const user = checkAuth(context); // this uses the context with checkAuth module to make sure the user has a valid token
      // check to see if post body is empty
      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }
      // create new post
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', {
        newPost: post
      });

      return post;
    }, 
    async deletePost(_, { postId }, context){
      const user = checkAuth(context); // this uses the context with checkAuth module to make sure the user has a valid token
      try {
        const post = await Post.findById(postId); // this sets post to be the post with postId
        if (user.username === post.username) {
          // checks to see if the post was created by the user
          await post.delete(); // waits until the post has been deleted from db
          return 'Post deleted successfully';
        } else {
          // this happens if the user didn't create the post
          throw new AuthenticationError('Action not allowed');
        }
      } catch(err) {
        throw new Error(err);
      }
    },
    // like post here
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};