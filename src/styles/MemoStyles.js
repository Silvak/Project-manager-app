// styles/MemoStyles.js

export const style = {
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
    item: `grid grid-cols-2 items-center w-full px-4 border-y border-[#E4E7EB] py-2`,
    p: `text-[#172B4D] ml-2 text-bold`,
    p2: `hidden lg:flex text-gray-500 w-1/4`,
    p3: `hidden md:flex text-gray-500 w-1/4`,
    button: `text-blue-400 px-2 py-2 rounded-md hover:bg-blue-500 hover:text-white ease-in-out duration-100 `,
    buttondelete: `text-red-500 px-2 py-2  rounded-md hover:bg-red-500 hover:text-white ease-in-out duration-100`,
  },
};

export const styleModal = {
  container: `fixed grid place-content-center top-0 left-0 w-full h-full bg-[#6A89C3]/40 z-[100] `,
  button: `w-[36px] h-[36px] rounded-full bg-gray-200`,
  icon: `flex justify-center items-center text-gray-500 text-xl`,
  form: {
    container: `flex flex-col gap-2 bg-white rounded-md p-5 overflow-y-auto max-h-[85vh]  w-[340px] md:w-[480px] md:p-8 h-min shadow-lg border border-gray-40 `,
    input:
      "w-full bg-gray-100 h-[40px] rounded-sm px-2 py-1  focus:outline-none focus:ring-1 focus:ring-blue-400 mb-2",
    select: `bg-gray-100 h-[40px] w-full rounded-sm px-2 py-1  focus:outline-none focus:ring-1 focus:ring-blue-400 mb-4`,
    title: `text-xl font-bold text-[#172B4D] mb-6`,
    label: `text-[#172B4D] hover:text-[#172B4D] text-sm m-0`,
    buttonbox: `flex items-center justify-end gap-2 `,
    button: `bg-blue-700 hover:bg-blue-600 text-white  h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
    buttonclose: `hover:bg-gray-200 h-[40px] px-3 py-1 rounded-sm  flex items-center gap-1`,
  },
};
