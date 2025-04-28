import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Storage App</h1>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Iniciar sesión
            </Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Registrarse
            </Link>
          </div>
        )}
      </nav>

      <main>
        {user ? (
          <div className="text-center">
            <h2 className="text-xl mb-4"> Bienvenido, {user.email}!</h2>
            {/* Aqui iran las opciones principales */}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Por favor inicia sesión o registrate
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
