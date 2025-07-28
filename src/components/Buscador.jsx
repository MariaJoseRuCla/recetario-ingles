function Buscador ({ingredientes, setIngredientes, buscarRecetas}) {
    return (
        <>
        <input
        type="text"
        placeholder="Example: chicken, salmon"
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
        </>
    );
}
export default Buscador;


