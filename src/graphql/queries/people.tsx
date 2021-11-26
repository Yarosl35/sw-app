import gql from "graphql-tag";

export const GET_ALL_PEOPLE = gql`
  query GetAllPeople($cursor: String) {
    allPeople(first: 10, after: $cursor) {
      people { id name homeworld { name }, gender, birthYear, species { name }}
    }
  }
`;