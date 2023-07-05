import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";

/**
 * read data from a collection
 **/
const useRead = (docName) => {
  const [data, setData] = useState([]);
  let userId = auth.currentUser.uid;

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
      let filtered = projectsArr.filter((item) => item.uid === userId);
      setData(filtered);
    });

    return () => unsubscribe();
  }, []);

  //let dataFiltered = data.filter((item) => item.uid === userId);

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
