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
    item: `flex justify-between items-center w-full  px-4 border-y border-[#E4E7EB] py-2`,
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

  const data = useRead("projects");
  useEffect(() => {
    setProjects(data);
  }, [data]);

  //CREATE PROJECTS
  const createMemo = (e, id) => {
    e.preventDefault();
    const memosList = projects.find((element) => element.id === id).memos;
    const payload = {
      name: inputTitle.value,
      data: inputMemo.value,
    };
    useUpdate("projects", id, {
      memos: {
        list: [
          ...memosList.list,
          { name: payload.name, data: payload.data, id: uuid() },
        ],
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

const ShowMemoDetail = ({ onClose, members }) => {
  return (
    <div className={styleModal.container}>
      <div className={styleModal.form.container}>
        <div className="flex justify-start items-center gap-3 mb-6">
          <p className="flex bg-blue-400 text-white p-1 rounded-md">
            <AiTwotoneStar />
          </p>
          <h3 className={`text-xl font-bold text-[#172B4D] `}>
            {members.name}
          </h3>
        </div>
        <p className={`mb-8`}>{members.data}</p>

        <div className={styleModal.form.buttonbox}>
          <button t onClick={onClose} className={styleModal.form.buttonclose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const ShowMemoItem = ({ element, index, projecId, deleteMemo }) => {
  let data = {
    name: element.name,
    data: element.data,
  };
  return (
    <div
      className="text-sm flex justify-between items-center h-[36px] "
      key={index}
    >
      <div className="flex justify-start items-center gap-3 w-1/3 whitespace-nowrap  ">
        <p className="flex bg-blue-400 text-white p-1 rounded-md">
          <AiTwotoneStar />
        </p>
        {element.name.length > 10
          ? `${element.name.slice(0, 10)}...`
          : element.name}
      </div>
      <p className="w-[60%] whitespace-nowrap text-sm hidden lg:flex">
        {element.data.length > 30
          ? `${element.data.slice(0, 30)}...`
          : element.data}
      </p>

      <div className="flex gap-2 bg-gray-100">
        <div>
          <Modal
            btnActive={true}
            buttonComponent={ShowMemoButton}
            contentComponent={ShowMemoDetail}
            members={data}
          />
        </div>

        <button
          onClick={() => deleteMemo(projecId, index)}
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

const ShowMemo = ({ memos, projecId }) => {
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
    <div className="bg-gray-100 w-full pl-10 py-3 pr-4">
      {memos.list.map((element, index) => (
        <ShowMemoItem
          element={element}
          index={index}
          key={index}
          projecId={projecId}
          deleteMemo={deleteMemo}
        />
      ))}
    </div>
  );
};

const Memo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const data = useRead("projects") || [];

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
                  <p className={style.table.p2}>
                    <span
                      className={`${
                        project.state === "Finalizado"
                          ? "bg-[#d9f0dd]"
                          : "bg-gray-100"
                      }  px-3 py-1 rounded-full`}
                    >
                      {project.state}
                    </span>
                  </p>

                  <div className="flex justify-end w-1/3">
                    <Modal
                      btnActive={true}
                      buttonComponent={CustomButton}
                      contentComponent={CustomForm}
                      members={project.id}
                    />
                  </div>
                </div>
                <ShowMemo memos={project.memos} projecId={project.id} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Memo;
