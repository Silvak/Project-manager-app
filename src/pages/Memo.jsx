import React, { useState, useEffect } from "react";
import { RiBookmarkFill } from "react-icons/ri";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import useRead from "../hooks/useRead";

import Modal from "../components/Modal";
import ShowMemo from "../components/Memos/ShowMemo";
import CreateMemoForm from "../components/Memos/CreateMemoForm";

import { style } from "../styles/MemoStyles";

//CUSTOM MODAL COMPONENTS
const CustomButton = ({ onClick }) => (
  <button onClick={onClick} className={style.table.button}>
    <BiMessageSquareAdd />
  </button>
);

//
const Memo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const data = useRead("projects");

  // Initialize the open items state from localStorage
  const [open, setOpen] = useState(
    JSON.parse(localStorage.getItem("memoOpenState")) || {}
  );

  // Save the open state to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem("memoOpenState", JSON.stringify(open));
  }, [open]);

  const handleOpen = (index) => {
    setOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const filteredProjects = data.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProjects(filteredProjects);
  }, [data, searchTerm]);

  return (
    <div>
      <div className={style.titlebar.container}>
        <a href={style.titlebar.links}>Proyectos</a>
        <h2 className={style.titlebar.title}>Asignación de tareas</h2>
      </div>

      <div className="my-8">
        <input
          type="text"
          placeholder="Buscar proyecto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-[40px] w-full  md:w-1/3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      <div className={style.table.body}>
        {projects.length == 0 ? (
          <div className="h-[48px] px-4 flex justify-center items-center text-sm text-gray-400">
            No se encontraron proyectos
          </div>
        ) : (
          <>
            {projects.map((project, index) => (
              <div className="flex flex-wrap" key={index}>
                {/* ######## TABLE ######### */}
                <div className="w-full text-sm grid grid-cols-2 gap-4 items-center h-[68px] border-b border-gray-300 px-4">
                  {/* title */}
                  <div className="flex justify-start items-center md:w-1/4 gap-2 whitespace-nowrap">
                    <p className="bg-green-400 text-white p-1 rounded-sm flex justify-center items-center text-sm ">
                      <RiBookmarkFill />
                    </p>

                    <p className="hidden sm:flex">
                      {project.name.length > 40
                        ? `${project.name.slice(0, 40)}...`
                        : project.name}
                    </p>

                    <p className="flex sm:hidden">
                      {project.name.length > 20
                        ? `${project.name.slice(0, 20)}...`
                        : project.name}
                    </p>

                    <div className="ml-4 hidden sm:flex">
                      {project.state !== "Por hacer" ? (
                        <p className=" lg:flex bg-[#D9F0DD] px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
                          {project.state}
                        </p>
                      ) : (
                        <p className="lg:flex  bg-orange-200 px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
                          {project.state}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* button */}
                  <div className="flex items-center justify-end w-full">
                    <Modal
                      btnActive={true}
                      buttonComponent={CustomButton}
                      contentComponent={CreateMemoForm}
                      members={project.id}
                    />

                    <button
                      onClick={() => handleOpen(index)}
                      className={
                        "flex justify-center items-center text-blue-400 ml-1 h-[32px] w-[32px] rounded-md hover:bg-blue-500 hover:text-white ease-in-out duration-100"
                      }
                    >
                      {open[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                  </div>
                </div>
                {open[index] ? (
                  <ShowMemo
                    memos={project.memos}
                    projectId={project.id}
                    open={open}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Memo;
