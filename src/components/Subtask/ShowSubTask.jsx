import { useState, useEffect } from "react";
import Modal from "../Modal";
import useUpdate from "../../hooks/useUpdate";
import ShowMemoButton from "./ShowSubtaskButton";
import ShowSubtaskDetail from "./ShowSubtaskDetail";
import { useNavigate } from "react-router-dom";

// hooks
import useRead from "../../hooks/useRead";
import useDelete from "../../hooks/useDelete";

// Icons
import { AiTwotoneStar } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";

const Title = ({ element }) => {
  const name =
    element.name.length > 26 ? `${element.name.slice(0, 26)}...` : element.name;
  return (
    <div className="flex justify-start items-center gap-3  w-full col-span-3  sm:col-span-2">
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
          contentComponent={ShowSubtaskDetail}
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
};

const ShowMemoItem = ({
  element,
  index,
  projectId,
  deleteSubtask,
  taskIndex,
}) => {
  let data = {
    projectId: projectId,
    index: index,
    taskIndex: taskIndex,
    name: element.name,
    data: element.data,
    members: element.members,
    state: element.state,
    start: element.start,
    end: element.end,
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar esta subtarea?")) {
      deleteSubtask(index);
    }
  };

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

const ShowSubTask = ({ memos, projectId, taskIndex }) => {
  const [project, setProject] = useState(null);
  const data = useRead("projects");

  useEffect(() => {
    if (data) {
      const specificProject = data.find((p) => p.id === projectId);
      setProject(specificProject);
    }
  }, [data, projectId]);

  const deleteSubtask = (subTaskIndex) => {
    // Accede al memo específico
    const memo = project.memos.list[taskIndex];
    if (!memo) return;

    // Copia la lista de sub-tareas para evitar mutaciones directas
    const updatedSubtasks = [...memo.subTasks];
    // Elimina la sub-tarea específica
    updatedSubtasks.splice(subTaskIndex, 1);
    // Actualiza las sub-tareas del memo
    memo.subTasks = updatedSubtasks;

    // Actualiza el proyecto con el memo modificado
    const updatedMemos = [...project.memos.list];
    updatedMemos[taskIndex] = memo; // Aquí es donde estaba el error

    try {
      useUpdate("projects", projectId, { memos: { list: updatedMemos } });
    } catch (error) {
      console.log(error);
    }
  };

  if (memos === undefined || !project) return null;
  return (
    <div className="bg-gray-100 w-full">
      {memos?.map((element, index) => (
        <ShowMemoItem
          element={element}
          index={index}
          key={index}
          projectId={projectId}
          taskIndex={taskIndex}
          deleteSubtask={deleteSubtask}
        />
      ))}
    </div>
  );
};

export default ShowSubTask;
