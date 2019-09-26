// Import your seperate Schemas
const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { Users, userResolvers } = require('./users/users.js');

// Default typeDefs set to empty
// You could add any generic Queries here
const Query = `
  type Query {
    _empty: String
  }
`;

// Default resolvers set to empty
const resolvers = {
  Query: {}
};

// Merge typeDefs and resolvers
module.exports = schema = makeExecutableSchema({
  typeDefs: [ Query, Users ],
  resolvers: merge(resolvers, userResolvers),
});
