import gql from 'graphql-tag';

export const READ_USER = gql `
  query user($token: String) {
    user(token: $token) {
      _id
      full_name
      username
      histories {
        _id
      }
    }
  }
`