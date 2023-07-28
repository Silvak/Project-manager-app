import { useState } from "react";
import Modal from "../Modal";
import useUpdate from "../../hooks/useUpdate";
import ShowMemoButton from "./ShowMemoButton";
import ShowMemoDetail from "./ShowMemoDetail";

// Icons
import { AiTwotoneStar } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";

const Title = ({ element }) => {
  const name =
    element.name.length > 26 ? `${element.name.slice(0, 26)}...` : element.name;
  return (
    <div className="flex justify-start items-center gap-3 w-1/3 whitespace-nowrap col-span-3  sm:col-span-2">
      <p className="flex bg-blue-400 text-white p-1 rounded-md">
        <AiTwotoneStar />
      </p>
      {name}
    </div>
  );
};

const Description = ({ element }) => {
  const data =
    element.data.length > 40 ? `${element.data.slice(0, 40)}...` : element.data;
  return (
    <p className="w-[60%] whitespace-nowrap text-sm hidden xl:flex col-span-3">
      {data}
    </p>
  );
};

const Members = ({ data }) => (
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
);

const Dates = ({ data }) => (
  <div className="hidden xl:flex items-center justify-end gap-1 col-span-2">
    <p className=" whitespace-nowrap py-1 px-2 border border-gray-400 rounded-sm ">
      <span>{data.start}</span>{" "}
    </p>
    <p>{"~"}</p>
    <p className=" whitespace-nowrap py-1 px-2 border border-gray-400 rounded-sm">
      <span>{data.end}</span>{" "}
    </p>
  </div>
);

const State = ({ element }) => (
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
);

const Buttons = ({ handleDelete, data }) => (
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
      onClick={handleDelete}
      className="text-red-500 px-2 py-2  rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-100"
    >
      <span>
        <RiDeleteBin7Line />
      </span>
    </button>
  </div>
);

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

  const handleDelete = () => deleteMemo(projectId, index);

  return (
    <div
      className="text-sm grid grid-cols-4 md:grid-cols-7 xl:grid-cols-12 gap-4 items-center h-[78px] border-b border-gray-300 px-4"
      key={index}
    >
      <Title element={element} />
      <Description element={element} />
      <Members data={data} />
      <Dates data={data} />
      <State element={element} />
      <Buttons handleDelete={handleDelete} data={data} />
    </div>
  );
};

const ShowMemo = ({ memos, projectId }) => {
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
