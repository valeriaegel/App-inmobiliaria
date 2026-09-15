import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';

const Toast = () => {
    const { toast, ocultarToast } = useToast();
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        if (toast.visible) {
            setIsLeaving(false);
            const timer = setTimeout(() => {
                setIsLeaving(true);
                const exitTimer = setTimeout(() => {
                    ocultarToast();
                }, 250);
                return () => clearTimeout(exitTimer);
            }, 2600);

            return () => clearTimeout(timer);
        }
    }, [toast.visible, toast.message]);

    if (!toast.visible) return null;

    const isSuccess = toast.type === 'success';

    return (
        <div className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-sm w-auto">
            <div
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all ${
                    isLeaving ? 'animate-toast-leave' : 'animate-toast-enter'
                } ${
                    isSuccess
                        ? 'bg-[#1E293B]/95 text-white border-white/20 shadow-emerald-950/20'
                        : 'bg-white/95 text-slate-800 border-slate-200 shadow-slate-900/10'
                }`}
            >
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isSuccess ? 'bg-[#0F766E] text-white animate-badge-pop' : 'bg-slate-100 text-[#0F766E]'
                    }`}
                >
                    {isSuccess ? <FaCheck className="text-xs" /> : <FaInfoCircle className="text-sm" />}
                </div>

                <p className="text-xs sm:text-sm font-semibold tracking-wide pr-2">
                    {toast.message}
                </p>

                <button
                    onClick={() => {
                        setIsLeaving(true);
                        setTimeout(ocultarToast, 200);
                    }}
                    className="p-1 rounded-lg hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
                    aria-label="Cerrar notificación"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default Toast;
