import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import AuthForm from "./AuthForm";

export default function AuthPage({ isLogin }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (email, password) => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          {isLogin ? "Inicia sesión" : "Regístrate"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <AuthForm isLogin={isLogin} onSubmit={handleAuth} />
      </div>
    </div>
  );
}
