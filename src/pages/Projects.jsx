import { useState, useEffect } from "react";
import GanttChart from "../components/GanttChart";
import useRead from "../hooks/useRead";
import CreateTask from "../components/CreateTask";
import CreateRol from "../components/CreateRol";

const style = {
  gantt: ``,
  titlebar: {
    container: `w-full mb-8`,
    title: `text-2xl font-bold text-[#172B4D]`,
    links: `text-[#172B4D] hover:text-[#172B4D]`,
  },
};

function Projects() {
  const [projects, setProjects] = useState([]);

  //
  const data = useRead("projects");
  useEffect(() => {
    setProjects(data);
  }, [data.length, data]);

  return (
    <div>
      <div className={style.titlebar.container}>
        <a href={style.titlebar.links}>Proyectos</a>
        <h2 className={style.titlebar.title}>Hoja de ruta</h2>
      </div>

      <div className="flex justify-start flex-col-reverse md:flex-row gap-4 mb-4">
        <CreateTask />
        <CreateRol />
      </div>

      {/* List of Epics */}
      <div className={style.gantt}>
        {projects.length > 0 ? <GanttChart /> : <div>No hay tareas</div>}
      </div>
    </div>
  );
}

export default Projects;
