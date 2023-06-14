import { useState } from "react";

const useInput = (initialValue, inputType) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    let inputValue = event.target.value;

    if (inputType === "date") {
      // Validar y formatear fecha si es necesario
    } else if (inputType === "number") {
      // Validar y formatear número si es necesario
    } else if (inputType === "text") {
      // Validar y formatear texto si es necesario
    }

    setValue(inputValue);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    reset,
  };
};

export default useInput;
