const { getEntities } = require('./entities');
const { assignGenericProperty, assignCommitProperty } = require('./properties');
const { getRepository } = require('./repository');
const {
  QUERY_PULL_REQUEST,
  QUERY_COMMIT_COMMENTS,
  QUERY_ISSUES,
  QUERY_USERS,
  QUERY_COMMITS,
} = require('./queries');

const fetchGithubContributors = async (owner, name, topContributorsLimit) => {
  // Get repository for basics metrics (description, commits count, languages, ...)
  const repository = await getRepository(owner, name);

  // Get mentionable users (users that can be mentioned in the context of the repository)
  const users = (await getEntities(
    QUERY_USERS,
    owner,
    name,
    data => data.repository.mentionableUsers,
  )).reduce((acc, node) => ({ ...acc, [node.login]: { ...node, score: 0 } }), {});

  // This queries "generic" entities (such as pull requests, issues, etc) that share the same schema
  // Then it iterates over users to assign these properties
  const genericEntityMapper = async (query, property) => {
    const entities = await getEntities(query, owner, name, data => data.repository[property]);
    assignGenericProperty(users, entities, property);
  };

  // Triggers all requests at the same time to collect entities and map properties concurrently
  await Promise.all([
    // Get entities with generic schema
    genericEntityMapper(QUERY_PULL_REQUEST, 'pullRequests'),
    genericEntityMapper(QUERY_COMMIT_COMMENTS, 'commitComments'),
    genericEntityMapper(QUERY_ISSUES, 'issues'),
    // Get commits and assign metrics to each user
    getEntities(
      QUERY_COMMITS,
      owner,
      name,
      data => data.repository.defaultBranchRef.target.history,
    ).then((commits) => {
      assignCommitProperty(users, commits);
    }),
  ]);

  // Sort the users by their score (and filter out users who haven't actually contributed)
  const sortedUsers = Object.values(users)
    .sort((a, b) => b.score - a.score)
    .filter(user => user.score > 0);

  return {
    ...repository,
    contributors:
      topContributorsLimit > 0 ? sortedUsers.slice(0, topContributorsLimit) : sortedUsers,
  };
};

module.exports = fetchGithubContributors;
