import React from "react";
import { useState, useEffect } from "react";
import { FilterTag } from "../components/FilterTag";
import { Model } from "../components/Model";

export function Explore() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTag, setFilterTag] = useState([]);
  const [clickedTags, setClickedTags] = useState([]);


  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_URL + "explore").then((res) =>
        res.json()
      ),
      fetch(import.meta.env.VITE_API_URL + "explore/tags").then((res) => {
        return res.json();
      }),
    ]).then(([jsonData, tag]) => {
      setData(jsonData);
      setFilteredData(jsonData);
      setFilterTag(tag);
    });
  }, []);

   useEffect(() => {
     
     if (clickedTags.length === 0) {
       setFilteredData(data); 
     } else {
       const newData = data.filter((item) =>
         clickedTags.includes(item.category) && item.category !== "Text Generation"
       );
       setFilteredData(newData);
     }
   }, [data, clickedTags]);

 const handleTagClick = (tagText) => {
   // Toggle clicked tag
   if (clickedTags.includes(tagText)) {
     setClickedTags(clickedTags.filter((tag) => tag !== tagText));
   } else {
     setClickedTags([...clickedTags, tagText]);
   }
 };
  

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center mb-4">
        {filterTag.map((item , index) => (
          <FilterTag key={item.id} {...item} onClick={handleTagClick} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((item, index) => (
          <Model key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
