import React, { useEffect, useState } from "react";

//
import useInput from "../../hooks/useInput";
import useRead from "../../hooks/useRead";
import useUpdate from "../../hooks/useUpdate";
import useMembers from "../../hooks/useMembers";

//icons
import { AiTwotoneStar } from "react-icons/ai";
import { styleModal } from "../../styles/MemoStyles";
import { TiDeleteOutline } from "react-icons/ti";

//
const ShowSubtaskDetail = ({ onClose, members }) => {
  const [project, setProject] = useState(null);
  const inputState = useInput("Por hacer", "state");

  const handleState = () => {
    // update state
    if (project) {
      // Make a deep copy of data
      const newData = JSON.parse(JSON.stringify(project.memos.list));

      // Assuming members.subTaskIndex provides the index of the specific subtask
      // Modify the copied data for the specific subtask
      newData[members.taskIndex].subTasks[members.index].state =
        inputState.value;

      // Use useUpdate to update
      useUpdate("projects", project.id, { memos: { list: newData } });
    }
  };

  //Logica de proyectos ---------------------------------------------------------
  let data = useRead("projects");
  useEffect(() => {
    if (data && members) {
      let fitlered = data.filter((project) => project.id === members.projectId);
      setProject(fitlered[0]);
    }
  }, [data, members]);

  useEffect(() => {
    handleState();
  }, [inputState.value, setProject]);

  //Logica de miembros ---------------------------------------------------------
  // members
  const inputMembers = useInput("", "text"); //members input
  const [membersList, setMembersList] = useState([]); //list of members
  const { membersProject, handleAddMember, handleRemoveMember } = useMembers(
    members.members
  );

  //members list
  const dataMembers = useRead("members");

  useEffect(() => {
    setMembersList(dataMembers);
  }, [data, dataMembers]);

  //update members list
  useEffect(() => {
    if (project) {
      const newData = JSON.parse(JSON.stringify(project.memos.list));
      newData[members.taskIndex].subTasks[members.index].members =
        membersProject;
      useUpdate("projects", project.id, { memos: { list: newData } });
    }
  }, [membersProject]);

  //Logica de miembros ---------------------------------------------------------
  return (
    <div className={styleModal.container}>
      <div className={styleModal.form.container}>
        {project ? (
          <>
            {" "}
            <div className="flex justify-between items-center gap-3 mb-6">
              <div className="flex items-center gap-3 w-[70%]">
                <p className="hidden sm:flex bg-blue-400 text-white p-1 rounded-md h-min">
                  <AiTwotoneStar />
                </p>
                <h3
                  className={`text-[1.2em] sm:text-lg font-bold text-[#172B4D]`}
                >
                  {members.name.length > 48
                    ? members.name.slice(0, 48) + "..."
                    : members.name}
                </h3>
                {/* <p>
                  project:{members.projectId} index:{members.index}
                </p> */}
              </div>
              <p className="">
                <span
                  className={`${
                    members.state === "Finalizado"
                      ? "bg-[#d9f0dd]"
                      : "bg-orange-200"
                  }  px-2 sm:px-3 py-1 rounded-sm`}
                >
                  {members.state != "Seleccionar" ? members.state : "Por hacer"}
                </span>
              </p>
            </div>
            <div>
              <label htmlFor="desc" className={styleModal.form.label}>
                {" "}
                Descripción:
              </label>
              <p id="desc" className={`mt-1 mb-4`}>
                {members.data}
              </p>
            </div>
            <div>
              <label htmlFor="state" className={styleModal.form.label}>
                Estado
              </label>
              <select
                id="state"
                required
                className={styleModal.form.select}
                value={inputState.value}
                onChange={inputState.onChange}
              >
                <option>Seleccionar</option>
                <option>Por hacer</option>
                <option>Finalizado</option>
              </select>
            </div>
            {/* members */}
            {/*
            <div>
              <label htmlFor="state" className={styleModal.form.label}>
                Miembros
              </label>
              <div className="flex h-[60px] gap-2 w-full bg-gray-100 rounded-sm  p-2 overflow-x-scroll mb-2">
                {members.members != undefined > 0 ? (
                  <>
                    {members.members.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center whitespace-nowrap justify-between gap-2 bg-white px-2 py-1"
                      >
                        <p>{member}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <p className="text-sm text-gray-500">
                      No hay miembros asignados
                    </p>
                  </div>
                )}
              </div>
                </div>*/}
            {/* Members  */}
            <div className="w-full ">
              <label htmlFor="members" className={styleModal.form.label}>
                Agregar Miembros
              </label>

              <div className="flex justify-between gap-1 w-full">
                <select
                  id="members"
                  value={inputMembers.value}
                  onChange={inputMembers.onChange}
                  className={styleModal.form.select}
                >
                  <option id="members" key={"default"}>
                    Seleciona a un miembro
                  </option>
                  {membersList.map((member, index) => (
                    <option id="members" key={index} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleAddMember(inputMembers.value)}
                  className="text-white bg-blue-700 hover:bg-blue-600 h-[40px] w-[40px] rounded-sm"
                >
                  +
                </button>
              </div>

              <div className="flex h-[60px] gap-2 w-full bg-gray-100 rounded-sm  p-2 overflow-x-scroll">
                {membersProject.length > 0 ? (
                  <>
                    {membersProject.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 bg-white px-2 py-1"
                      >
                        <p className=" whitespace-nowrap">{member}</p>
                        <button
                          type="button"
                          className=" text-white bg-red-700 hover:bg-red-600  rounded-full"
                          onClick={() => handleRemoveMember(member, index)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <p className="text-sm text-gray-500">
                      No hay miembros asignados
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* dates */}
            <div className="flex justify-between my-4">
              <div className="flex items-center gap-3 ">
                <p>Inicio: </p>
                <p className={`px-2 py-1 bg-gray-100`}> {members.start}</p>
              </div>

              <div className="flex items-center gap-3 ">
                <p>Fin: </p>
                <p className={`px-2 py-1 bg-gray-100`}> {members.end}</p>
              </div>
            </div>
            {/* subtask */}
            {/*  <div className="flex justify-between my-4">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <h4>Subtareas</h4> <p>Total: 0</p>
                </div>
                <div className="w-full bg-gray-100 rounded-sm min-h-[40px]">
                  <p className={`px-2 py-1 bg-gray-100`}> {members.subtask}</p>
                </div>
              </div>
            </div> */}
            {/* button */}
            <div className={styleModal.form.buttonbox}>
              <button
                t
                onClick={onClose}
                className={styleModal.form.buttonclose}
              >
                Cerrar
              </button>
            </div>
          </>
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
};

export default ShowSubtaskDetail;
