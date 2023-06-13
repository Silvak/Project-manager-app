import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

/**
 * @param {string} docName - Name of the collection
 * @param {string} id - Id of the document to be updated
 * @param {object} playload - Object to be updated
 **/
const useUpdate = async (docName, id, playload) => {
  //console.log(playload);
  await updateDoc(doc(db, docName, id), playload);
};

export default useUpdate;
