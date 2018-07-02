import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.coddoc.net/graphql'
});

export default client;