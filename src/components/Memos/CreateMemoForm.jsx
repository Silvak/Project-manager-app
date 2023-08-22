import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { TiDeleteOutline } from "react-icons/ti";

import useRead from "../../hooks/useRead";
import useUpdate from "../../hooks/useUpdate";
import useInput from "../../hooks/useInput";
import useMembers from "../../hooks/useMembers";

//styles
import { styleModal } from "../../styles/MemoStyles";

const CreateMemoForm = ({ onClose, members }) => {
  const [projects, setProjects] = useState([]);
  const inputTitle = useInput("", "text");
  const inputMemo = useInput("", "text");
  const inputStart = useInput("", "date");
  const inputEnd = useInput("", "date");

  // members
  const inputMembers = useInput("", "text"); //members input
  const [membersList, setMembersList] = useState([]); //list of members
  const { membersProject, handleAddMember, handleRemoveMember } = useMembers(); //hook members

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

          <div className="flex justify-between gap-1 w-full">
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

export default CreateMemoForm;
