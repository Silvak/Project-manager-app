import React, { useState } from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";

const style = {
  container:
    "w-full flex flex-wrap justify-between items-center rounded-md mb-8 gap-4",
  buttonContainer:
    "flex rounded-md shadow-sm border border-gray-200 bg-white overflow-hidden h-[40px]",
  button: "h-full hover:bg-gray-100 px-4 py-2 duration-100 ease-in-out",
  switch:
    "flex items-center justify-center h-full bg-white rounded-md h-[40px] shadow-sm border border-gray-200 px-4 py-2",
  toggle: "flex items-center justify-center h-full mr-1",
};

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.SFC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  const [activeButton, setActiveButton] = useState(ViewMode.Week);

  const handleButtonClick = (viewMode: ViewMode) => {
    onViewModeChange(viewMode);
    setActiveButton(viewMode);
  };

  const renderButton = (viewMode: ViewMode, label: string) => (
    <button
      className={`${style.button} ${
        activeButton === viewMode ? "bg-blue-500 text-white" : ""
      }`}
      onClick={() => handleButtonClick(viewMode)}
    >
      {label}
    </button>
  );

  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        {renderButton(ViewMode.HalfDay, "Mitad del dia")}
        {renderButton(ViewMode.Day, "Día")}
        {renderButton(ViewMode.Week, "Semana")}
        {renderButton(ViewMode.Month, "Mes")}
      </div>
      <div className={style.switch}>
        <label className={style.toggle}>
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Mostrar lista
      </div>
    </div>
  );
};
