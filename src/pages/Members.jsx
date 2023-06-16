import { useEffect, useState } from "react";
import useRead from "../hooks/useRead";
import Loading from "../components/Loading";
import CreateRol from "../components/CreateRol";
import useDelete from "../hooks/useDelete";

const style = {
  gantt: ``,
  titlebar: {
    container: `w-full mb-8`,
    title: `text-2xl font-bold text-[#172B4D]`,
    links: `text-[#172B4D] hover:text-[#172B4D]`,
  },
  table: {
    body: "border border-[#E4E7EB] rounded-md overflow-hidden ",
    item: `flex flex-row justify-between items-center w-full h-16 px-4 border-b border-[#E4E7EB]`,
    p: `text-[#172B4D] w-1/3`,
  },
};

function Members() {
  const [members, setMembers] = useState([]);

  let data = useRead("members");

  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  const deleteProject = async (id) => {
    useDelete("members", id);
    onClose();
  };

  return (
    <div>
      <div className={style.titlebar.container}>
        <a href={style.titlebar.links}>Proyectos</a>
        <h2 className={style.titlebar.title}>Members</h2>
      </div>

      <div className="mb-8">
        <CreateRol />
      </div>

      <div className={style.table.body}>
        {members.map((member, index) => (
          <div className={style.table.item} key={index}>
            <p className={style.table.p}>{member.name}</p>
            <p className={style.table.p}>{member.email}</p>
            <p className={style.table.p}>{member.rol}</p>
            <button onClick={() => deleteProject(member.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
