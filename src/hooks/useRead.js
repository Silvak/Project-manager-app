import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";

/**
 * read data from a collection
 **/
const useRead = (docName) => {
  const [data, setData] = useState([]);

  /**
   * @param {string} docName - Name of the collection
   **/
  const getData = (docNameQuery) => {};

  useEffect(() => {
    const q = query(collection(db, docName));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];
      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      setData(projectsArr);
    });

    return () => unsubscribe();
  }, []);

  return data;
};

export default useRead;

/*
  const readData = (docName) => {
    try {
      const q = query(collection(db, "projects"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let projectsArr = [];
        querySnapshot.forEach((doc) => {
          projectsArr.push({ ...doc.data(), id: doc.id });
        });
        setProjects(projectsArr);
      });
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
*/
