import React from "react";
import useRead from "../hooks/useRead";
import useCreate from "../hooks/useCreate";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
import { useParams, useNavigate } from "react-router-dom";

const style = {
  gantt: ``,
  titlebar: {
    container: `w-full mb-8`,
    title: `text-2xl font-bold text-[#172B4D] pl-2`,
    links: `text-[#172B4D] hover:text-[#172B4D]`,
  },
  table: {
    memberImg: `flex justify-start w-auto md:w-1/4 items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
    member: `flex justify-center items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
    head: `flex flex-row justify-between items-center w-full h-16 px-4 border border-[#E4E7EB] mb-2 rounded-md overflow-hidden`,
    body: "border border-[#E4E7EB] rounded-md overflow-hidden ",
    item: `flex flex-row justify-between items-center w-full h-16 px-4 border-b border-[#E4E7EB]`,
    p: `text-[#172B4D] ml-2 text-bold`,
    p2: `hidden lg:flex text-gray-500 w-1/4`,
    p3: `hidden md:flex text-gray-500 w-1/4`,
    button: `text-red-500 px-2 py-2 rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-100`,
  },
};

// SUB TASKS VIEW COMPONENT
function Subtask() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.titlebar.container}>
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100 rounded-sm px-2 y-1"
        >
          Go back
        </button>
        <h2 className={style.titlebar.title}>Subtareas</h2>
      </div>
    </div>
  );
}

export default Subtask;
