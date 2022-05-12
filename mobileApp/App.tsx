import { StyleSheet, Text, View, Blink } from "react-native";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NamesList from "./components/NamesList";
import { BACKEND_URL } from "@env";

const client = new ApolloClient({
  uri: BACKEND_URL,

  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Names List</Text>
        <NamesList />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
