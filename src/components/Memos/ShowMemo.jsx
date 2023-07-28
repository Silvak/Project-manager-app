import { useState } from "react";
import Modal from "../Modal";
import useUpdate from "../../hooks/useUpdate";
import ShowMemoButton from "./ShowMemoButton";
import ShowMemoDetail from "./ShowMemoDetail";

// Icons
import { AiTwotoneStar } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";

const style = {
  gantt: ``,
  titlebar: {
    container: `w-full mb-8`,
    title: `text-2xl font-bold text-[#172B4D]`,
    links: `text-[#172B4D] hover:text-[#172B4D]`,
  },
  table: {
    memberImg: `flex justify-start w-auto md:w-1/4 items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
    member: `flex justify-center items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
    head: `flex flex-row justify-between items-center w-full h-16 px-4 border border-[#E4E7EB] mb-2 rounded-md overflow-hidden`,
    body: "border border-[#E4E7EB] rounded-md overflow-hidden ",
    item: `grid grid-cols-2 items-center w-full px-4 border-y border-[#E4E7EB] py-2`,
    p: `text-[#172B4D] ml-2 text-bold`,
    p2: `hidden lg:flex text-gray-500 w-1/4`,
    p3: `hidden md:flex text-gray-500 w-1/4`,
    button: `text-blue-400 px-2 py-2 rounded-md hover:bg-blue-500 hover:text-white ease-in-out duration-100 `,
    buttondelete: `text-red-500 px-2 py-2  rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-100`,
  },
};

const ShowMemoItem = ({ element, index, projectId, deleteMemo }) => {
  let data = {
    projectId: projectId,
    index: index,
    name: element.name,
    data: element.data,
    members: element.members,
    state: element.state,
    start: element.start,
    end: element.end,
  };

  return (
    <div
      className="text-sm grid grid-cols-4 md:grid-cols-7 xl:grid-cols-12 gap-4 items-center h-[78px] border-b border-gray-300 px-4"
      key={index}
    >
      {/* Title */}
      <div className="flex justify-start items-center gap-3 w-1/3 whitespace-nowrap col-span-3  sm:col-span-2">
        <p className="flex bg-blue-400 text-white p-1 rounded-md">
          <AiTwotoneStar />
        </p>
        {element.name.length > 26
          ? `${element.name.slice(0, 26)}...`
          : element.name}
      </div>

      {/* Descripción */}
      <p className="w-[60%] whitespace-nowrap text-sm hidden xl:flex col-span-3">
        {element.data.length > 40
          ? `${element.data.slice(0, 40)}...`
          : element.data}
      </p>

      {/* Miembros */}
      <div className="hidden md:flex h-full items-center w-full gap-2  overflow-x-scroll col-span-3">
        {data.members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between border bg-white border-gray-400 rounded-sm px-2 py-1"
          >
            <p className=" whitespace-nowrap">{member}</p>
          </div>
        ))}
      </div>

      {/* Fechas */}
      <div className="hidden xl:flex items-center justify-end gap-1 col-span-2">
        <p className=" whitespace-nowrap py-1 px-2 border border-gray-400 rounded-sm ">
          <span>{data.start}</span>{" "}
        </p>
        <p>{"~"}</p>
        <p className=" whitespace-nowrap py-1 px-2 border border-gray-400 rounded-sm">
          <span>{data.end}</span>{" "}
        </p>
      </div>

      {/* Estado */}
      <div className="hidden sm:flex justify-end col-span-1">
        {element.state !== "Por hacer" ? (
          <p className=" lg:flex bg-[#D9F0DD] px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
            {element.state}
          </p>
        ) : (
          <p className=" lg:flex  bg-orange-200 px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
            {element.state}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 bg-gray-100 justify-end">
        <div>
          <Modal
            btnActive={true}
            buttonComponent={ShowMemoButton}
            contentComponent={ShowMemoDetail}
            members={data}
          />
        </div>

        <button
          onClick={() => deleteMemo(projectId, index)}
          className={style.table.buttondelete}
        >
          <span>
            <RiDeleteBin7Line />
          </span>
        </button>
      </div>
    </div>
  );
};

const ShowMemo = ({ memos, projectId, open }) => {
  const deleteMemo = (id, itemIndex) => {
    const newList = memos.list.filter((element, index) => index !== itemIndex);
    try {
      useUpdate("projects", id, { memos: { list: newList } });
    } catch (error) {
      console.log(error);
    }
  };

  if (memos.list.length === 0) return null;
  return (
    <div className="bg-gray-100 w-full">
      {memos.list.map((element, index) => (
        <ShowMemoItem
          element={element}
          index={index}
          key={index}
          projectId={projectId}
          deleteMemo={deleteMemo}
        />
      ))}
    </div>
  );
};

export default ShowMemo;
