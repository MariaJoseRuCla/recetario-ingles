import ListaRecetas from "./ListaRecetas";

function Favoritos({ favoritos, obtenerDetallesReceta, toggleFavorito}) {
if (favoritos.length === 0) {
    return <p className="mt-6 text-center text-gray-500">No tienes recetas favoritas.</p>;
}
return (
    <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Mis recetas favoritas</h2>
        <ListaRecetas
        recetas={favoritos}
        obtenerDetallesReceta={obtenerDetallesReceta}
        favoritos={favoritos}
        toggleFavorito={toggleFavorito}
        />
    </div>
);
}
export default Favoritos;