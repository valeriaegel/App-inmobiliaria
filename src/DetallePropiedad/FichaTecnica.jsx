import { FaRulerCombined, FaHome, FaBed, FaBath, FaClipboardList } from 'react-icons/fa';

const FichaTecnica = ({superficieTotal, superficieConstruida, ambientes, dormitorios, banos}) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
          <FaClipboardList className="text-xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Ficha Técnica</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {superficieTotal && (
          <div className="flex flex-col justify-center items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-slate-100/80 transition-colors">
            <FaRulerCombined className="text-[#0F766E] text-xl mb-1" />
            <span className="text-xs text-slate-500 font-medium">Sup. Total</span>
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{superficieTotal} m²</span>
          </div>
        )}

        {superficieConstruida > 0 && (
          <div className="flex flex-col justify-center items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-slate-100/80 transition-colors">
            <FaRulerCombined className="text-[#0F766E] text-xl mb-1" />
            <span className="text-xs text-slate-500 font-medium">Sup. Construida</span>
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{superficieConstruida} m²</span>
          </div>
        )}

        {ambientes != null && (
          <div className="flex flex-col justify-center items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-slate-100/80 transition-colors">
            <FaHome className="text-[#0F766E] text-xl mb-1" />
            <span className="text-xs text-slate-500 font-medium">Ambientes</span>
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{ambientes}</span>
          </div>
        )}

        {dormitorios != 0 && dormitorios != null && (
          <div className="flex flex-col justify-center items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-slate-100/80 transition-colors">
            <FaBed className="text-[#0F766E] text-xl mb-1" />
            <span className="text-xs text-slate-500 font-medium">Dormitorios</span>
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{dormitorios}</span>
          </div>
        )}

        {banos != null && (
          <div className="flex flex-col justify-center items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-slate-100/80 transition-colors">
            <FaBath className="text-[#0F766E] text-xl mb-1" />
            <span className="text-xs text-slate-500 font-medium">Baños</span>
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">{banos}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FichaTecnica;