import React, { useEffect, useState } from "react";

//
import useInput from "../../hooks/useInput";
import useRead from "../../hooks/useRead";
import useUpdate from "../../hooks/useUpdate";

//icons
import { AiTwotoneStar } from "react-icons/ai";

const styleModal = {
  container: `fixed grid place-content-center top-0 left-0 w-full h-full bg-[#6A89C3]/40 z-[100]`,
  button: `w-[36px] h-[36px] rounded-full bg-gray-200`,
  icon: `flex justify-center items-center text-gray-500 text-xl`,
  form: {
    container: `flex flex-col gap-2 bg-white rounded-md p-5 w-[340px] md:w-[480px] md:p-8 h-min shadow-lg border border-gray-40`,
    input:
      "w-full bg-gray-100 h-[40px] rounded-sm px-2 py-1  focus:outline-none focus:ring-1 focus:ring-blue-400 mb-2",
    select: `bg-gray-100 h-[40px] w-full rounded-sm px-2 py-1  focus:outline-none focus:ring-1 focus:ring-blue-400 mb-4`,
    title: `text-xl font-bold text-[#172B4D] mb-6`,
    label: `text-[#172B4D] hover:text-[#172B4D] text-sm m-0`,
    buttonbox: `flex items-center justify-end gap-2 `,
    button: `bg-blue-700 hover:bg-blue-600 text-white  h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
    buttonclose: `hover:bg-gray-200 h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
  },
};

//
const ShowMemoDetail = ({ onClose, members }) => {
  const [project, setProject] = useState(null);
  const inputState = useInput("Por hacer", "state");

  const handleState = () => {
    // update state
    if (project) {
      let data = project.memos.list;
      data[members.index].state = inputState.value;
      useUpdate("projects", project.id, { memos: { list: data } });
    }
  };

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

  return (
    <div className={styleModal.container}>
      <div className={styleModal.form.container}>
        {project ? (
          <>
            {" "}
            <div className="flex justify-between items-center gap-3 mb-6">
              <div className="flex items-center gap-3">
                <p className="flex bg-blue-400 text-white p-1 rounded-md">
                  <AiTwotoneStar />
                </p>
                <h3 className={`text-xl font-bold text-[#172B4D] `}>
                  {members.name.length > 12
                    ? members.name.slice(0, 12) + "..."
                    : members.name}
                </h3>
              </div>
              <p className="">
                <span
                  className={`${
                    members.state === "Finalizado"
                      ? "bg-[#d9f0dd]"
                      : "bg-orange-200"
                  }  px-3 py-1 rounded-sm`}
                >
                  {members.state}
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
                <option>Por hacer</option>
                <option>Finalizado</option>
              </select>
            </div>
            {/* members */}
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
                        className="flex items-center justify-between gap-2 bg-white px-2 py-1"
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
            </div>
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

export default ShowMemoDetail;
