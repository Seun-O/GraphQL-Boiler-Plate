const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { prisma } = require('./generated/prisma-client');
import typeDefs from './schema.gql';

const server = new GraphQLServer({
  typeDefs,
  resolvers: {
    Mutation,
    Query
  },
  context: req => {
    return { ...req, prisma };
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

const options = {
  port: 4000,
  endpoint: '/gql',
  playground: '/docs',
  tracing: true,
  debug: true
};

server.start(options, ({ port }) =>
  console.log(`Server up, on http://localhost:${port}`)
);
