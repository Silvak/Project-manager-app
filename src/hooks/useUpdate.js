import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

const useUpdate = async (docName, id, playload) => {
  await updateDoc(doc(db, docName, id), playload);
};

export default useUpdate;
