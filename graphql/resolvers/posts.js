const { AuthenticationError } = require('apollo-server');

const { getOperationAST } = require('graphql');
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
      // create new post
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
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
    }
  }
};