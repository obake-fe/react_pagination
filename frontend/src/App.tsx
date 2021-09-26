import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { gql, useQuery } from "@apollo/client";
import './styles/dist/tailwind.css';
import classNames from "classnames";

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

  // 画像のローディングアクション
  const [imageLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [offset]);
  const imageLoaded = () => {
    setLoading(false);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="w-full mx-auto">
      <div className="flex h-32 w-1080 m-auto">
        {data.pokemon.slice(offset, offset + perPage)
          .map((item: Pokemon) => (
            <div key={item.name} className="flex flex-col justify-between w-1/5">
              {imageLoading &&
                <img
                  className={classNames(imageLoading ? "block w-4 h-4 m-auto" : "hidden")}
                  src="https://laughing-cray-9d5255.netlify.app/images/monsterball.png"
                  alt="" />}
              <img
                className={classNames(!imageLoading ? "block w-auto m-auto" : "hidden")}
                src={`https://laughing-cray-9d5255.netlify.app/images/dot_gif/${item.id}.gif`}
                alt=""
                onLoad={imageLoaded} />
              <p className="text-center">{`${item.id}：${item.name}`}</p>
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
