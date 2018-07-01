import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://192.168.2.190:3000/graphql'
});

export default client;