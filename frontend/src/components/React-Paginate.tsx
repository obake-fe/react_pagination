import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dist/tailwind.css";
import { PageItems } from "./PageItems";

const pokemonQuery = gql`
  query GetPokemon {
    pokemon {
      id
      name
    }
  }
`;

type QueryData = {
  id: number;
  name: string;
};

export const ReactPaginateCore = () => {
  // ページネーション設定
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const [page, setPage] = useState(0);
  const perPage = 5; // 1ページあたりに表示したいアイテムの数
  // クリック時のfunction
  const handlePageChange = (data: { selected: number }) => {
    const page_number = data.selected; // クリックした部分のページ数
    setPage(page_number);
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  };

  // クエリーデータ
  const { loading, error, data } = useQuery(pokemonQuery);

  const pokeData =
    data !== undefined
      ? data.pokemon.filter((item: QueryData) => item.id < 152)
      : [];

  const [pageCount, setPageCountState] = useState(
    Math.ceil(pokeData.length / perPage)
  );
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(0);

  const increment = () => {
    setPageCountState(pageCount + 1);
  };

  const decrement = () => {
    if (pageCount === 1) return;
    setPageCountState(pageCount - 1);
  };

  useEffect(() => {
    // ページ数が9以上のとき「...」が出現し、幅を固定する
    if (
      (pageCount < 10 && page <= 4) ||
      (pageCount > 9 && page >= pageCount - 4)
    ) {
      setPageRangeDisplayed(7);
    } else if (pageCount < 10 && page > 4) {
      setPageRangeDisplayed(8);
    } else if (page <= 3) {
      setPageRangeDisplayed(6);
    } else {
      setPageRangeDisplayed(5);
    }
  }, [page, pageCount]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <section className="mt-16">
      <h2>
        <a
          href="https://www.npmjs.com/package/react-paginate"
          target="_blank"
          rel="noreferrer"
        >
          ①react-paginate
        </a>
      </h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <PageItems {...{ pokeData, offset, perPage }} />
      {/* // ページネーションを置きたい箇所に以下のコンポーネントを配置*/}
      <div className="w-full m-auto">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount} // 全部のページ数。端数の場合も考えて切り上げに。
          marginPagesDisplayed={1} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
          pageRangeDisplayed={pageRangeDisplayed} // アクティブなページを基準にして、そこからいくつページ数を表示するか
          onPageChange={handlePageChange} // クリック時のfunction
          containerClassName="pagination justify-center" // ページネーションであるulに着くクラス名
          pageClassName="page-item w-10 text-center"
          pageLinkClassName="page-link"
          activeClassName="active" // アクティブなページのliに着くクラス名
          previousClassName="page-item" // 「<」のliに着けるクラス名
          previousLinkClassName="page-link"
          nextClassName="page-item" // 「>」のliに着けるクラス名
          nextLinkClassName="page-link"
          disabledClassName="disabled"
          breakClassName="page-item w-10 text-center"
          breakLinkClassName="page-item pointer-events-none"
        />
      </div>
    </section>
  );
};
