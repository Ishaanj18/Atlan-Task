import React from "react"
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export function ModelPage(){
    const [model , setModel] = useState([]);
    const modelId = useParams().modelId;
    const navigate = useNavigate();
    console.log(modelId);
    useEffect( () => {
        fetch(import.meta.env.VITE_API_URL + `Models/${modelId}`).then(
          async function (res) {
            const response = await res.json();
            setModel(response);
          }
        );
    }, [])
   
    function onClickHandler({name}){
      
        navigator.clipboard.writeText(name).then(() => {
            alert(`Model name "${name}" copied to clipboard`);
          })
          .catch((error) => {
            console.error("Error copying to clipboard:", error);
          });
    }
    return (
      <div>
        {model.map((item) => (
          <div>
            <header className="from-gray-50-to-white border-b border-gray-100 bg-gradient-to-t via-white dark:via-gray-950 pt-6 sm:pt-9 ml-3">
              <div className="flex mb-3">
                <p className="text-[30px] font-bold mr-2">{item.name}</p>
                <button
                  className="relative  mr-4 inline-flex cursor-pointer items-center text-sm focus:outline-none mx-0.5 text-gray-600 "
                  title="Copy model name to clipboard"
                  type="button"
                  onClick={() =>
                    onClickHandler({
                      name: item.name,
                    })
                  }
                >
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    focusable="false"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"
                      transform="translate(0)"
                    ></path>
                    <path
                      d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"
                      transform="translate(0)"
                    ></path>
                    <rect fill="none" width="32" height="32"></rect>
                  </svg>{" "}
                </button>
              </div>

              <div className="flex justify-start mb-16">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 p-2 py-1 text-[13px] font-semibold text-gray-900">
                  {item.category}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 p-2 py-1 text-[13px] font-semibold text-gray-900">
                  {item.provider}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 p-2 py-1 text-[13px] font-semibold text-gray-900">
                  Multimodal
                </span>
              </div>
              <div>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={() => navigate(`/Models/${item.id}/Try`)}
                >
                  Try it Out
                </button>
              </div>
            </header>
            <div className=" container flex flex-col ">
              <div>
                <h1 className="text-neutral-900 font-medium text-[23px] mb-8">Model details -</h1>
                <h1 className="text-neutral-900 font-medium text-[20px] mb-4 "> Model Description</h1>
                <p className="mb-4">{item.description}</p>
                <div >
                  <h1 className="text-neutral-900 font-medium text-[20px] mb-4" >Code Example</h1>
                  { <div className="shadow-lg rounded-2xl p-2 bg-slate-100 font-mono">
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {item.codeSnippet}
                    </pre>
                  </div> }
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    );
    
}
