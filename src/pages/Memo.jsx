import React, { useState, useEffect } from "react";
import useRead from "../hooks/useRead";
import useUpdate from "../hooks/useUpdate";
import useInput from "../hooks/useInput";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

import { RiBookmarkFill } from "react-icons/ri";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiTwotoneStar } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { v4 as uuid } from "uuid";

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
        <h3 className={styleModal.form.title}>Crear memo</h3>

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

const ShowMemoButton = ({ onClick }) => {
  return (
    <button
      id="details"
      onClick={onClick}
      className="p-2 hover:bg-gray-500 hover:text-white duration-200 ease-out rounded-md"
    >
      <RiEyeLine />
    </button>
  );
};

{
  /* DETAIL <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
}
const ShowMemoDetail = ({ onClose, members }) => {
  const [project, setProject] = useState(null);
  const inputState = useInput("", "state");

  const handleState = () => {
    // update state
    if (project) {
      let data = project.memos.list;
      data[members.index].state = inputState.value;
      useUpdate("projects", project.id, { memos: { list: data } });
    }
  };

  let data = useRead("projects");
  useEffect(() => {
    if (data && members) {
      let fitlered = data.filter((project) => project.id === members.projectId);
      setProject(fitlered[0]);
    }
  }, [data, members]);

  useEffect(() => {
    handleState();
  }, [inputState.value, setProject]);

  return (
    <div className={styleModal.container}>
      <div className={styleModal.form.container}>
        {project ? (
          <>
            {" "}
            <div className="flex justify-start items-center gap-3 mb-6">
              <p className="flex bg-blue-400 text-white p-1 rounded-md">
                <AiTwotoneStar />
              </p>
              <h3 className={`text-xl font-bold text-[#172B4D] `}>
                {members.name}
              </h3>
            </div>
            <div>
              <label htmlFor="desc" className={styleModal.form.label}>
                {" "}
                Descripción:
              </label>
              <p id="desc" className={`mt-1 mb-4`}>
                {members.data}
              </p>
            </div>
            <div>
              <label htmlFor="state" className={styleModal.form.label}>
                Estado
              </label>
              <select
                id="state"
                required
                className={styleModal.form.select}
                value={inputState.value}
                onChange={inputState.onChange}
              >
                <option>Selecciona un estado</option>
                <option>Por hacer</option>
                <option>Finalizado</option>
              </select>
            </div>
            {/* members */}
            <div>
              <label htmlFor="state" className={styleModal.form.label}>
                Miembros
              </label>
              <div className="flex h-[60px] gap-2 w-full bg-gray-100 rounded-sm  p-2 overflow-x-scroll mb-2">
                {members.members != undefined > 0 ? (
                  <>
                    {members.members.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 bg-white px-2 py-1"
                      >
                        <p>{member}</p>
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
            <div className="flex justify-between my-4">
              <div className="flex items-center gap-3 ">
                <p>Inicio: </p>
                <p className={`px-2 py-1 bg-gray-100`}> {members.start}</p>
              </div>

              <div className="flex items-center gap-3 ">
                <p>Fin: </p>
                <p className={`px-2 py-1 bg-gray-100`}> {members.end}</p>
              </div>
            </div>
            <div className={styleModal.form.buttonbox}>
              <button
                t
                onClick={onClose}
                className={styleModal.form.buttonclose}
              >
                Cerrar
              </button>
            </div>
          </>
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
};

const ShowMemoItem = ({ element, index, projectId, deleteMemo }) => {
  let data = {
    projectId: projectId,
    index: index,
    name: element.name,
    data: element.data,
    members: element.members,
    state: element.state,
    start: element.start,
    end: element.end,
  };

  return (
    <div
      className="text-sm grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 items-center h-[68px] border-b border-gray-300 px-4"
      key={index}
    >
      {/* Title */}
      <div className="flex justify-start items-center gap-3 w-1/3 whitespace-nowrap  ">
        <p className="flex bg-blue-400 text-white p-1 rounded-md">
          <AiTwotoneStar />
        </p>
        {element.name.length > 10
          ? `${element.name.slice(0, 10)}...`
          : element.name}
      </div>

      {/* Descripción */}
      <p className="w-[60%] whitespace-nowrap text-sm hidden xl:flex">
        {element.data.length > 20
          ? `${element.data.slice(0, 20)}...`
          : element.data}
      </p>

      {/* Miembros */}
      <div className="hidden md:flex h-full items-center w-full gap-2  overflow-x-scroll">
        {data.members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between border bg-white border-gray-400 rounded-sm px-2 py-1"
          >
            <p className=" whitespace-nowrap">{member}</p>
          </div>
        ))}
      </div>

      {/* Fechas */}
      <div className="hidden xl:flex items-center gap-1">
        <p className=" whitespace-nowrap py-1 px-2 border border-gray-400 rounded-sm">
          <span>{data.start}</span>{" "}
        </p>
        <p>{"~"}</p>
        <p className=" whitespace-nowrap py-1 px-2 border border-gray-400 rounded-sm">
          <span>{data.end}</span>{" "}
        </p>
      </div>

      {/* Estado */}
      <div className=" flex justify-end">
        {element.state !== "Por hacer" ? (
          <p className=" lg:flex bg-[#D9F0DD] px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
            {element.state}
          </p>
        ) : (
          <p className=" lg:flex  bg-orange-200 px-2 py-1 rounded-sm whitespace-nowrap test-gray-600">
            {element.state}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 bg-gray-100 justify-end">
        <div>
          <Modal
            btnActive={true}
            buttonComponent={ShowMemoButton}
            contentComponent={ShowMemoDetail}
            members={data}
          />
        </div>

        <button
          onClick={() => deleteMemo(projectId, index)}
          className={style.table.buttondelete}
        >
          <span>
            <RiDeleteBin7Line />
          </span>
        </button>
      </div>
    </div>
  );
};

const ShowMemo = ({ memos, projectId }) => {
  const deleteMemo = (id, itemIndex) => {
    const newList = memos.list.filter((element, index) => index !== itemIndex);
    try {
      useUpdate("projects", id, { memos: { list: newList } });
    } catch (error) {
      console.log(error);
    }
  };

  if (memos.list.length === 0) return null;
  return (
    <div className="bg-gray-100 w-full">
      {memos.list.map((element, index) => (
        <ShowMemoItem
          element={element}
          index={index}
          key={index}
          projectId={projectId}
          deleteMemo={deleteMemo}
        />
      ))}
    </div>
  );
};

const Memo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const data = useRead("projects");

  useEffect(() => {
    const filteredProjects = data.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProjects(filteredProjects);
  }, [data, searchTerm]);

  /* 
  if (projects.length === 0 && !data[0]) {
    return <Loading />;
  } 
  */
  return (
    <div>
      <div className={style.titlebar.container}>
        <a href={style.titlebar.links}>Proyectos</a>
        <h2 className={style.titlebar.title}>Memorándum</h2>
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
            {" "}
            No se encontraron proyectos
          </div>
        ) : (
          <>
            {projects.map((project, index) => (
              <div className="flex flex-wrap" key={index}>
                <div className={style.table.item}>
                  <div className="flex justify-start items-center md:w-1/4 gap-2 whitespace-nowrap">
                    <p className="bg-green-400 text-white p-1 rounded-sm flex justify-center items-center text-sm ">
                      <RiBookmarkFill />
                    </p>

                    {project.name.length > 20
                      ? `${project.name.slice(0, 20)}...`
                      : project.name}
                  </div>

                  <div className="flex items-center justify-end w-full gap-8">
                    <p className="">
                      <span
                        className={`${
                          project.state === "Finalizado"
                            ? "bg-[#d9f0dd]"
                            : "bg-gray-100"
                        }  px-3 py-1 rounded-sm`}
                      >
                        {project.state}
                      </span>
                    </p>

                    <Modal
                      btnActive={true}
                      buttonComponent={CustomButton}
                      contentComponent={CustomForm}
                      members={project.id}
                    />
                  </div>
                </div>
                <ShowMemo memos={project.memos} projectId={project.id} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Memo;
