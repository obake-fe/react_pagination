import React, {useState} from 'react';
import ReactPaginate from 'react-paginate'; // インポートはこれで完了！

function App() {
  const [ offset, setOffset ] = useState(0); // 何番目のアイテムから表示するか
  const perPage: number = 5; // 1ページあたりに表示したいアイテムの数
  // クリック時のfunction
  const handlePageChange = (data: any) => {
    let page_number = data['selected']; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number*perPage); // offsetを変更し、表示開始するアイテムの番号を変更
  }
  // List data as an array of strings
  const list = Array.from({ length: 100 }, (v, i) => i);
  const InfoList = list.map((item) => {
    return {name: item}
  })

  return (
    <div className="App">
      <div>
        {InfoList
        .slice(offset, offset + perPage) // 表示したいアイテムをsliceで抽出
        .map((el: any)=>{
          return (
            <div>
              <p>{el.name}</p>
            </div>
          )
        })}
      </div>
      {/*// ページネーションを置きたい箇所に以下のコンポーネントを配置*/}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={Math.ceil(InfoList.length/perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
        marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
        pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
        onPageChange={handlePageChange} // クリック時のfunction
        containerClassName={'pagination'} // ページネーションであるulに着くクラス名
        // subContainerClassName={'pages pagination'}
        activeClassName={'active'} // アクティブなページのliに着くクラス名
        previousClassName={'pagination__previous'} // 「<」のliに着けるクラス名
        nextClassName={'pagination__next'} // 「>」のliに着けるクラス名
        disabledClassName={'pagination__disabled'} // 使用不可の「<,>」に着くクラス名
      />
    </div>
  );
}

export default App;
