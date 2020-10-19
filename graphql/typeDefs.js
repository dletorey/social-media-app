const { gql } = require('apollo-server');

module.exports = gql`
type Post {
  id: ID!
  body: String!
  createdAt: String!
  username: String!
}
type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createAt: String!
    firstName: String!
    lastName: String!
}
input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    firstName: String!
    lastName: String!
}
type Query {
  getPosts: [Post]
}
type Mutation{
    register(registerInput: RegisterInput)
}
`;