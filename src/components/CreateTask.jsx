import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
//hooks
import useInput from "../hooks/useInput";
import useCreate from "../hooks/useCreate";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
import useRead from "../hooks/useRead";
import { projectModel, memoModel } from "../models/models";

//
const style = {
  container: `w-full`,
  form: {
    container: `flex items-center gap-2`,
    button: `hover:bg-gray-200 h-[40px]  w-full md:w-[200px] pl-3 pr-2 py-1 rounded-sm border border=gray-300 flex items-center gap-1`,
    input: `border border-gray-300 h-[40px] w-full md:w-[200px] rounded-sm px-2 py-1  focus:outline-none focus:ring-1 focus:ring-blue-400 z-20`,
    inputExit: `fixed w-full h-full top-0 left-0 z-10`,
    createBtn: `flex items-center md:hidden hover:bg-gray-200 text-gray-800  active:bg-blue-500 active:text-white px-3 h-[40px] rounded-sm cursor-pointer z-30 border border-gray-300`,
  },
  tasks: `mt-4 space-y-2 `,
};

//
function CreateTask() {
  const [projects, setProjects] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const inputProps = useInput("", "text");
  const uid = localStorage.getItem("uid");

  //CREATE PROJECTS
  const createProject = async (e) => {
    e.preventDefault(e);
    if (inputProps.value === "") {
      alert("No puedes crear un epic vacio");
      return;
    } else {
      useCreate("projects", projectModel(uid, inputProps.value));
      useCreate(
        "history",
        memoModel(uid, `${inputProps.value}`, "Add Project")
      );

      inputProps.reset();
      setShowInput(false);
    }
  };

  //READ PROJECTS
  const data = useRead("projects");
  useEffect(() => {
    if (data) {
      setProjects(data);
      localStorage.setItem("projects", JSON.stringify(data));
    } else {
      setProjects([]);
      localStorage.setItem("projects", JSON.stringify([]));
    }
  }, [data]);

  //UPDATE PROJECTS
  const toggleComplete = (project) => {
    useUpdate("projects", project.id, { completed: !project.completed });
  };

  //DELETE PROJECTS
  const deleteProject = async (id) => {
    useDelete("projects", id);
  };

  //HANDLE SHOW INPUT
  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <div className={style.container}>
        <form onSubmit={createProject} className={style.form.container}>
          {showInput ? (
            <>
              <input
                className={style.form.input}
                value={inputProps.value}
                onChange={inputProps.onChange}
                type="text"
                placeholder="¿Que se debe hacer?"
              />
              <button type="submit" className={style.form.createBtn}>
                Crear
              </button>

              <div
                onClick={handleShowInput}
                className={style.form.inputExit}
              ></div>
            </>
          ) : (
            <button
              type="button"
              onClick={handleShowInput}
              className={style.form.button}
            >
              <span>
                <AiOutlinePlus />
              </span>
              <span>Crear Proyecto</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
