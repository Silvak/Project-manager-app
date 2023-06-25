const currentDate = new Date();

const generarColorPastel = () => {
  // Generar componentes RGB de forma aleatoria en el rango de tonalidad pastel oscuro
  const red = Math.floor(Math.random() * 146) + 100; // Rango: 100-255
  const green = Math.floor(Math.random() * 146) + 100; // Rango: 100-255
  const blue = Math.floor(Math.random() * 146) + 100; // Rango: 100-255

  // Generar color de fondo en formato hexadecimal
  const colorFondo = `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16
  )}`;
  // Devolver un objeto con el color de fondo y el color de la fuente (blanca)
  return { colorFondo, colorFuente: "white" };
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * It returns the payload structure for the project model
 * @param {string} input  - name of the project
 **/
export const projectModel = (input) => {
  const payload = {
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    name: capitalize(input),
    description: "...",
    responsible: "",
    tags: "",
    id: "",
    state: "Por hacer",
    memos: {
      list: [],
    },
    progress: 0,
    type: "task",
    typeInternal: "task",
    styles: {
      progressColor: generarColorPastel().colorFondo,
      //progressSelectedColor: "#ff9e0d",
    },
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
    progress: 0,
    isDisabled: true,
    styles: {
      progressColor: "#ffbb54",
      progressSelectedColor: "#ff9e0d",
    },
    completed: false,
  };
  return payload;
};

export const membersModel = (name, email, rol) => {
  const payload = {
    name: name,
    email: email,
    rol: rol,
    colorbg: generarColorPastel().colorFondo,
    colorText: "white",
  };
  return payload;
};

export const memoModel = (desc, action) => {
  const payload = {
    desc: desc,
    action: action,
    date: new Date(Date.now()),
  };
  return payload;
};
