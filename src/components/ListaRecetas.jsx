function ListaRecetas({ recetas, obtenerDetallesReceta, favoritos, toggleFavorito }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {recetas.map((receta) => {
        const esFavorita = favoritos.some(f => f.idMeal === receta.idMeal);
        return (
          <div
            key={receta.idMeal}
            className="border rounded shadow bg-white p-2 hover:shadow-lg transition relative"
          >
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => toggleFavorito(receta)}
            >
              {esFavorita ? "❤️" : "🤍"}
            </button>

            <div
              onClick={() => obtenerDetallesReceta(receta.idMeal)}
              className="cursor-pointer"
            >
              <img
                src={receta.strMealThumb}
                alt={receta.strMeal}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 text-lg font-semibold text-center text-blue-700">
                {receta.strMeal}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListaRecetas;
