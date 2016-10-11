const typeDefs = [`
  type Company {
    name: String
  }

  type Publisher {
    id: Int!
    givenName: String
    surname: String
    username: String
    avatar: String
    timezone: String
    updatedAt: String
    status: String
    company: Company
  }

  type Query {
    publisher(id: Int, name: String): [Publisher]
  }

  schema {
    query: Query
  }
`];

export default typeDefs;
