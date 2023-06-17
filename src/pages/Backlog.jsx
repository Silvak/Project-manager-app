import { useEffect, useState } from "react";
import useRead from "../hooks/useRead";
import Loading from "../components/Loading";
import useDelete from "../hooks/useDelete";
import { RiDeleteBin7Line } from "react-icons/ri";

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
    item: `flex flex-row justify-between items-center w-full h-16 px-4 border-b border-[#E4E7EB]`,
    p: `text-[#172B4D] ml-2 text-bold`,
    p2: `hidden lg:flex text-gray-500 w-1/4`,
    p3: `hidden md:flex text-gray-500 w-1/4`,
    button: `text-red-500 px-2 py-2 rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-100`,
  },
};

function Backlog() {
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
        <h2 className={style.titlebar.title}>History</h2>
      </div>

      <div className={style.table.head}>
        <p className="w-1/4">Name</p>
        <p className={style.table.p2}>Email</p>
        <p className={style.table.p3}>Rol</p>
        <p className=""></p>
      </div>

      <div className={style.table.body}>
        {members.map((member, index) => (
          <div className={style.table.item} key={index}>
            <p className="w-1/4">Descripcion</p>
            <p className={style.table.p2}>action</p>
            <p className={style.table.p3}>20-15-2023</p>
            <button
              onClick={() => deleteProject(member.id)}
              className={style.table.button}
            >
              <span>
                <RiDeleteBin7Line />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Backlog;
