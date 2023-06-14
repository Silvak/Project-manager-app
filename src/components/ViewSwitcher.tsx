import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";

const style = {
  container:
    "w-full flex flex-row flex-wrap gap-2 justify-between items-center p-2 rounded-md mt-4 border border-gray-300",
  button: "border border-gray-300 rounded-md px-2 py-1",
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
  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </button>
      <button
        className={style.button}
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Half of Day
      </button>
      <button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
        Day
      </button>
      <button
        className={style.button}
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className={style.button}
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>

      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
};
