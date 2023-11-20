import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

/**
 * The useDelete function is an asynchronous function that deletes a document with a specific ID from a
 * specified collection in a database.
 * @param docName - The `docName` parameter is a string that represents the name of the document in
 * Firestore that you want to delete.
 * @param id - The `id` parameter is the unique identifier of the document that you want to delete.
 */
const useDelete = async (docName, id) => {
  await deleteDoc(doc(db, docName, id));
};

export default useDelete;
