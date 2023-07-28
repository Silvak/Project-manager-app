import { RiEyeLine } from "react-icons/ri";

const ShowMemoButton = ({ onClick }) => {
  return (
    <button
      id="details"
      onClick={onClick}
      className="p-2 hover:bg-gray-500 hover:text-white duration-200 ease-out rounded-md"
    >
      <RiEyeLine />
    </button>
  );
};

export default ShowMemoButton;
