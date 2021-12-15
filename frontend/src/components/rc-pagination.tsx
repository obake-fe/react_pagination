import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Pagination from "rc-pagination";
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

export const RCPagination = () => {
  // ページネーション設定
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const perPage = 5; // 1ページあたりに表示したいアイテムの数

  const [current, setCurrent] = useState(1);

  // クリック時のfunction
  const handlePageChange = (page: number) => {
    setCurrent(page);
    setOffset((page - 1) * perPage);
  };

  const itemRender = (
    current: number,
    type: string,
    element: React.ReactNode
  ) => {
    if (type === "page") {
      return <button className="page-link">{current}</button>;
    }
    if (type === "prev") {
      return (
        <button className="page-link" type="button">
          &lt;
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="page-link" type="button">
          &gt;
        </button>
      );
    }
    if (type === "jump-prev" || type === "jump-next") {
      return <div className="page-item pointer-events-none">...</div>;
    }
    return element;
  };

  // クエリーデータ
  const { loading, error, data } = useQuery(pokemonQuery);

  const pokeData =
    data !== undefined
      ? data.pokemon.filter((item: QueryData) => item.id > 151 && item.id < 252)
      : data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <section className="mt-16">
      <h2>
        <a
          href="https://www.npmjs.com/package/rc-pagination"
          target="_blank"
          rel="noreferrer"
        >
          ②rc-pagination
        </a>
      </h2>
      <PageItems {...{ pokeData, offset, perPage }} />
      {/* // ページネーションを置きたい箇所に以下のコンポーネントを配置*/}
      <div className="w-full m-auto">
        <Pagination
          pageSize={5}
          showTitle={false}
          current={current}
          onChange={handlePageChange}
          total={100}
          className="pagination justify-center"
          itemRender={itemRender}
          style={{
            backgroundColor: "transparent"
          }}
        />
      </div>
    </section>
  );
};
