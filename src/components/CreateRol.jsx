import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { FaUserPlus } from "react-icons/fa";
//hooks
import useInput from "../hooks/useInput";
import useCreate from "../hooks/useCreate";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
import useRead from "../hooks/useRead";
import { membersModel } from "../models/models";

const style = {
  container: `flex justify-betwent items-center w-full`,
  tasks: `mt-4 space-y-2 `,
  member: `flex justify-center items-center w-[36px]  h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer`,
  listmember: `grid grid-cols-6 gap-1 items-center`,
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
    button: `bg-blue-700 hover:bg-blue-600 text-white h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
    buttonclose: `hover:bg-gray-200 h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
  },
};

//CUSTOM MODAL COMPONENTS
const CustomButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styleModal.button}>
      <span className={styleModal.icon}>
        <FaUserPlus />
      </span>
    </button>
  );
};

const CustomForm = ({ onClose }) => {
  const inputName = useInput("", "text");
  const inputRol = useInput("", "text");
  const inputEmail = useInput("", "text");

  //CREATE PROJECTS
  const createProject = async (e) => {
    e.preventDefault(e);
    if (
      inputName.value === "" ||
      inputRol.value === "" ||
      inputEmail.value === ""
    ) {
      alert("No puedes crear un epic vacio");
      return;
    } else {
      useCreate(
        "members",
        membersModel(inputName.value, inputRol.value, inputEmail.value)
      );
      inputName.reset();
      inputRol.reset();
      inputEmail.reset();
      onClose();
    }
  };

  //UPDATE PROJECTS
  const toggleComplete = (project) => {
    useUpdate("members", project.id, { completed: !project.completed });
  };

  //DELETE PROJECTS
  const deleteProject = async (id) => {
    useDelete("members", id);
  };

  return (
    <div className={styleModal.container}>
      <form onSubmit={createProject} className={styleModal.form.container}>
        <h3 className={styleModal.form.title}>Añadir personas</h3>

        <label htmlFor="name" className={styleModal.form.label}>
          Nombre
        </label>
        <input
          id="name"
          required
          className={styleModal.form.input}
          value={inputName.value}
          onChange={inputName.onChange}
          type="text"
          placeholder="p. ej.: María"
        />

        <label htmlFor="email" className={styleModal.form.label}>
          Email
        </label>
        <input
          id="email"
          required
          className={styleModal.form.input}
          value={inputEmail.value}
          onChange={inputEmail.onChange}
          type="email"
          placeholder="p. ej.: nombre@empresa.com"
        />

        <label htmlFor="rol" className={styleModal.form.label}>
          Rol
        </label>
        <select
          id="rol"
          required
          className={styleModal.form.select}
          value={inputRol.value}
          onChange={inputRol.onChange}
        >
          <option>Selecciona un rol</option>
          <option>Scrum Master</option>
          <option>Product Owner</option>
          <option>Developer</option>
        </select>

        <div className={styleModal.form.buttonbox}>
          <button onClick={onClose} className={styleModal.form.buttonclose}>
            Cerrar
          </button>
          <button type="submit" className={styleModal.form.button}>
            <span></span>
            <span>Añadir</span>
          </button>
        </div>
      </form>
    </div>
  );
};

//MAIN COMPONENT
function CreateRol() {
  const [membersList, setMembersList] = useState([]);

  // Leer los datos de los miembros
  const data = useRead("members");

  useEffect(() => {
    if (data) {
      const updatedMembersList = data.map((member) => ({
        ...member,
        selected: false,
      }));
      setMembersList(updatedMembersList);
    } else {
      setMembersList([]);
    }
  }, [data]);

  const handleMouseEnter = (index) => {
    setMembersList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].selected = true;
      return updatedList;
    });
  };

  const handleMouseLeave = (index) => {
    setMembersList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].selected = false;
      return updatedList;
    });
  };

  return (
    <div className={style.container}>
      <ul className={style.listmember}>
        {membersList.slice(0, 6).map((member, index) => (
          <div
            style={{
              background: member.colorbg,
              color: member.colorText,
              zIndex: member.selected ? 30 : 7 - index,
            }}
            className={style.member}
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {member.name.toUpperCase()[0]}
          </div>
        ))}
      </ul>
      <div className={style.container}>
        <Modal buttonComponent={CustomButton} contentComponent={CustomForm} />
      </div>
    </div>
  );
}

export default CreateRol;
