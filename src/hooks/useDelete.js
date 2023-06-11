import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDelete = async (docName, id) => {
  await deleteDoc(doc(db, docName, id));
};

export default useDelete;
