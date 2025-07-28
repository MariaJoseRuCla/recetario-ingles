import { useState } from "react";
import axios from "axios";
import Buscador from "../components/Buscador";
import ListaRecetas from "../components/ListaRecetas";
import DetalleReceta from "../components/DetalleReceta";

function Home() {
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
    setCargando(true);
    try {
      const respuesta = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`
      );
      setRecetaSeleccionada(respuesta.data.meals[0]);
    } catch (error) {
      console.log("Error al obtener detalles de la receta:", error);
    }
    setCargando(false);
  };

  const volverAlListado = () => {
    setRecetaSeleccionada(null);
  };

  return (
    <div
      className="min-h-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: "url('/cubiertos.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 800px",
        backgroundColor: "#bfdbfe",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Recetario</h1>

        <Buscador
          ingredientes={ingredientes}
          setIngredientes={setIngredientes}
          buscarRecetas={buscarRecetas}
        />

        {cargando && <p className="mt-4 text-center">Buscando recetas...</p>}

        {!cargando && recetaSeleccionada && (
          <>
            <DetalleReceta receta={recetaSeleccionada} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={volverAlListado}
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Volver atrás
              </button>
            </div>
          </>
        )}

        {!cargando && !recetaSeleccionada && recetas.length > 0 && (
          <ListaRecetas recetas={recetas} obtenerDetallesReceta={obtenerDetallesReceta} />
        )}

        {!cargando && recetas.length === 0 && !recetaSeleccionada && (
          <p className="mt-6 text-center text-gray-500">No se encontraron recetas.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
