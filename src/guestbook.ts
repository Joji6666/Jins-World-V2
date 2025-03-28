import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
  getDocs
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addMessage = async (name: string, message: string) => {
  try {
    await addDoc(collection(db, "guestbook"), {
      name: name,
      message: message,
      timestamp: serverTimestamp()
    });
    console.log("메시지가 성공적으로 추가되었습니다.");
  } catch (e) {
    console.error("메시지 추가 중 오류 발생: ", e);
  }
};

export const displayMessages = (
  callback: (messages: DocumentData[]) => void
) => {
  const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
  onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => doc.data());
    callback(messages);
  });
};

export const getAllMessages = async () => {
  const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};
