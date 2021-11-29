import gql from "graphql-tag";

export const GET_ALL_PEOPLE = gql`
  query GetAllPeople($after: String, $first: Int, $before: String, $last: Int) {
    allPeople(first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        cursor
        node {
          id name homeworld { name }, gender, birthYear, species { name }
        }
      }
    }
  }
`;
