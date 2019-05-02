const { gql } = require('apollo-boost');

const QUERY_COMMIT_COMMENTS = gql`
  query($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      id
      commitComments(first: 100, after: $cursor) {
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

module.exports = QUERY_COMMIT_COMMENTS;
