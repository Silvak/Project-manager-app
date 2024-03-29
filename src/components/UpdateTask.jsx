import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import useInput from "../hooks/useInput";
import useUpdate from "../hooks/useUpdate";
import useDelete from "../hooks/useDelete";
import useRead from "../hooks/useRead";
import useDate from "../hooks/useDate";
import useCreate from "../hooks/useCreate";
import InputColor from "react-input-color";
import { memoModel } from "../models/models";

const styleModal = {
  container:
    "fixed flex justify-end top-0 left-0 w-full h-full bg-[#6A89C3]/40 z-[100]",
  button: "w-[36px] h-[36px] rounded-full bg-gray-200",
  icon: "flex justify-center items-center text-gray-500 text-xl",
  form: {
    container:
      "flex flex-col gap-2 bg-white w-full md:w-[480px] h-full shadow-lg border border-gray-40 relative  pb-[66px]",
    head: "flex justify-between w-full pl-6 pr-3 py-2 flex-wrap items-center justify-between border-b border-gray-200",
    title: "text-xl font-bold text-[#172B4D]",
    buttonclose:
      "hover:bg-gray-200 h-[40px] px-3 w-min rounded-sm cursor-pointer flex items-center gap-1",
    input:
      "w-full bg-gray-100 h-[40px] rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 mb-2",
    select:
      "bg-gray-100 h-[40px] w-full rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 mb-4",
    label: "text-[#172B4D] hover:text-[#172B4D] text-sm m-0",
    foot: "flex items-center justify-between gap-2 absolute bottom-0 left-0 w-full px-6 py-3 border-t border-gray-200",
    button:
      "bg-blue-700 hover:bg-blue-600 text-white h-[40px] px-3 py-1 rounded-sm flex items-center gap-1",
    buttonDelete:
      "bg-red-500 hover:bg-red-400 text-white h-[40px] px-3 py-1 rounded-sm flex items-center gap-1",
  },
};

