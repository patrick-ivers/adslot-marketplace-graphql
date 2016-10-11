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
    sites: [Site]
  }

  type Site {
    id: Int!
    publisher: Publisher
    name: String
    description: String
    url: String
    logo: String
    monthlyImpressions: Int
    monthlyUpdates: Int
    updatedAt: String
  }

  type Query {
    publishers(id: Int, name: String): [Publisher]
    sites: [Site]
  }

  schema {
    query: Query
  }
`];

export default typeDefs;
