function ListaRecetas({ recetas, obtenerDetallesReceta }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {recetas.map((receta) => (
        <div
          key={receta.idMeal}
          className="border rounded shadow bg-white p-2 cursor-pointer hover:shadow-lg transition"
          onClick={() => obtenerDetallesReceta(receta.idMeal)}
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
      ))}
    </div>
  );
}

export default ListaRecetas;
