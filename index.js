const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    element: [Capability]!
  }

  interface Capability {
    id: ID!
    name: String!
  }

  type FireCapability implements Capability {
    id: ID!
    name: String!
    heat: Int!
  }

  type WaterCapability implements Capability {
    id: ID!
    name: String!
    temp: Int!
  }
`;

const resolvers = {
  Query: {
    element: (root, args, context) => {
      return [
        { id: 1, heat: 7, temp: 24 },
        { id: 2, temp: 24 },
        { id: 3, heat: 7 }
      ];
    }
  },
  Capability: {
    __resolveType: obj => {
      console.log(obj);
      if (obj.heat) {
        return "FireCapability";
      }
      if (obj.temp) {
        return "WaterCapability";
      }
      return null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
