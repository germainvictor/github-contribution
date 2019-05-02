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
});

module.exports = client;
