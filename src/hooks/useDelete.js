import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

/**
 * @param {string} docName - Name of the collection
 * @param {string} id - Id of the document to be deleted
 **/
const useDelete = async (docName, id) => {
  await deleteDoc(doc(db, docName, id));
};

export default useDelete;
