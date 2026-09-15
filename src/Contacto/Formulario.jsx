import { useState } from 'react';
import InputField from './InputField';
import { FaWhatsapp, FaLock, FaComments, FaCircleNotch, FaCheck } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

const Formulario = () => {
    const { mostrarToast } = useToast();
    const [enviando, setEnviando] = useState(false);
    const [enviadoExito, setEnviadoExito] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tipoConsulta: 'compra',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviando(true);

        const { name, email, phone, tipoConsulta, message } = formData;

        const isAlquiler = tipoConsulta === 'alquiler';
        const whatsappNumber = isAlquiler ? '5493442640929' : '5493442666333';

        const titulosConsulta = {
            compra: 'Consulta sobre Compra de Inmueble',
            alquiler: 'Consulta sobre Alquiler de Inmueble',
            tasacion: 'Consulta sobre Tasaciones',
            general: 'Consulta General Inmobiliaria'
        };

        const subject = `${titulosConsulta[tipoConsulta] || 'Consulta Inmobiliaria'} - ${name}`;

        const body = `
Hola, mi nombre es ${name}.
Email: ${email || 'No especificado'}
Teléfono: ${phone}
Mi consulta es la siguiente:
${message}
        `.trim();

        const whatsappBody = `*${subject}*%0A${encodeURIComponent(body)}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappBody}`;

        mostrarToast('¡Conectando con WhatsApp!', 'success');

        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            setEnviando(false);
            setEnviadoExito(true);
            setFormData({ name: '', email: '', phone: '', tipoConsulta: 'compra', message: '' });

            setTimeout(() => {
                setEnviadoExito(false);
            }, 3000);
        }, 400);
    };

    return (
        <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0F766E]/10 text-[#0F766E] px-4 py-1.5 rounded-full text-xs font-bold border border-[#0F766E]/20">
                <FaComments /> Contacto Directo
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Nombre y Apellido *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=""
                        type="text"
                    />
                    <InputField
                        label="Correo Electrónico"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=""
                        type="email"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Número de Teléfono / WhatsApp *"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=""
                        type="tel"
                    />
                    <div>
                        <label htmlFor="tipoConsulta" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Tipo de Consulta *
                        </label>
                        <select
                            id="tipoConsulta"
                            name="tipoConsulta"
                            value={formData.tipoConsulta}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all cursor-pointer input-focus-glow"
                        >
                            <option value="compra">Compra de Inmueble</option>
                            <option value="alquiler">Alquiler de Inmueble</option>
                            <option value="tasacion">Tasaciones</option>
                            <option value="general">Consultas Generales</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                        Mensaje o Detalle del Inmueble *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all placeholder-slate-400 input-focus-glow"
                        placeholder=""
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={enviando}
                    className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl text-white font-bold text-base transition-all duration-300 btn-press cursor-pointer ${
                        enviadoExito
                            ? 'bg-emerald-600'
                            : 'bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E]'
                    }`}
                >
                    {enviando ? (
                        <>
                            <FaCircleNotch className="text-xl animate-spin" />
                            <span>Conectando con WhatsApp...</span>
                        </>
                    ) : enviadoExito ? (
                        <>
                            <FaCheck className="text-xl animate-badge-pop" />
                            <span>¡Consulta enviada a WhatsApp!</span>
                        </>
                    ) : (
                        <>
                            <FaWhatsapp className="text-xl" />
                            <span>Enviar Consulta por WhatsApp</span>
                        </>
                    )}
                </button>
            </form>

            {/* Pie de privacidad con icono de candado */}
            <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400 text-center font-medium">
                <FaLock className="text-slate-400 shrink-0 text-xs" />
                <span>Tus datos son tratados de manera estrictamente confidencial bajo ética profesional matriculada.</span>
            </div>
        </div>
    );
}

export default Formulario;
