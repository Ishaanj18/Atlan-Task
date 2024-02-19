import React from "react";
import { useParams } from "react-router-dom";
import { useState , useEffect} from "react";
import { Model } from "../components/model";

export function Search(){
    const query = useParams().searchQuery;
    const [searchResults, setSearchResults] = useState([]);
   useEffect(() => {
  if (query) {
    fetch(import.meta.env.VITE_API_URL + `search/${query}`)
      .then(async (res) => {
        if (res.ok) {
          const response = await res.json();
          setSearchResults(response);
        } else {
          setSearchResults([]); // Reset search results
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Reset search results on error
      });
  }
}, [query]);

return (
  <div>
    {searchResults.length === 0 ? (
      <p>No matching model found.</p>
    ) : (
      searchResults.map((item) => (
        <Model key={item.id} {...item} />
      ))
    )}
  </div>
    );
}