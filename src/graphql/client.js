import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://hooks-music-share.herokuapp.com/v1/graphql",
});

export default client;
