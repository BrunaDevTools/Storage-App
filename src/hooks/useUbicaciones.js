import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../services/firebase";

export default function useUbicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      if (auth.currentUser) {
        const q = query(
          collection(db, "items"),
          where("userId", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const ubicacionesUnicas = new Set();

        querySnapshot.forEach((doc) => {
          ubicacionesUnicas.add(doc.data().ubicacion);
        });

        setUbicaciones(Array.from(ubicacionesUnicas));
      }
    };

    fetchUbicaciones();
  }, []);

  return ubicaciones;
}
