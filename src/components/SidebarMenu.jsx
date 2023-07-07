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
import Loading from "./Loading";

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
    buttonbox: `flex items-center justify-end gap-2 mt-8`,
    button: `bg-blue-700 hover:bg-blue-600 text-white h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
    buttonclose: `hover:bg-gray-200 h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
  },
};

const path = [
  { name: "Hoja de ruta", path: "/", icon: <RiBarChartHorizontalFill /> },
  { name: "Miembros", path: "/members", icon: <HiUsers /> },
  //{ name: "Etiquetas", path: "/tags", icon: <AiFillTag /> },
  { name: "Memo", path: "/memo", icon: <RiBookmarkFill /> },
  { name: "Historial", path: "/history", icon: <MdAutoAwesomeMotion /> },
];

// MODAL
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
      <div onClick={handleOpen} className="cursor-pointer">
        <img
          className={style.projectDesc.img}
          src="https://avatars.githubusercontent.com/u/77449523?s=200&v=4"
        />
      </div>
      <div className="flex justify-between items-center">
        {open ? (
          <div className={styleModal.container}>
            <div className={styleModal.form.container}>
              <h3 className={styleModal.form.title}>Actualizar Nombre</h3>
              <div>
                <label className={styleModal.form.label}>
                  Nombre del proyecto
                </label>
                <input
                  className={styleModal.form.input}
                  type="text"
                  value={inputName.value}
                  onChange={inputName.onChange}
                />
              </div>
              <div>
                <label className={styleModal.form.label}>Descripción</label>
                <input
                  className={styleModal.form.input}
                  type="text"
                  value={inputDescription.value}
                  onChange={inputDescription.onChange}
                />
              </div>

              <div className={styleModal.form.buttonbox}>
                <button
                  className={styleModal.form.buttonclose}
                  onClick={handleOpen}
                >
                  Cerrar
                </button>
                <button
                  className={styleModal.form.button}
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
          {projectName && (
            <>
              <TitleModal
                open={open}
                handleOpen={handleOpen}
                data={projectName}
              />
              <div>
                <h3 className={style.projectDesc.title}>{projectName.title}</h3>
                <p className={style.projectDesc.subtitle}>{projectName.desc}</p>
              </div>{" "}
            </>
          )}
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
