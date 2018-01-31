import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { onError } from "apollo-link-error";
// https://api.graphcms.com/simple/v1/cjb594ki10t2201665g8hf6u8
export default ctx => {
  const httpLink = new HttpLink({
    // https://api.dominique-haas.fr/graphql
    uri: "http://localhost:7700/graphql"
  });

  return {
    link: httpLink,
    cache: new InMemoryCache()
  };
};
