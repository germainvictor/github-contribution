const { gql } = require('apollo-boost');

const QUERY_USERS = gql`
  query($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      id
      mentionableUsers(first: 100, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          login
        }
      }
    }
  }
`;

module.exports = QUERY_USERS;
