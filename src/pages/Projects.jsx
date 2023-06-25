import { useState, useEffect } from "react";
import GanttChart from "../components/GanttChart";
import useRead from "../hooks/useRead";
import CreateTask from "../components/CreateTask";
import CreateRol from "../components/CreateRol";
import Loading from "../components/Loading";

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

  //loading
  if (data === undefined) {
    return <Loading />;
  }
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
        {projects.length > 0 ? (
          <GanttChart />
        ) : (
          <div className="border border-[#E4E7EB] rounded-md overflow-hidden mt-8">
            <div className="h-[48px] px-4 flex justify-center items-center text-sm text-gray-400">
              No hay proyectos
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
