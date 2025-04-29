import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthPage from "./components/auth/AuthPage";
import SaveItem from "./components/items/SaveItem";
import SearchItems from "./components/items/SearchItems";
import AllItems from "./components/items/AllItems";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="buscar" element={<SearchItems />} />
          <Route path="guardar" element={<SaveItem />} />
          <Route path="todos" element={<AllItems />} />
        </Route>
        <Route path="/login" element={<AuthPage isLogin={true} />} />
        <Route path="/register" element={<AuthPage isLogin={false} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
