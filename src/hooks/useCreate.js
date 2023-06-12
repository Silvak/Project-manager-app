import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Create a new document in a collection
/**
 * @param {string} docName - Name of the collection
 * @param {object} playload - Object to be added to the collection
 **/
const useCreate = async (docName, playload) => {
  try {
    const docRef = collection(db, docName);
    await addDoc(docRef, playload);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export default useCreate;
