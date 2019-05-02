const apolloClient = require('./services/apolloClient');

const getEntities = async (query, owner, name, dataMapper) => {
  // A recursive function to fetch all pages with the same query
  const queryEntities = async (entities = [], cursor = null) => {
    const { data } = await apolloClient.query({ query, variables: { owner, name, cursor } });
    const result = dataMapper(data);
    const newEntities = entities.concat(result.nodes);

    if (!result.pageInfo.hasNextPage) {
      return newEntities;
    }

    return queryEntities(newEntities, result.pageInfo.endCursor);
  };

  // And start it!
  return queryEntities();
};

module.exports = { getEntities };
