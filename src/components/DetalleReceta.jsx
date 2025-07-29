function DetalleReceta({ receta, toggleFavorito, esFavorita }) {
  if (!receta) return null;

  return (
    <div className="mt-6 border rounded p-4 bg-gray-50">
      <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-bold mb-2">{receta.strMeal}</h2>
      <button
      onClick={() => toggleFavorito(receta)}
      className="text-2xl"
      type="button"
      >
        {esFavorita ? "❤️" : "🤍" }
      </button>
      </div>

      <img
        src={receta.strMealThumb}
        alt={receta.strMeal}
        className="w-full max-h-64 object-cover rounded mb-4"
      />

      <p className="mb-4 whitespace-pre-line">{receta.strInstructions}</p>

      <h3 className="font-semibold mt-4">Ingredientes:</h3>
      <ul className="list-disc list-inside">
        {Array.from({ length: 20 }, (_, i) => {
          const ingrediente = receta[`strIngredient${i + 1}`];
          const medida = receta[`strMeasure${i + 1}`];
          return ingrediente && ingrediente.trim() ? (
            <li key={i}>{`${medida} ${ingrediente}`}</li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

export default DetalleReceta;
