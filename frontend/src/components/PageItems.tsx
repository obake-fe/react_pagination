import React, { useEffect, useState } from "react";
import "../styles/dist/tailwind.css";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  pokeData: {
    id: number;
    name: string;
  }[];
  offset: number;
  perPage: number;
};

export const PageItems = ({ pokeData, offset, perPage }: Props) => {
  // 画像のローディングアクション
  const [imageLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [offset]);
  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="flex h-40 m-auto">
      {pokeData.slice(offset, offset + perPage).map((item) => (
        <div key={item.name} className="flex flex-col justify-between w-1/5">
          {imageLoading && (
            <img
              className={classNames(
                imageLoading ? "block w-4 h-4 m-auto" : "hidden"
              )}
              src="https://laughing-cray-9d5255.netlify.app/images/monsterball.png"
              alt=""
            />
          )}
          <img
            className={classNames(
              !imageLoading ? "block w-auto m-auto" : "hidden"
            )}
            src={`https://laughing-cray-9d5255.netlify.app/images/dot_gif/${item.id}.gif`}
            alt=""
            onLoad={imageLoaded}
          />
          <p className="text-center">{`${item.id}：${item.name}`}</p>
        </div>
      ))}
    </div>
  );
};
