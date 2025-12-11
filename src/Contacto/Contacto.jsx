import Formulario from './Formulario.jsx';

/**
 * Componente que muestra la sección de Contacto con un formulario.
 */
function Contacto() {
    return (
        <section className="py-16 md:py-24 bg-[#F0F2ED]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Contenedor de dos columnas (texto a la izquierda, formulario a la derecha) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <div className="lg:pr-8">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                            Consultanos
                        </h2>
                        <p className="text-lg text-gray-600">
                            Envie su mensaje.
                        </p>
                    </div>
                    
                    <div className="bg-[#C6CFCC] p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
                       <Formulario />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacto;
