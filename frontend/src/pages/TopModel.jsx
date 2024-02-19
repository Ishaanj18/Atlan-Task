import React, { useState, useEffect } from "react";
import { Model } from "../components/model";

export function TopModel() {
  const [topLikedModel, setTopLikedModel] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/topModel")
      .then(async (res) => {
        const response = await res.json();
        setTopLikedModel(response);
      })
      .catch((error) => console.error("Error fetching top models: ", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center m-4">
        <h1 className="text-4xl font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-2">
          Top 30 Models
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {topLikedModel.map((item) => (
          <Model key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
