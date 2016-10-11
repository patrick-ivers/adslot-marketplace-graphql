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
    products: [Product]
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
    products: [Product]
  }

  type Product {
    id: Int!
    publisher: Publisher
    site: Site
    name: String
    classification: String
    position: String
    description: String
    device: String
    adFormatType: String
    type: String
    timezone: String
    updatedAt: String
  }

  type Query {
    publishers(id: Int, name: String): [Publisher]
    sites(id: Int, publisherId: Int): [Site]
    products(id: Int, publisherId: Int, siteId: Int, siteName: String): [Product]
  }

  schema {
    query: Query
  }
`];

export default typeDefs;
