const fs = require("fs");

const pokeJson = JSON.parse(fs.readFileSync("./pokedata.json", "utf8"));

const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// スキーマを定義する
const typeDefs = gql`
  type Pokemon {
    id: ID
    name: String
  }

  type Query {
    pokemon: [Pokemon]
  }
`;

// クエリで取得するデータ
const pokeData = pokeJson
  .filter((json) => json.id < 387)
  .map((filteredData) => ({
    id: filteredData.id,
    name: filteredData.name.japanese
  }));

// クエリ発行時の処理を指定する
const resolvers = {
  Query: {
    pokemon: () => pokeData
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// サーバーを起動する
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
