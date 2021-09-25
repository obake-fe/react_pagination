import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { gql, useQuery } from "@apollo/client"; // インポートはこれで完了！

const pokemonQuery = gql`
  query GetPokemon {
      pokemon {
          id
          name
      }
  }
`;

 type Pokemon = {
   id: number;
   name: string
 };

function App() {
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage = 5; // 1ページあたりに表示したいアイテムの数
  // クリック時のfunction
  const handlePageChange = (data: { selected: number }) => {
    const page_number = data.selected; // クリックした部分のページ数
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  };

  const { loading, error, data } = useQuery(pokemonQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // List data as an array of strings
  // const list = data.pokemon.map(
  //   ({ id, name }: Pokemon) => `${id}：${name}`
  // );
  // const InfoList = list.map((item: string) => ({ name: item }));

  return (
    <div className="App">
      <div>
        {data.pokemon.slice(offset, offset + perPage) // 表示したいアイテムをsliceで抽出
          .map((item: Pokemon) => (
            <div>
              <img src={`https://laughing-cray-9d5255.netlify.app/images/dot_gif/${item.id}.gif`} alt="" />
              <p>{`${item.id}：${item.name}`}</p>
            </div>
          ))}
      </div>
      {/* // ページネーションを置きたい箇所に以下のコンポーネントを配置*/}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={Math.ceil(data.pokemon.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName="pagination" // ページネーションであるulに着くクラス名
        // subContainerClassName={'pages pagination'}
        activeClassName="active" // アクティブなページのliに着くクラス名
        previousClassName="pagination__previous" // 「<」のliに着けるクラス名
        nextClassName="pagination__next" // 「>」のliに着けるクラス名
        disabledClassName="pagination__disabled"
      />
    </div>
  );
}

export default App;
