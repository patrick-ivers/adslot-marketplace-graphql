import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import typeDefs from './typedefs';

const GRAPHQL_PORT = 4000;
const schema = makeExecutableSchema({typeDefs, resolvers});
const app = express();

app.use('/graphql', bodyParser.json(), apolloExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(GRAPHQL_PORT, () =>
  console.log(`Now browse to localhost:${GRAPHQL_PORT}/graphiql`)
);
