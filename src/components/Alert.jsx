function Alert({ message }) {
  return (
    <div className="overflow-hidden  border border-orange-600 flex justify-center items-center w-full h-[40px] bg-orange-200 rounded-sm">
      <span className="text-sm text-orange-800">{message}</span>
    </div>
  );
}

export default Alert;
