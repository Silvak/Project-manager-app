// Members.js
import { useEffect, useState } from "react";
import useRead from "../hooks/useRead";
import useDelete from "../hooks/useDelete";
import useCreate from "../hooks/useCreate";
import { RiDeleteBin7Line } from "react-icons/ri";
import CreateRol from "../components/CreateRol";
import { memoModel } from "../models/models";
import useLocalStorage from "../hooks/useLocalStorage";
import ReactPaginate from "react-paginate";
import "../index.css";

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

function Members() {
  const [members, setMembers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [uid, setUid] = useLocalStorage("uid", "");

  const data = useRead("members");

  const membersPerPage = 8;
  const pagesVisited = pageNumber * membersPerPage;

  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  const deleteProject = async (id, member) => {
    useDelete("members", id);
    useCreate("history", memoModel(uid, `${member}`, "Delete Member"));
  };

  const pageCount = Math.ceil(members.length / membersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className={style.titlebar.container}>
        <a href={style.titlebar.links}>Proyectos</a>
        <h2 className={style.titlebar.title}>Miembros</h2>
      </div>

      <div className="mb-8">
        <CreateRol />
      </div>

      <div className={style.table.head}>
        <p className="w-1/4">Name</p>
        <p className={style.table.p2}>Email</p>
        <p className={style.table.p3}>Rol</p>
        <p className=""></p>
      </div>

      <div className={style.table.body}>
        {members
          .slice(pagesVisited, pagesVisited + membersPerPage)
          .map((member, index) => (
            <div className={style.table.item} key={index}>
              <div className={style.table.memberImg}>
                <div
                  style={{
                    background: member.colorbg,
                    color: member.colorText,
                    zIndex: member.selected ? 30 : 7 - index,
                  }}
                  className={style.table.member}
                  key={index}
                >
                  {member.name.toUpperCase()[0]}
                </div>
                <p className={style.table.p}>{member.name}</p>
              </div>

              <p className={style.table.p2}>{member.email}</p>
              <p className={style.table.p3}>{member.rol}</p>
              <button
                onClick={() => deleteProject(member.id, member.name)}
                className={style.table.button}
              >
                <span>
                  <RiDeleteBin7Line />
                </span>
              </button>
            </div>
          ))}
        {new Array(
          membersPerPage -
            members.slice(pagesVisited, pagesVisited + membersPerPage).length
        )
          .fill("")
          .map((_, index) => (
            <div className={style.table.item} key={index + members.length}>
              {/* Render empty slots */}
            </div>
          ))}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      )}
    </div>
  );
}

export default Members;
