const Post = require('../../Models/Posts')

module.exports = {
    Query: {
        async getPosts() {
          try {
            const posts = await Post.find();
            return posts;
          } catch (err) {
            throw new Error(err);
          }
        }
      }
}