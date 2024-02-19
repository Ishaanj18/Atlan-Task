import React from "react";
import { useState } from "react";

export  function FilterTag(props) {
  const [isClick , setIsClicked] = useState(false);
  const onClickHandler = () => {
      setIsClicked(!isClick);
      console.log(props);
      props.onClick(props.text);
  }
  return (
    <div className="flex">
      <button
        onClick={onClickHandler}
        className={` whitespace-nowrap rounded-full border border-solid px-2 py-1 m-1 border-zinc-300 hover:border-zinc-900 ${isClick ? "bg-black text-white" : ""}`}
      >
        {props.text}
      </button>
    </div>
  );
}
