import { useState } from "react";
import Modal from "../Modal";
import useUpdate from "../../hooks/useUpdate";
import ShowMemoButton from "./ShowMemoButton";
import ShowMemoDetail from "./ShowMemoDetail";
import { useNavigate } from "react-router-dom";

// Icons
import { AiTwotoneStar } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";

const Title = ({ element }) => {
  const name =
    element.name.length > 26 ? `${element.name.slice(0, 26)}...` : element.name;
  return (
    <div className="flex justify-start items-center gap-3 w-1/3 w-full col-span-3  sm:col-span-2">
      <p className="flex bg-blue-400 text-white p-1 rounded-md">
        <AiTwotoneStar />
      </p>
      <p className="text-[12px] font-semibold">{name}</p>
    </div>
  );
};

const Description = ({ element }) => {
  const data =
    element.data.length > 58 ? `${element.data.slice(0, 54)}...` : element.data;
  return (
    <div className="text-[12px] hidden xl:flex col-span-2">
      <p>{data}</p>
    </div>
  );
};

const Members = ({ data }) => (
  <div className="hidden md:flex h-full items-center w-full gap-2  overflow-x-scroll col-span-3 border-x px-2">
    {data.members.map((member, index) => (
      <div
        key={index}
        className="flex items-center justify-between border bg-white border-gray-300/50 rounded-sm px-2 py-1"
      >
        <p className=" whitespace-nowrap text-[12px]">{member}</p>
      </div>
    ))}
  </div>
);

const Dates = ({ data }) => (
  <div className="hidden xl:flex items-center justify-center gap-1 col-span-2">
    <p className=" whitespace-nowrap text-[12px] py-1 px-2 border border-gray-300 rounded-sm ">
      <span>{data.start}</span>{" "}
    </p>
    <p>{"-"}</p>
    <p className=" whitespace-nowrap text-[12px] py-1 px-2 border border-gray-300 rounded-sm">
      <span>{data.end}</span>{" "}
    </p>
  </div>
);

const State = ({ element }) => (
  <div className="hidden sm:flex justify-center w-full col-span-1">
    {element.state !== "Por hacer" ? (
      <p className=" lg:flex text-[12px] bg-[#D9F0DD] px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
        {element.state}
      </p>
    ) : (
      <p className=" lg:flex  text-[12px] bg-orange-200 px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
        {element.state}
      </p>
    )}
  </div>
);

const Buttons = ({ handleDelete, data }) => {
  let navigate = useNavigate();
  return (
    <div className="flex gap-2  justify-end col-span-2">
      <div>
        <Modal
          btnActive={true}
          buttonComponent={ShowMemoButton}
          contentComponent={ShowMemoDetail}
          members={data}
        />
      </div>

      <button
        onClick={() => navigate(`/task/${data.projectId}/${data.index}`)}
        className="p-2 hover:bg-gray-500 hover:text-white duration-200 ease-out rounded-md"
      >
        <span>
          <GoTasklist />
        </span>
      </button>

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

  const handleDelete = () => deleteMemo(projectId, index);

  return (
    <div
      className="text-sm grid grid-cols-5 md:grid-cols-8 xl:grid-cols-12 gap-4 items-center h-[78px] px-4  border  border-l-4  border-t-gray-100 border-r-gray-100  border-b-gray-300  border-l-gray-100  hover:border-blue-400  duration-25 ease-in-out"
      key={index}
      //onClick={() => alert(`proyecto: ${data.projectId} || index: ${index} `)}
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
