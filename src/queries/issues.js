const { gql } = require('apollo-boost');

const QUERY_ISSUES = gql`
  query($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      id
      issues(first: 100, after: $cursor) {
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

module.exports = QUERY_ISSUES;
