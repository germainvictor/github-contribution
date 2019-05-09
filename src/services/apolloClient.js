const { default: ApolloClient } = require('apollo-boost');
const fetch = require('node-fetch');
const config = require('../config');

const client = new ApolloClient({
  uri: config.endPoint,
  fetch,
  request: async (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${config.token}`,
      },
    });
  },
  onError: ({ response }) => {
    if (response.data && response.errors) {
      process.stderr.write(`Got an error in query: ${JSON.stringify(response.errors, null, 2)}\n`);
      response.errors = null;
    }
  },
});

module.exports = client;
