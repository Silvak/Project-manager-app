import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/SidebarMenu";
import { Outlet } from "react-router-dom";

const style = {
  container: `flex h-screen w-full bg-white `, // CHANGED << "w-screen" cause a problem in the general width of the application
  sidebar: {
    container: `absolute top-0 left-0 md:relative flex z-10 h-full bg-[#FAFBFC] border-r border-gray-300  shadow-inner  relative duration-300 ease-in-out `,
    content: `flex flex-col pt-24 px-2 pb-8 overflow-hidden`,
    button: ` absolute top-24 -right-[20px] w-[40px] h-[40px] flex items-center justify-center rounded-full`,
    icon: `h-[26px] w-[26px] text-[#172B4D] bg-white hover:bg-blue-400 hover:text-white text-semibold rounded-full shadow-md flex items-center justify-center`,
  },
  content: {
    main: `absolute top-0 left-0 md:relative flex flex-col h-full w-full pt-24 pb-8 px-8 md:px-10 overflow-y-scroll `,
  },
};

function Home() {
  const [sidebarWidth, setSidebarWidth] = useState(
    window.innerWidth < 768 ? "16px" : "268px"
  );

  const handleSidebarWidthChange = () => {
    setSidebarWidth(sidebarWidth === "16px" ? "268px" : "16px");
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
        <div className={style.sidebar.content}>
          <SidebarMenu />
        </div>
        <button
          onClick={handleSidebarWidthChange}
          className={style.sidebar.button}
        >
          <div className={style.sidebar.icon}>
            {sidebarWidth === "16px" ? (
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
