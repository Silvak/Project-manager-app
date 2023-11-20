import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

/**
 * The function `useUpdate` is an asynchronous function that updates a document in a Firestore database
 * using the provided document name, id, and payload.
 * @param docName - The `docName` parameter is a string that represents the name of the collection in
 * Firestore where the document is located.
 * @param id - The `id` parameter is the identifier of the document you want to update. It is used to
 * specify which document in the collection should be updated.
 * @param playload - The `playload` parameter is an object that contains the data you want to update in
 * the document. It could include one or more fields and their corresponding values.
 */
const useUpdate = async (docName, id, playload) => {
  //console.log(playload);
  await updateDoc(doc(db, docName, id), playload);
};

export default useUpdate;
