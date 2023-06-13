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

import CreateTask from "./components/CreateTask";
import CreateRol from "./components/CreateRol";

const style = {
  container: `flex absolute h-screen w-full bg-white `, // CHANGED << "w-screen" cause a problem in the general width of the application
  sidebar: {
    container: `flex h-full bg-[#FAFBFC] border-r border-gray-300 shadow-md shadow-inner relative duration-300 ease-in-out `,
    content: `flex flex-col h-full w-full bg-red-200`,
    button: ` absolute top-20 -right-[20px] w-[40px] h-[40px] hover:bg-red-300 flex items-center justify-center rounded-full`,
    icon: `h-[32px] w-[32px] text-[#172B4D] bg-white rounded-full shadow-md flex items-center justify-center`,
  },
  content: {
    main: `flex flex-col h-full w-full bg-red-200 p-10 overflow-y-scroll`,
  },
  gantt: `w-[20px] h-72 bg-blue-200 overflow-hidden`,
  titlebar: {
    title: `text-2xl font-bold text-[#172B4D]`,
    links: `text-[#172B4D] hover:text-[#172B4D]`,
  },
};

function App() {
  const [projects, setProjects] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState("1/6");

  //
  const data = useRead("projects");
  useEffect(() => {
    setProjects(data);
  }, [data.length]);

  const handleSidebarWidthChange = () => {
    setSidebarWidth(sidebarWidth === "1/50" ? "1/5" : "1/50");
  };

  return (
    <div className={style.container}>
      {/* Create Epic Compoenent  */}
      <aside
        className={style.sidebar.container}
        style={{ width: `calc(${sidebarWidth} * 100%)` }}
      >
        <div className={style.sidebar.container}></div>
        <button
          onClick={handleSidebarWidthChange}
          className={style.sidebar.button}
        >
          <div className={style.sidebar.icon}>{">"}</div>
        </button>
      </aside>

      <article className={style.content.main}>
        <div className={style.titlebar}>
          <a href={style.links}>Proyectos</a>
          <h2 className={style.title}>Hoja de ruta</h2>
        </div>

        <div className="flex">
          <CreateTask />
          <CreateRol />
        </div>

        {/* List of Epics */}
        <div className={style.gantt}>
          {projects.length > 0 ? <GanttChart /> : <div>No hay tareas</div>}
        </div>
      </article>
    </div>
  );
}

export default App;
