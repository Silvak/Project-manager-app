const currentDate = new Date();

/**
 * It returns the payload structure for the project model
 * @param {string} input  - name of the project
 **/
export const projectModel = (input) => {
  const payload = {
    start: new Date(2020, 1, 2),
    end: new Date(2020, 2, 2),
    name: input,
    id: "Task 0",
    type: "task",
    progress: 10,
    isDisabled: true,
    styles: {
      progressColor: "#ffbb54",
      progressSelectedColor: "#ff9e0d",
    },
    completed: false,
  };
  return payload;
};

export const taskModel = (input) => {
  const payload = {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    name: input,
    id: "Task 0",
    type: "task",
    progress: 10,
    isDisabled: true,
    styles: {
      progressColor: "#ffbb54",
      progressSelectedColor: "#ff9e0d",
    },
    completed: false,
  };
  return payload;
};
