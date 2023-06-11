import { BsTrash3 } from "react-icons/bs";

const style = {
  li: `flex  items-center gap-4 bg-white rounded-sm px-4 py-3 shadow-md`,
  liComplete: `flex  items-center gap-4 bg-green-200 rounded-sm px-4 py-3 shadow-md`,
  rows: `flex items-center gap-2`,
  completed: `line-through text-gray-400`,
};

function Epic({ project, toggleComplete, deleteProject }) {
  return (
    <li className={project.completed ? style.liComplete : style.li}>
      <div className={style.rows}>
        <input
          onChange={() => toggleComplete(project)}
          type="checkbox"
          checked={project.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(project)}
          className={project.completed ? style.completed : style.text}
        >
          {project.name}
        </p>
      </div>
      <button onClick={() => deleteProject(project.id)}>
        <BsTrash3 />
      </button>
    </li>
  );
}

export default Epic;
