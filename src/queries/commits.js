const { gql } = require('apollo-boost');

const QUERY_COMMIT = gql`
  query($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      id
      defaultBranchRef {
        target {
          ... on Commit {
            id
            history(first: 100, after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                author {
                  user {
                    login
                  }
                }
                additions
                deletions
                changedFiles
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = QUERY_COMMIT;
