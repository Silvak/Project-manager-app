// hooks/useLocalStorage.js
import { useState } from "react";

/**
 * The `useLocalStorage` function is a custom hook in JavaScript that allows you to store and retrieve
 * values in the browser's local storage.
 * @param key - The key parameter is a string that represents the key under which the value will be
 * stored in the local storage. It is used to retrieve and store the value associated with that key.
 * @param initialValue - The initialValue parameter is the initial value that will be used if there is
 * no value stored in the localStorage for the given key.
 * @returns The function `useLocalStorage` returns an array with two elements: `storedValue` and
 * `setValue`.
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
