import React from "react";
import "../styles/dist/tailwind.css";
import { ReactPaginateCore } from "./React-Paginate";
import { MuiPagination } from "./MuiPagination";
import { RCPagination } from "./rc-pagination";

function App() {
  return (
    <div className="w-1080 mx-auto">
      <h1 className="mt-4">React Pagination</h1>
      <ReactPaginateCore />
      <RCPagination />
      <MuiPagination />
    </div>
  );
}

export default App;