const CustomForm = ({ onClose, data, members }) => {
  const [color, setColor] = React.useState({});
  const { dateFormater, currentTimeZone } = useDate();

  const inputState = useInput(data.state, "text");
  const inputTitle = useInput(data.name, "text");
  const inputDesc = useInput(data.description, "text");
  const inputRes = useInput(data.responsible, "text");
  const inputTags = useInput(data.tags, "text");
  const inputStart = useInput(dateFormater(data.start.seconds), "date");
  const inputEnd = useInput(dateFormater(data.end.seconds), "date");

  const uid = localStorage.getItem("uid");

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

  const dataMembers = useRead("members");
  useEffect(() => {
    setMembersList(dataMembers);

    if (data.members) {
      setMembersProject(data.members);
    }
  }, [dataMembers]);

  //console.log(members);

  const updateProject = (e) => {
    e.preventDefault(e);

    if (
      inputState.value === "" ||
      inputTitle.value === "" ||
      inputDesc.value === "" ||
      inputRes.value === "" ||
      inputTags.value === "" ||
      inputStart.value === "" ||
      inputEnd.value === ""
    ) {
      alert("Hay campos vacios!");
      return;
    } else {
      let dateByZone = currentTimeZone(inputStart.value, inputEnd.value);
      console.log(membersProject);
      useUpdate("projects", data.id, {
        name: inputTitle.value,
        description: inputDesc.value,
        state: inputState.value,
        responsible: inputRes.value,
        tags: inputTags.value,
        start: dateByZone.start,
        end: dateByZone.end,
        members: membersProject,
        progress: inputState.value === "Por hacer" ? 0 : 100,
        styles: {
          progressColor: color.hex,
        },
      });
      onClose();
    }
  };

  const deleteProject = async (id) => {
    useDelete("projects", id);
    useCreate("history", memoModel(uid, `${data.name}`, "Delete Project"));
    onClose();
  };

  return (
    <div className={styleModal.container}>
      <form onSubmit={updateProject} className={styleModal.form.container}>
        {/* Head */}
        <div className={styleModal.form.head}>
          <h3 className={styleModal.form.title}>Proyecto</h3>
          <button onClick={onClose} className={styleModal.form.buttonclose}>
            <GrClose />
          </button>
        </div>

        <div className="flex flex-col overflow-x-hidden px-6 pt-4">
          <div className=" flex justify-start items-center  gap-3 mt-2 mb-6">
            <InputColor
              initialValue={data.styles.progressColor}
              onChange={setColor}
              placement="right"
            />
            <h1 className=" text-2xl font-bold text-[#172B4D]">{data.name}</h1>
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

          <div>
            <label htmlFor="title" className={styleModal.form.label}>
              Titulo
            </label>
            <input
              id="title"
              required
              className={styleModal.form.input}
              type="text"
              placeholder="titulo"
              value={inputTitle.value}
              onChange={inputTitle.onChange}
            />
          </div>

          <div>
            <label htmlFor="description" className={styleModal.form.label}>
              Descripción
            </label>
            <input
              id="description"
              required
              className={styleModal.form.input}
              type="text"
              placeholder="descripción"
              value={inputDesc.value}
              onChange={inputDesc.onChange}
            />
          </div>

          <div>
            <label htmlFor="responsible" className={styleModal.form.label}>
              Responsable
            </label>
            <select
              id="responsible"
              required
              className={styleModal.form.select}
              value={inputRes.value}
              onChange={inputRes.onChange}
            >
              <option>Selecciona un miembro</option>
              {members.map((member) => (
                <option key={member.id}>
                  {member.name} - {member.rol}
                </option>
              ))}
            </select>
          </div>

          {/* members <<<<<<<<<<<<< */}
          <div className="w-full mb-4">
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

            <div className="flex   gap-2 w-full bg-gray-100 rounded-sm  p-2 overflow-x-scroll">
              {membersProject.length > 0 ? (
                <>
                  {membersProject.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-white px-2 py-1 h-[40px]"
                    >
                      <p className=" whitespace-nowrap">{member}</p>
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

          <div>
            <label htmlFor="tags" className={styleModal.form.label}>
              Etiquetas
            </label>
            <select
              id="tags"
              required
              className={styleModal.form.select}
              value={inputTags.value}
              onChange={inputTags.onChange}
            >
              <option>Selecciona una etiqueta</option>
              <option>Prioritario</option>
              <option>Backend</option>
              <option>Frontend</option>
              <option>Base de datos</option>
              <option>Despliegue</option>
              <option>Testing</option>
              <option>Documentación</option>
              <option>Seguridad</option>
              <option>Diseño</option>
            </select>
          </div>

          <div className="flex justify-between gap-3 bg-white">
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
          <div className="pb-8"> </div>
        </div>

        <div className={styleModal.form.foot}>
          <button
            onClick={() => deleteProject(data.id)}
            type="button"
            className={styleModal.form.buttonDelete}
          >
            <span>Eliminar</span>
          </button>
          <button type="submit" className={styleModal.form.button}>
            <span>Actualizar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const style = {
  container: "flex justify-between items-center w-full",
  containerModal: "flex justify-end md:justify-start items-center w-full ml-4",
  tasks: "mt-4 space-y-2",
  member:
    "flex justify-center items-center w-[36px] h-[36px] hover:z-30 rounded-full border-2 border-white select-none cursor-pointer",
  listmember: "grid gap-1 items-center",
};

function UpdateTask(props) {
  const [task, setTask] = useState({});
  const [members, setMembers] = useState({});

  const data = useRead("projects");
  let dataMembers = useRead("members");

  useEffect(
    () => {
      const taskFilterById = data.filter((item) => item.id === props.task.id);
      setTask(taskFilterById);
      setMembers(dataMembers);
    },
    [data, props.task],
    dataMembers
  );

  return (
    <div className={style.container}>
      <div className={style.containerModal}>
        <Modal
          btnActive={false}
          stateOpen={props.open}
          contentComponent={CustomForm}
          task={task[0]}
          members={members}
        />
      </div>
    </div>
  );
}

export default UpdateTask;
