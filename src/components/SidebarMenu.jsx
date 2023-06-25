import React from "react";
import { Link, useLocation } from "react-router-dom";
//icons
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { AiFillTag } from "react-icons/ai";
import { RiBookmarkFill } from "react-icons/ri";
import { MdAutoAwesomeMotion } from "react-icons/md";

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

function SidebarMenu() {
  const location = useLocation();

  return (
    <div className={style.container}>
      <ul>
        <div className={style.projectDesc.container}>
          <div>
            <img
              className={style.projectDesc.img}
              src="https://avatars.githubusercontent.com/u/77449523?s=200&v=4"
            />
          </div>
          <div>
            <h3 className={style.projectDesc.title}>Apps</h3>
            <p className={style.projectDesc.subtitle}>Proyecto de software</p>
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
