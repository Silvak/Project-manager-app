import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * The `useRead` function is a custom hook in JavaScript that retrieves data from a Firestore
 * collection based on the current user's ID.
 * @param docName - The `docName` parameter is the name of the collection in Firestore that you want to
 * query.
 * @returns The `data` array is being returned.
 */
const useRead = (docName) => {
  const [data, setData] = useState([]);
  let userId = auth.currentUser.uid;

  /**
   * @param {string} docName - Name of the collection
   **/
  const getData = (docNameQuery) => {};

  useEffect(() => {
    const q = query(collection(db, docName), where("uid", "==", userId));

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
