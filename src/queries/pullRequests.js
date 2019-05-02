const { gql } = require('apollo-boost');

const QUERY_PULL_REQUEST = gql`
  query($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      id
      pullRequests(first: 100, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          author {
            login
          }
        }
      }
    }
  }
`;

module.exports = QUERY_PULL_REQUEST;
