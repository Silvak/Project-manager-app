import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Epic from "./components/Epic";

import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import GanttChart from "./components/GanttChart";

const style = {
  bg: `h-screen w-screen bg-gray-100`, //<< "w-screen" can cause a problem in the general width of the application
  form: `flex items-center gap-2`,
  button: `hover:bg-gray-200 rounded-sm px-6 py-1 flex items-center gap-1`,
};

function App() {
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");

  //Create projects
  const createProject = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("No puedes crear un epic vacio");
      return;
    } else {
      try {
        const docRef = await collection(db, "projects");
        const payload = {
          title: input,
          completed: false,
          start: new Date(2020, 1, 1),
          end: new Date(2020, 1, 2),
          name: "Idea",
          id: "Task 0",
          type: "task",
          progress: 45,
          isDisabled: true,
          styles: {
            progressColor: "#ffbb54",
            progressSelectedColor: "#ff9e0d",
          },
        };
        await addDoc(docRef, payload);
        setInput("");
      } catch (err) {
        console.error("Error adding document: ", err);
      }
    }
  };

  //Read projects from firebase
  const readProjects = () => {
    try {
      const q = query(collection(db, "projects"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let projectsArr = [];
        querySnapshot.forEach((doc) => {
          projectsArr.push({ ...doc.data(), id: doc.id });
        });
        setProjects(projectsArr);
      });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  useEffect(() => {
    readProjects();
  }, []);

  //Update projects from firebase
  const toggleComplete = async (project) => {
    await updateDoc(doc(db, "projects", project.id), {
      completed: !project.completed,
    });
  };

  //Delete projects
  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };

  return (
    <div className={style.bg}>
      {/* Create Epic Compoenent  */}
      <div className={style.container}>
        <h3>Insert a new task</h3>

        <form onSubmit={createProject} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Que debes hacer?"
          />
          <button className={style.button}>
            <span>
              <AiOutlinePlus />
            </span>
            <span>Crear Epic</span>
          </button>
        </form>

        <ul>
          {projects.map((project, index) => (
            <Epic
              key={index}
              project={project}
              toggleComplete={toggleComplete}
              deleteProject={deleteProject}
            />
          ))}
        </ul>

        {projects.length > 0 && (
          <p className={style.count}>You have {projects.length} todos</p>
        )}
      </div>

      <div>
        <GanttChart />
      </div>
    </div>
  );
}

export default App;
