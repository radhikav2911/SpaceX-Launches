import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client"
import Routing from './components/Routing/index';


const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: " https://api.spacex.land/graphql/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Routing />
    </ApolloProvider>
  );
}

export default App;
