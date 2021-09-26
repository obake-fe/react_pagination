import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from "@apollo/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

// clientオブジェクトの作成
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

// データ取得 → consoleに表示してみる
client
  .query({
    query: gql`
      query GetPokemon {
        pokemon {
            id
            name
        }
      }
    `
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
