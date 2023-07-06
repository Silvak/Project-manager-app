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
  const [history, setHistory] = useState([]);

  let data = useRead("history");

  useEffect(() => {
    if (data) {
      setHistory(data);
    }
  }, [data]);

  const deleteProject = async (id) => {
    useDelete("history", id);
  };

  /*
  if (history.length === 0 && !data[0]) {
    return <Loading />;
  }*/
  return (
    <div>
      <div className={style.titlebar.container}>
        <a href={style.titlebar.links}>Proyectos</a>
        <h2 className={style.titlebar.title}>Historial</h2>
      </div>

      <div className={style.table.head}>
        <p className="w-1/4">Descripción</p>
        <p className={style.table.p2}>Acción</p>
        {/* <p className={style.table.p3}>Fecha</p> */}
        <p className=""></p>
      </div>

      <div className={style.table.body}>
        {history.length == 0 ? (
          <div className="h-[48px] px-4 flex justify-center items-center text-sm text-gray-400">
            {" "}
            El historial está vacío{" "}
          </div>
        ) : (
          <>
            {history.map((item, index) => (
              <div className={style.table.item} key={index}>
                <p className="w-1/4 whitespace-nowrap">
                  {item.desc.length > 20
                    ? `${item.desc.slice(0, 20)}...`
                    : item.desc}
                </p>
                <p className={style.table.p2}>
                  {" "}
                  <span className="bg-gray-100 px-3 py-1 rounded-sm">
                    {item.action}
                  </span>{" "}
                </p>
                {/* 
                <p className={style.table.p3}>
                  {new Date(item.date.seconds * 1000).toDateString()}
                </p> 
                */}
                <button
                  onClick={() => deleteProject(item.id)}
                  className={style.table.button}
                >
                  <span>
                    <RiDeleteBin7Line />
                  </span>
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Backlog;
