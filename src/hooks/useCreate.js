import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

/**
 * The `useCreate` function is an asynchronous function that adds a document to a specified collection
 * in a database.
 * @param docName - The `docName` parameter is a string that represents the name of the collection in
 * Firestore where you want to add a new document.
 * @param playload - The `playload` parameter is an object that contains the data you want to add to
 * the Firestore document. It could be any valid JavaScript object that you want to store in the
 * document.
 */
const useCreate = async (docName, playload) => {
  try {
    const docRef = collection(db, docName);
    await addDoc(docRef, playload);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export default useCreate;
