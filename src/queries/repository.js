const { gql } = require('apollo-boost');

const QUERY_REPOSITORY = gql`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      createdAt
      commitComments {
        totalCount
      }
      mentionableUsers {
        totalCount
      }
      pullRequests {
        totalCount
      }
      languages(first: 100) {
        totalSize
        edges {
          node {
            name
          }
          size
        }
      }
    }
  }
`;

module.exports = QUERY_REPOSITORY;
