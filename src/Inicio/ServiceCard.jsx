
/*
    Componente de servicio reutilizable.
*/

function ServiceCard({ icon, title, description, items, bgColor, textColor, Link }) {
    return (
        <div className={`p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl ${bgColor}`}>
            
            {/* Ícono */}
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl mb-4 bg-white/70 ${textColor}`}>
                {icon}
            </div>

            {/* Título y Descripción */}
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {title}
            </h3>
            <p className="text-gray-600 mb-6">
                {description}
            </p>

            {/* Lista de Características */}
            <ul className="space-y-3 mb-6">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                        {/* Checkmark (simulado con emoji o ícono de check) */}
                        <span className={`mr-2 text-sm font-bold ${textColor}`}>✓</span>
                        {item}
                    </li>
                ))}
            </ul>

            {/* Enlace "Más información" */}
            <div className="mt-auto">
                <a href={`https://wa.me/5493442666333?text=${Link}`} className={`flex items-center text-sm font-semibold text-[#253E57] hover:underline`}>
                    Más información
                    <span className="ml-1 text-base">→</span>
                </a>
            </div>
        </div>
    );
}

export default ServiceCard;