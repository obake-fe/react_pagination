import React, { useState, ChangeEvent } from "react";
import { gql, useQuery } from "@apollo/client";
import "../styles/dist/tailwind.css";
import Pagination from "@material-ui/lab/Pagination";
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

export const MuiPagination = () => {
  // ページネーション設定
  const [offset, setOffset] = useState(0); // 何番目のアイテムから表示するか
  const [page, setPage] = useState(1); // ページ番号
  const perPage = 5; // 1ページあたりに表示したいアイテムの数
  // クリック時のfunction
  const handlePageChange = (event: ChangeEvent<unknown>, index: number) => {
    setPage(index);
    const page_number = index - 1;
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  };

  // クエリーデータ
  const queryData = useQuery(pokemonQuery);
  const { loading, error, data } = queryData;

  const pokeData =
    data !== undefined
      ? data.pokemon.filter((item: QueryData) => item.id > 151)
      : data;

  const count =
    pokeData !== undefined ? Math.trunc(pokeData.length / perPage) : 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <section className="mt-16">
      <h2>
        <a
          href="https://mui.com/components/pagination/"
          target="_blank"
          rel="noreferrer"
        >
          ②Material-UI Pagination
        </a>
      </h2>
      <PageItems {...{ pokeData, offset, perPage }} />
      {/* // ページネーションを置きたい箇所に以下のコンポーネントを配置*/}
      <div className="w-full m-auto text-center">
        <Pagination
          count={count} // 総ページ数
          color="primary" // ページネーションの色
          onChange={handlePageChange} // 変更されたときに走る関数。第2引数にページ番号が入る
          page={page} // 現在のページ番号
          classes={{ root: "inline-block" }}
        />
      </div>
    </section>
  );
};
