import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Epic from "./components/Epic";
import GanttChart from "./components/GanttChart";
//hooks
import useCreate from "./hooks/useCreate";
import useUpdate from "./hooks/useUpdate";
import useDelete from "./hooks/useDelete";
import useRead from "./hooks/useRead";
import { projectModel } from "./models/models";

const style = {
  bg: `h-screen w-screen bg-gray-100`, //<< "w-screen" can cause a problem in the general width of the application
  form: `flex items-center gap-2`,
  button: `hover:bg-gray-200 rounded-sm px-6 py-1 flex items-center gap-1`,
};

function App() {
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
  const data = useRead();
  useEffect(() => {
    if (data) {
      setProjects(data);
      localStorage.setItem("projects", JSON.stringify(data));
    }
  }, [data]);

  //UPDATE PROJECTS
  const toggleComplete = async (project) => {
    useUpdate("projects", project.id, { completed: !project.completed });
  };

  //DELETE PROJECTS
  const deleteProject = async (id) => {
    useDelete("projects", id);
  };

  return (
    <div className={style.bg}>
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

        <ul>
          {projects.map((project, index) => (
            <Epic
              key={index}
              project={project}
              toggleComplete={toggleComplete}
              deleteProject={deleteProject}
            />
          ))}
        </ul>

        {projects.length > 0 && (
          <p className={style.count}>You have {projects.length} todos</p>
        )}
      </div>

      <div>
        <GanttChart />{" "}
      </div>
    </div>
  );
}

export default App;
