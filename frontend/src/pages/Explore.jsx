import React from "react";
import { useState, useEffect } from "react";
import { FilterTag } from "../components/FilterTag";
import { Model } from "../components/model";

export function Explore() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTag, setFilterTag] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/explore").then((res) => res.json()),
      fetch("http://localhost:3000/explore/tags").then((res) => {
        return res.json();
      }),
    ]).then(([jsonData, tag]) => {
      setData(jsonData);
      setFilteredData(jsonData);
      setFilterTag(tag);
    });
  }, []);

  const handleTagClick = (tagText) => {
    // Filter data based on selected tag
    const filtered = data.filter((item) => item.category === tagText);
    setFilteredData(filtered); // Update filteredData state
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center mb-4">
        {filterTag.map((item) => (
          <FilterTag key={item.id} {...item} onClick={handleTagClick} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((item) => (
          <Model key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
