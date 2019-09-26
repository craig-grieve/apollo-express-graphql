// Exporting your typeDef
// extend type Query: your query search terms
// type Variable: typeDefs for your graphQL
const Users = `
  extend type Query {
    user(id: ID): User
  }

  type User {
    id: ID
    email: String
    username: String
    password: String
  }
`;

// Exporting your resolvers
const userResolvers = {
    Query: {
      user: () => "",
    }
  };

module.exports = { Users, userResolvers };