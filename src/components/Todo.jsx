import { BsTrash3 } from "react-icons/bs";

const style = {
  li: `flex  items-center gap-4`,
  rows: `flex items-center gap-2`,
};

function Todo({ todo }) {
  console.log(todo);
  return (
    <li className={style.li}>
      <div className={style.rows}>
        <input type="checkbox" name="" id="" />
        <p className={style.text}></p>
      </div>
      <button>
        <BsTrash3 />
      </button>
    </li>
  );
}

export default Todo;
