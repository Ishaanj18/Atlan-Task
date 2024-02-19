import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FilterTag } from "./FilterTag";
import React from "react";
import { useNavigate } from "react-router-dom";


export function Model(props) {
  const [likes, setLikes] = useState(props.likes);
  const [isLiked , setisLiked] = useState(false);
  const navigate = useNavigate();
  async function dislikeModel(Id) {
    const item = {
      id: Id,
    };
    const response = await fetch("http://localhost:3000/explore/dislike", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    if(result.success){
      alert("disliked");
      setLikes(likes - 1);
      setisLiked(false);
    }
    else
    {
      alert("unable to update the server")
    }
    
  }
    
  async function likeModel(Id) {
    const item = {
       id : Id
    }
    console.log(item);
    const response = await fetch("http://localhost:3000/explore/like", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    if (result.success) {
      alert("liked");
      setLikes(likes + 1);
      setisLiked(true);
    } 
    else {
      alert("unable to update the server");
    }
  }

 
  return (
    <div
      onClick={() => navigate(`/Models/${props.id}`)} className=" flex flex-col border-2  border-zinc-300 transform translate-y-0 scale-100 translate-z-0 rounded-lg px-8 py-8">
      <div>
        <p className="font-bold">{props.name}</p>
        <span className="font-semibold">{props.category}</span>
      </div>
      <p>{props.description}</p>
      <div>
        {isLiked ? (
          <button
            onClick={() => {
              dislikeModel(props.id);
            }}
          >
            <FaHeart className="text-red-700 size-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              likeModel(props.id);
            }}
          >
            <CiHeart className="text-red-700 size-4" />
          </button>
        )}

        <span>{likes}</span>
      </div>
    </div>
  );
}
