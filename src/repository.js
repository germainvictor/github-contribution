const apolloClient = require('./services/apolloClient');
const { QUERY_REPOSITORY } = require('./queries');

const getRepository = async (owner, name) => {
  const result = await apolloClient.query({
    query: QUERY_REPOSITORY,
    variables: { owner, name },
  });

  const {
    commitComments, mentionableUsers, pullRequests, languages,
  } = result.data.repository;

  const sortedLanguages = languages.edges
    .map(language => ({
      language: language.node.name,
      percentage: Math.round((language.size / languages.totalSize) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return {
    ...result.data.repository,
    languages: sortedLanguages,
    commitComments: commitComments.totalCount,
    mentionableUsers: mentionableUsers.totalCount,
    pullRequests: pullRequests.totalCount,
  };
};

module.exports = { getRepository };
