import { useContext } from 'react'; // Cambiamos useEffect por useContext
import PorOperaciones from './PorOperaciones';
import PropRecientes from './PropRecientes';
import { PropertyContext } from '../context/PropertyContext'; // Importamos el contexto

function ContenedorPP() {
    // Obtenemos datos globales
    const { allInmuebles, loading, error } = useContext(PropertyContext);

    // Lógica para obtener las 2 más recientes desde la memoria
    // Las ordenamos por fecha de creación (createdAt o publishedAt) de forma descendente
    const propiedadesRecientes = [...allInmuebles]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

    return (
        <section className="container mx-auto py-10 md:py-16 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-1 justify-between content-center">
                    <div className="space-y-4 mb-6 content-center">
                        <PorOperaciones />
                    </div>
                </div>

                <div className="lg:col-span-1 p-4">
                    <p className="text-2xl font-bold text-[#253E57] p-2 text-center m-2">
                        Últimos ingresos
                    </p>
                    <PropRecientes
                        propiedades={propiedadesRecientes}
                        cargando={loading}
                        error={error}
                    />
                </div>
            </div>
        </section>
    );
}

export default ContenedorPP;