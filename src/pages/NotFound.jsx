import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 ">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl mb-2">Página no encontrada</h1>
        <p>La página que estás buscando no existe.</p>
        <Link to="/" className="text-blue-500 underline mt-4 block">
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
