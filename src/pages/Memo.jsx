import React, { useState, useEffect } from "react";
import useRead from "../hooks/useRead";
import useUpdate from "../hooks/useUpdate";
import useInput from "../hooks/useInput";
import Modal from "../components/Modal";

import { RiBookmarkFill } from "react-icons/ri";
import { BiMessageSquareAdd } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { v4 as uuid } from "uuid";

//
import ShowMemo from "../components/Memos/ShowMemo";

const style = {
  gantt: ``,
  titlebar: {
    container: `w-full mb-8`,
    title: `text-2xl font-bold text-[#172B4D]`,
    links: `text-[#172B4D] hover:text-[#172B4D]`,
  },
  table: {
    memberImg: `flex justify-start w-auto md:w-1/4 items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
    member: `flex justify-center items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
    head: `flex flex-row justify-between items-center w-full h-16 px-4 border border-[#E4E7EB] mb-2 rounded-md overflow-hidden`,
    body: "border border-[#E4E7EB] rounded-md overflow-hidden ",
    item: `grid grid-cols-2 items-center w-full px-4 border-y border-[#E4E7EB] py-2`,
    p: `text-[#172B4D] ml-2 text-bold`,
    p2: `hidden lg:flex text-gray-500 w-1/4`,
    p3: `hidden md:flex text-gray-500 w-1/4`,
    button: `text-blue-400 px-2 py-2 rounded-md hover:bg-blue-500 hover:text-white ease-in-out duration-100 `,
    buttondelete: `text-red-500 px-2 py-2  rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-100`,
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
    buttonbox: `flex items-center justify-end gap-2 `,
    button: `bg-blue-700 hover:bg-blue-600 text-white  h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
    buttonclose: `hover:bg-gray-200 h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
  },
};

//CUSTOM MODAL COMPONENTS
const CustomButton = ({ onClick }) => (
  <button onClick={onClick} className={style.table.button}>
    <BiMessageSquareAdd />
  </button>
);

const CustomForm = ({ onClose, members }) => {
  const [projects, setProjects] = useState([]);
  const inputTitle = useInput("", "text");
  const inputMemo = useInput("", "text");
  const inputStart = useInput("", "date");
  const inputEnd = useInput("", "date");

  //members
  const inputMembers = useInput("", "text");
  const [membersProject, setMembersProject] = useState([]);
  const [membersList, setMembersList] = useState([]);

  const handleAddMember = (member) => {
    //comprobar si el nombre no esta en el array
    let findMember = membersProject.find((item) => item === member);
    if (findMember == undefined && member !== "") {
      setMembersProject([...membersProject, member]);
    }
  };

  const handleRemoveMember = (member, index) => {
    setMembersProject(membersProject.filter((item) => item !== member));
  };

  const data = useRead("projects");
  const dataMembers = useRead("members");

  useEffect(() => {
    setProjects(data);
    setMembersList(dataMembers);
  }, [data, dataMembers]);

  //CREATE PROJECTS
  const createMemo = (e, id) => {
    e.preventDefault();
    const memosList = projects.find((element) => element.id === id).memos;
    const payload = {
      id: uuid(),
      name: inputTitle.value,
      data: inputMemo.value,
      state: "Por hacer",
      members: membersProject || [],
      start: inputStart.value,
      end: inputEnd.value,
    };
    useUpdate("projects", id, {
      memos: {
        list: [...memosList.list, payload],
      },
    });
    onClose();
  };

  return (
    <div className={styleModal.container}>
      <form
        onSubmit={(e) => createMemo(e, members)}
        className={styleModal.form.container}
      >
        <h3 className={styleModal.form.title}>Crear tarea</h3>

        <label htmlFor="name" className={styleModal.form.label}>
          Titulo
        </label>
        <input
          id="name"
          required
          className={styleModal.form.input}
          value={inputTitle.value}
          onChange={inputTitle.onChange}
          type="text"
          placeholder="p. ej.: Reunión"
        />

        <label htmlFor="email" className={styleModal.form.label}>
          Descripción
        </label>
        <input
          id="text"
          required
          className={styleModal.form.input}
          value={inputMemo.value}
          onChange={inputMemo.onChange}
          type="text"
          placeholder="p. ej.: Discusión de la reunión"
        />

        {/* members <<<<<<<<<<<<< */}
        <div className="w-full ">
          <label htmlFor="members" className={styleModal.form.label}>
            Agregar Miembros
          </label>

          <div className="flex justify-between gap-1  w-ful">
            <select
              id="members"
              value={inputMembers.value}
              onChange={inputMembers.onChange}
              className={styleModal.form.select}
            >
              <option id="members" key={"default"}>
                Seleciona a un miembro
              </option>
              {membersList.map((member, index) => (
                <option id="members" key={index} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleAddMember(inputMembers.value)}
              className="text-white bg-blue-700 hover:bg-blue-600 h-[40px] w-[40px] rounded-sm"
            >
              +
            </button>
          </div>

          <div className="flex h-[60px] gap-2 w-full bg-gray-100 rounded-sm  p-2 overflow-x-scroll">
            {membersProject.length > 0 ? (
              <>
                {membersProject.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 bg-white px-2 py-1"
                  >
                    <p>{member}</p>
                    <button
                      type="button"
                      className=" text-white bg-red-700 hover:bg-red-600  rounded-full"
                      onClick={() => handleRemoveMember(member, index)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-sm text-gray-500">
                  No hay miembros asignados
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <div>
            <label htmlFor="dateStart" className={styleModal.form.label}>
              Inicio
            </label>
            <input
              id="dateStart"
              required
              className={styleModal.form.input}
              type="date"
              value={inputStart.value}
              onChange={inputStart.onChange}
              max={inputEnd.value}
            />
          </div>
          <div>
            <label htmlFor="dateEnd" className={styleModal.form.label}>
              Fin
            </label>
            <input
              id="dateEnd"
              required
              className={styleModal.form.input}
              type="date"
              value={inputEnd.value}
              onChange={inputEnd.onChange}
              min={inputStart.value}
            />
          </div>
        </div>

        <div className={styleModal.form.buttonbox}>
          <button onClick={onClose} className={styleModal.form.buttonclose}>
            Cerrar
          </button>
          <button type="submit" className={styleModal.form.button}>
            <span></span>
            <span>Crear</span>
          </button>
        </div>
      </form>
    </div>
  );
};

//
const Memo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const data = useRead("projects");

  //open items
  const [open, setOpen] = useState({});
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
                  <div className="flex items-center justify-end w-full gap-2">
                    <Modal
                      btnActive={true}
                      buttonComponent={CustomButton}
                      contentComponent={CustomForm}
                      members={project.id}
                    />

                    <button
                      onClick={() => handleOpen(index)}
                      className={
                        "flex justify-center items-center text-blue-400 h-[32px] w-[32px] rounded-md hover:bg-blue-500 hover:text-white ease-in-out duration-100"
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
