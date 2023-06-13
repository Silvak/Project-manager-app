import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Epic from "./Epic";
//hooks
import useCreate from "../hooks/useCreate";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
import useRead from "../hooks/useRead";
import { projectModel } from "../models/models";

const style = {
  bg: `h-screen w-screen bg-gray-100`, //<< "w-screen" can cause a problem in the general width of the application
  form: `flex items-center gap-2`,
  button: `hover:bg-gray-200 rounded-sm px-6 py-1 flex items-center gap-1`,
  container: `bg-white w-[400px] p-4 rounded-md shadow-md`,
  tasks: `mt-4 space-y-2 `,
};

function CreateTask() {
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");

  //CREATE PROJECTS
  const createProject = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("No puedes crear un epic vacio");
      return;
    } else {
      useCreate("projects", projectModel(input));
      setInput("");
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

  return (
    <>
      {/* Create Epic Compoenent  */}
      <div className={style.container}>
        <h3>Insert a new task</h3>

        <form onSubmit={createProject} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Que debes hacer?"
          />
          <button className={style.button}>
            <span>
              <AiOutlinePlus />
            </span>
            <span>Crear Epic</span>
          </button>
        </form>

        <ul className={style.tasks}>
          {projects.map((project, index) => (
            <Epic
              key={index}
              project={project}
              toggleComplete={toggleComplete}
              deleteProject={deleteProject}
            />
          ))}
        </ul>

        {data.length > 0 && (
          <p className={style.count}>You have {projects.length} todos</p>
        )}
      </div>
    </>
  );
}

export default CreateTask;
