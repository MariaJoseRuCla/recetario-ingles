import { useState } from "react";
import axios from "axios";

function App() {
  const [ingredientes, setIngredientes] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);

  const buscarRecetas = async () => {
    if (!ingredientes) return;
    setRecetaSeleccionada(null);
    setCargando(true);
    try {
      const respuesta = await axios.get(
         `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientes}`
      );
      setRecetas(respuesta.data.meals || []);
    } catch (error) {
      console.log("Error al buscar recetas:", error);
      setRecetas([]);
    }
    setCargando(false);
  };

  const obtenerDetallesReceta = async (idReceta) => {
    try {
      const respuesta = await axios.get (
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`
      );
      setRecetaSeleccionada(respuesta.data.meals[0]);
    } catch (error) {
      console.log("Error al obtener detalles de la receta", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Recetario</h1>
      
        <input
        type="text"
        placeholder="Example: chicken, meat"
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        />
        <button
        onClick={buscarRecetas}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Buscar recetas
        </button>

        {cargando && <p className="mt-4 text-center">Buscando recetas...</p>}

        {!cargando && recetaSeleccionada && (
          <div className="mt-6 border rounded p-4 bg-gray-50">
            <h2 className="text-2xl font-bold mb-2">{recetaSeleccionada.strMeal}</h2>
            <img src={recetaSeleccionada.strMealThumb} 
            alt={recetaSeleccionada.strMeal} 
            className="w-full max-h-64 object-cover rounded mb-4"
            />
            <p className="mb-4 whitespace-pre-line">{recetaSeleccionada.strInstructions}</p>
            <h3 className="font-semibold">Ingredientes:</h3>
            <ul className="list-disc list-inside">
              {Array.from({ length: 20}, (_,i) => {
                const ingrediente = recetaSeleccionada[`strIngredient${i + 1}`];
                const medida = recetaSeleccionada[`strMeasure${i + 1}`];
                return ingrediente && ingrediente.trim() ? (
                  <li key={i}>{`${medida} ${ingrediente}`}</li>
                ) : null;
              })}
            </ul>
          </div>
        )}
        {!cargando && !recetaSeleccionada && recetas.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recetas.map((receta) => (
              <div
              key={receta.idMeal}
              className="border rounded shadow bg-white p-2 cursor-pointer hover:shadow-lg transition"
              onClick={() => obtenerDetallesReceta(receta.idMeal)}>
                
                <img src={receta.strMealThumb} 
                alt={receta.strMeal}
                className="w-full h-40 object-cover rounded" 
                />
                <h2 className="mt-2 text-lg font-semibold text-center text-blue-700">
                  {receta.strMeal}
                </h2>
              </div>
            ))}
          </div>
        )}
          {!cargando && recetas.length === 0 && !recetaSeleccionada && (
            <p className="mt-6 text-center text-gray-500">No se encontraron recetas.</p>
          )}
      </div>
    </div>
  );
}
export default App;