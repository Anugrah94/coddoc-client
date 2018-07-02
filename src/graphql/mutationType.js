import gql from 'graphql-tag';

export const ADD_NEW_USER = gql `
  mutation register($full_name: String!, $username: String!, $email: String!, $password: String!) {
    register(full_name: $full_name, username: $username, email: $email, password: $password) {
      user {
        _id
        full_name
        username
        histories {
          _id
        }
      }
      token
    }
  }
`

export const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        full_name
        username
        histories {
          _id
        }
      }
      token
    }
  }
`

export const ADD_HISTORY = gql `
  mutation saveHistory($name: String, $code: String, $token: String) {
    saveHistory(name: $name, code: $code, token: $token) {
      _id
    }
  }
`