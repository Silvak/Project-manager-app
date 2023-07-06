import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
//icons
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { AiFillTag } from "react-icons/ai";
import { RiBookmarkFill } from "react-icons/ri";
import { MdAutoAwesomeMotion } from "react-icons/md";

//hooks
import useInput from "../hooks/useInput";
import useRead from "../hooks/useRead";
import useUpdate from "../hooks/useUpdate";
import useCreate from "../hooks/useCreate";

const style = {
  container: `flex flex-col justify-between h-full  overflow-hidden`, // CHANGED << "w-screen" cause a problem in the general width of the application
  item: `h-[40px] flex justify-start items-center rounded-sm text-[#172B4D] whitespace-nowrap hover:bg-[#E6EFFC] pl-2`,
  current: {
    backgroundColor: "#E6EFFC",
    color: "#0052CC",
  },
  projectDesc: {
    container: `flex  items-center h-[60px] w-[200px] bg-[#FAFBFC] mb-6`,
    img: `h-[34px] w-[34px] rounded-sm mx-2`,
    title: `text-[#172B4D] font-semibold text-lg text-sm`,
    subtitle: `text-[#172B4D] text-sm whitespace-nowrap`,
  },
};

const path = [
  { name: "Hoja de ruta", path: "/", icon: <RiBarChartHorizontalFill /> },
  { name: "Miembros", path: "/members", icon: <HiUsers /> },
  //{ name: "Etiquetas", path: "/tags", icon: <AiFillTag /> },
  { name: "Memo", path: "/memo", icon: <RiBookmarkFill /> },
  { name: "Historial", path: "/history", icon: <MdAutoAwesomeMotion /> },
];

/*
<button onClick={handleOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            )}
          </svg>
        </button>

*/

const TitleModal = ({ open, handleOpen, data }) => {
  const [title, setTitle] = useState("Title");
  let inputName = useInput("", "text");
  let inputDescription = useInput("", "text");

  const handleUpdate = () => {
    useUpdate("projectName", data.id, {
      title: inputName.value,
      desc: inputDescription.value,
    });
    handleOpen();
  };

  return (
    <>
      <div onClick={handleOpen}>
        <img
          className={style.projectDesc.img}
          src="https://avatars.githubusercontent.com/u/77449523?s=200&v=4"
        />
      </div>
      <div className="flex justify-between items-center">
        {open ? (
          <div className="fixed top-0 left-0 grid place-content-center w-full h-full bg-blue-200/60 z-[1010]">
            <div className="flex flex-col gap-4 bg-white min-w-[280px] rounde-md drop-shadow-md p-5">
              <h3>Actualizar Nombre</h3>
              <div>
                <label className="text-sm font-semibold">
                  Nombre del proyecto
                </label>
                <input
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  type="text"
                  value={inputName.value}
                  onChange={inputName.onChange}
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Descripción</label>
                <input
                  className="w-full border border-gray-300 rounded-sm px-2 py-1"
                  type="text"
                  value={inputDescription.value}
                  onChange={inputDescription.onChange}
                />
              </div>

              <div className="flex items-center justify-end gap-4 w-full h-[46px]">
                <button
                  className=" hover:bg-gray-100 px-2 py-1 rounded-sm"
                  onClick={handleOpen}
                >
                  Cerrar
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded-sm text-white"
                  onClick={handleUpdate}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

function SidebarMenu() {
  const [projectName, setProjectName] = useState({});
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleOpen = () => {
    setOpen(!open);
  };

  let data = useRead("projectName");
  useEffect(() => {
    if (data) {
      setProjectName(data[0]);
    }
  }, [data]);

  return (
    <div className={style.container}>
      <ul>
        <div className={style.projectDesc.container}>
          {/* Button modal */}
          <TitleModal open={open} handleOpen={handleOpen} data={projectName} />
          <div>
            <h3 className={style.projectDesc.title}>{projectName.title}</h3>
            <p className={style.projectDesc.subtitle}>{projectName.desc}</p>
          </div>
        </div>

        <h4 className="text-sm font-semibold ml-2 mb-2">PLANIFICAIÓN</h4>

        {path.map((item, index) => (
          <Link to={item.path} key={index}>
            <li
              className={style.item}
              key={item.path}
              style={location.pathname === item.path ? style.current : null}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <div className="hidden md:flex md:text-center text-sm text-gray-400 w-[200px]">
        Estás en un proyecto gestionado por el equipo
      </div>
    </div>
  );
}

export default SidebarMenu;
