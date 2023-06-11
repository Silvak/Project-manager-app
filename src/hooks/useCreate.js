import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const useCreate = async (docName, playload) => {
  try {
    const docRef = collection(db, docName);
    await addDoc(docRef, playload);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export default useCreate;
