import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const style = {
  container: `flex absolute h-screen w-full bg-white `, // CHANGED << "w-screen" cause a problem in the general width of the application
  sidebar: {
    container: `flex h-full bg-[#FAFBFC] border-r border-gray-300  shadow-inner  relative duration-300 ease-in-out `,
    content: `flex flex-col pt-24 pl-5 pb-4 overflow-hidden`,
    button: ` absolute top-24 -right-[20px] w-[40px] h-[40px] flex items-center justify-center rounded-full`,
    icon: `h-[26px] w-[26px] text-[#172B4D] bg-white hover:bg-blue-400 hover:text-white text-semibold rounded-full shadow-md flex items-center justify-center`,
  },
  content: {
    main: `flex flex-col h-full w-full pt-24 px-8 md:px-10 overflow-y-scroll`,
  },
};

function Home() {
  const [sidebarWidth, setSidebarWidth] = useState("268px");

  const handleSidebarWidthChange = () => {
    setSidebarWidth(sidebarWidth === "20px" ? "268px" : "20px");
  };

  return (
    <div className={style.container}>
      {/* Nav */}
      <Navbar />

      {/* Sidebar */}
      <aside
        className={style.sidebar.container}
        style={{ width: `${sidebarWidth}` }}
      >
        <div className={style.sidebar.content}>dasd</div>
        <button
          onClick={handleSidebarWidthChange}
          className={style.sidebar.button}
        >
          <div className={style.sidebar.icon}>
            {sidebarWidth === "20px" ? (
              <IoIosArrowForward />
            ) : (
              <IoIosArrowBack />
            )}
          </div>
        </button>
      </aside>

      {/* Content  */}
      <article className={style.content.main}>
        <Outlet />
      </article>
    </div>
  );
}

export default Home;
