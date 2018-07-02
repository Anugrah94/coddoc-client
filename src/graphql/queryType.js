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

export const READ_HISTORY = gql `
  query history($_id: String) {
    history(_id: $_id) {
      _id
      user
      name
      code
    }
  }
`

export const READ_DOC = gql `
  query documentation($syntaxes: [String]) {
    documentation(syntaxes: $syntaxes) {
      doc
      syntax
    }
  }
`