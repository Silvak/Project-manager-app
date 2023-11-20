import { useState } from "react";

/**
 * The useInput function is a custom hook in JavaScript that handles input changes and provides a
 * value, onChange event handler, and reset function.
 * @param initialValue - The initial value is the value that the input field will have when it is first
 * rendered. It can be any valid value for the input type specified.
 * @param inputType - The inputType parameter is a string that specifies the type of input field. It
 * can have one of the following values: "date", "number", or "text".
 * @returns The `useInput` function returns an object with three properties: `value`, `onChange`, and
 * `reset`.
 */
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
