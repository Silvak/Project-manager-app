import React from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useState, useEffect } from "react";
import { initTasks, getStartEndDateForProject } from "../helpers";
import { ViewSwitcher } from "./ViewSwitcher";
import useUpdate from "../hooks/useUpdate";

export default function GanttChart() {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);

  //read data
  let data = initTasks() as Task[];
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      setTasks(data);
    }
  }, [data]);

  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));

    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
        useUpdate("projects", task.id, changedProject);
      }
      //useUpdate("projects", task.id, task.project);
    }

    setTasks(newTasks);

    //let newTasks2 = tasks.map((t) => console.log(t.id, task.id));
    let newTasks2 = tasks.filter((t) => t.id === task.id);
    useUpdate("projects", task.id, newTasks2[0]);
    console.log("newTasks2", newTasks2);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("Doble Click event:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  if (tasks.length === 0) {
    return <div>No tasks</div>;
  }
  return (
    <div>
      <ViewSwitcher
        onViewModeChange={(viewMode: ViewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />

      <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        onDoubleClick={handleDblClick}
      />
    </div>
  );
}

/*
<Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}  <<< change date
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
      />
*/
