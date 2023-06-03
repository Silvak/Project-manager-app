import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./components/ToDo";

import { db } from "./firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const style = {
  bg: `h-screen w-screen bg-gray-50`, //<< "w-screen" can cause a problem in the general width of the application
  form: `flex items-center gap-2`,
  button: `hover:bg-gray-200 rounded-sm px-6 py-1 flex items-center gap-1`,
};

function App() {
  const [todos, setTodos] = useState([]);

  const readData = async () => {
    const q = query(collection(db, "projects"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];
      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(projectsArr);
    });
    return () => unsubscribe();
  };

  //Create projects

  //Read projects from firebase
  useEffect(() => {
    readData();
  }, []);

  //Update projects from firebase

  //Delete projects

  return (
    <div className={style.bg}>
      {/* Create Epic Compoenent  */}
      <div className={style.container}>
        <h3>Insert a new task</h3>

        <form className={style.form}>
          <input type="text" placeholder="Que debes hacer?" />
          <button className={style.button}>
            <span>
              <AiOutlinePlus />
            </span>
            <span>Crear Epic</span>
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
        </ul>

        <p className={style.count}>You have {todos.length} todos</p>
      </div>
    </div>
  );
}

export default App;
