import { FaRulerCombined, FaHome, FaBed, FaBath, FaClipboardList } from 'react-icons/fa';

function FichaTecnica({ inmueble }) {
    if (!inmueble) return null;

    const { SuperficieTotal, SuperficieConstruida, Ambientes, Dormitorios, Banos } = inmueble;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6 h-full flex flex-col">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                    <FaClipboardList className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Ficha Técnica</h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
                {SuperficieTotal > 0 && (
                    <div className="flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                        <FaRulerCombined className="mb-1 text-xl text-[#0F766E]" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#475569]">Sup. total</span>
                        <span className="text-base font-extrabold text-[#1E293B]">{SuperficieTotal} m²</span>
                    </div>
                )}

                {SuperficieConstruida > 0 && (
                    <div className="flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                        <FaRulerCombined className="mb-1 text-xl text-[#0F766E]" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#475569]">Sup. construida</span>
                        <span className="text-base font-extrabold text-[#1E293B]">{SuperficieConstruida} m²</span>
                    </div>
                )}

                {Ambientes > 0 && (
                    <div className="flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                        <FaHome className="mb-1 text-xl text-[#0F766E]" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#475569]">Ambientes</span>
                        <span className="text-base font-extrabold text-[#1E293B]">{Ambientes}</span>
                    </div>
                )}

                {Dormitorios > 0 && (
                    <div className="flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                        <FaBed className="mb-1 text-xl text-[#0F766E]" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#475569]">Dormitorios</span>
                        <span className="text-base font-extrabold text-[#1E293B]">{Dormitorios}</span>
                    </div>
                )}

                {Banos > 0 && (
                    <div className="flex flex-col justify-center items-center rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-center">
                        <FaBath className="mb-1 text-xl text-[#0F766E]" aria-hidden="true" />
                        <span className="text-xs font-medium text-[#475569]">Baños</span>
                        <span className="text-base font-extrabold text-[#1E293B]">{Banos}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FichaTecnica;
