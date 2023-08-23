import React, { useEffect, useState } from "react";
import useRead from "../hooks/useRead";
import { useParams, useNavigate } from "react-router-dom";
import { style } from "../styles/MemoStyles";
import { styleModal } from "../styles/MemoStyles";
import Loading from "../components/Loading";
import ShowSubTask from "../components/Subtask/ShowSubTask";

//icons
import { AiTwotoneStar } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { RiBookmarkFill } from "react-icons/ri";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
//
import Modal from "../components/Modal";
import ShowMemo from "../components/Memos/ShowMemo";
import CreateSubTask from "../components/Subtask/CreateSubTask";

const CustomButton = ({ onClick }) => (
  <button onClick={onClick} className={style.table.button}>
    <BiMessageSquareAdd />
  </button>
);

function Subtask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectId, index] = id.split(".");
  const [project, setProject] = useState(null);

  const data = useRead("projects");

  useEffect(() => {
    if (data) {
      const specificProject = data.find((p) => p.id === projectId);
      setProject(specificProject);
    }
  }, [data, projectId]);

  const memos =
    project && project.memos && project.memos.list
      ? project.memos.list[parseInt(index)]
      : {};
  const arrMembers = memos && memos.members ? memos.members : [];

  if (!project || !project.memos || !project.memos.list) {
    return <Loading />;
  }
  return (
    <div>
      <div className={style.titlebar.container}>
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100 rounded-sm pr-2 y-1 flex items-center justify-start"
        >
          <div className="text-[14px]">
            <IoIosArrowBack />
          </div>
          <div className="text-[14px]">Go back</div>
        </button>
        <h2 className={style.titlebar.title}>Subtareas</h2>
      </div>

      {/* Titulo proyecto */}
      <div className="flex justify-between items-center gap-3 mb-3 border border-gray-300 p-2 sm:p-4 rounded-md">
        <div className="flex items-center gap-3 w-full">
          <p className="bg-green-400 text-white p-1 rounded-sm flex justify-center items-center text-sm ">
            <RiBookmarkFill />
          </p>

          {/*  <p className="hidden sm:flex bg-blue-400 text-white p-1 rounded-md h-min">
                <AiTwotoneStar />
              </p> */}
          <h3 className={`text-[1em] sm:text-lg font-semibold text-[#172B4D]`}>
            {project.name}
          </h3>
          {/* <p>
                  project:{members.projectId} index:{members.index}
                </p> */}
        </div>
      </div>

      {/* Subtareas */}
      <article className="flex flex-col border border-gray-300 rounded-md">
        <div className="flex flex-col p-2 sm:p-4 ">
          {/* Titulo proyecto */}
          <div className="flex justify-between items-center gap-3 rounded-md mb-6">
            <div className="flex items-center gap-3 w-[70%]">
              <p className="hidden sm:flex bg-blue-400 text-white p-1 rounded-md h-min">
                <AiTwotoneStar />
              </p>
              <h3 className={`text-[1em] font-semibold  text-[#172B4D]`}>
                {memos.name}
              </h3>
            </div>
            <div className="w-[30%] flex justify-end">
              <p className="bg-gray-100 px-2 py-2 rounded-sm text-sm ">TASK</p>
            </div>
          </div>

          {/* state */}
          <div className=" flex items-center mb-4">
            <p className="mr-2">Estado: </p>
            <p className="flex  w-[30%]">
              <span
                className={`${
                  memos.state === "Finalizado"
                    ? "bg-[#d9f0dd]"
                    : "bg-orange-200"
                }  px-2 sm:px-3 py-1 rounded-sm`}
              >
                {memos.state != "Seleccionar" ? memos.state : "Por hacer"}
              </span>
            </p>
          </div>

          {/* description */}
          <div className="mb-4">
            <p className="mr-2">Estado: </p>
            <p id="desc" className={`mt-1 text-sm px-2`}>
              {memos.data}
            </p>
          </div>

          {/* members */}
          <div className="flex gap-2 flex-wrap mb-6">
            <p className="mr-2 w-full">Miembros: </p>
            {arrMembers.map((member, i) => (
              <div key={i} className="py-1 px-3 border border-gray-300">
                {member}
              </div>
            ))}
          </div>

          {/* dates */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 ">
              <p>Inicio: </p>
              <p className={`px-2 py-1 bg-gray-100`}>{memos.start}</p>
            </div>

            <div className="flex items-center gap-3 ">
              <p>Fin: </p>
              <p className={`px-2 py-1 bg-gray-100`}>{memos.end}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-300 h-[68px] px-2 sm:px-4">
          <p>Crear subtarea</p>
          <Modal
            btnActive={true}
            buttonComponent={CustomButton}
            contentComponent={CreateSubTask}
            members={id}
          />
        </div>

        {/* subtask   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}
        <div className="w-full bg-gray-100">
          {memos.subTasks?.length == 0 ? (
            <div className="h-[48px] px-4 flex justify-center items-center text-sm text-gray-400">
              No se encontraron proyectos
            </div>
          ) : (
            <>
              <div className="flex items-center justify-end w-full">
                <ShowSubTask
                  memos={memos.subTasks}
                  projectId={project.id}
                  taskIndex={index}
                  open={open}
                />
              </div>
            </>
          )}
        </div>
      </article>
    </div>
  );
}

export default Subtask;
