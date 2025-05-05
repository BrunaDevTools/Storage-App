import { useState } from "react";
import { db } from "../../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import useUbicaciones from "../../hooks/useUbicaciones";

export default function SaveItem() {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("general");
  const categorias = [
    "Ropa",
    "Herramientas",
    "Documentos",
    "Electrónica",
    "Libros",
    "Juguetes",
    "Adornos",
    "General",
  ];
  const ubicaciones = useUbicaciones(); // Hook para obtener ubicaciones

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!nombre.trim() || !ubicacion.trim()) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "items"), {
        nombre: nombre.trim(),
        ubicacion: ubicacion.trim(),
        createdAt: serverTimestamp(), // Fecha automatica de creación
        userId: auth.currentUser.uid, // Asocia el objeto al usuario actual
        categoria: categoria,
      });

      navigate("/todos"); // Redirigir a la página de todos los objetos
    } catch (err) {
      setError("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2x1 font-bold mb-6 text-gray-800">
        Guardar Nuevo Objeto
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Objeto
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Botas de invierno"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            {categorias.map((cat) => (
              <option key={cat.toLowerCase()} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            list="ubicaciones-list"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Armario del pasillo, en caja blanca"
            disabled={loading}
          />
          <datalist id="ubicaciones-list">
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion} />
            ))}
          </datalist>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Guardando..." : "Guardar Objeto"}
        </button>
      </form>
    </div>
  );
}
