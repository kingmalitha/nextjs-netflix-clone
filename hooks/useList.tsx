import { db } from "@/lib/firebase";
import { Movie } from "@/typings";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const useList = (uid: string | undefined) => {
  const [list, setList] = useState<Movie[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, uid]);

  return list;
};

export default useList;
