// Importar funciones de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArU3NU-JzvPK0terGLZgoDLGT1hoESuLA",
  authDomain: "storage-app-9b4d4.firebaseapp.com",
  projectId: "storage-app-9b4d4",
  storageBucket: "storage-app-9b4d4.firebasestorage.app",
  messagingSenderId: "107159987150",
  appId: "1:107159987150:web:10cae4b723d1b5dfd1019f",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
