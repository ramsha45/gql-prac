const express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./gqlSchema/schema')

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

module.exports = app;