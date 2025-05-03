import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
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
          <div className="text-center space-y-8">
            {!["/buscar", "/guardar", "/todos"].includes(location.pathname) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/buscar"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">Buscar Objeto</h2>
                  <p className="text-gray-600">
                    Encuentra donde guardaste lo que buscas
                  </p>
                </Link>

                <Link
                  to="/guardar"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">Guardar Objeto</h2>
                  <p className="text-gray-600">Registra un nuevo objeto</p>
                </Link>

                <Link
                  to="/todos"
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">Ver Todo</h2>
                  <p className="text-gray-600">
                    Lista completa de objetos guardados
                  </p>
                </Link>
              </div>
            )}
            <Outlet /> {/* Aqui se renderizaran las subpaginas */}
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
