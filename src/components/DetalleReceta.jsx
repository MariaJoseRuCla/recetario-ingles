function DetalleReceta({ recetaSeleccionada }) {
  return (
    <div className="mt-6 border rounded p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">{recetaSeleccionada.strMeal}</h2>
      <img 
        src={recetaSeleccionada.strMealThumb} 
        alt={recetaSeleccionada.strMeal} 
        className="w-full max-h-64 object-cover rounded mb-4"
      />
      <p className="mb-4 whitespace-pre-line">{recetaSeleccionada.strInstructions}</p>
      <h3 className="font-semibold">Ingredients:</h3>
      <ul className="list-disc list-inside">
        {Array.from({ length: 20 }, (_, i) => {
          const ingrediente = recetaSeleccionada[`strIngredient${i + 1}`];
          const medida = recetaSeleccionada[`strMeasure${i + 1}`];
          return ingrediente && ingrediente.trim() ? (
            <li key={i}>{`${medida} ${ingrediente}`}</li>
          ) : null;
        })}
      </ul>
    </div>
  );
}

export default DetalleReceta;
