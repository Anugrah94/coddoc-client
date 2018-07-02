import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://192.168.1.237:3000/graphql'
});

export default client;