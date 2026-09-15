
function InputField({ label, name, value, onChange, placeholder, type = 'text', required = true }) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={name} className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all placeholder-slate-400 input-focus-glow"
                required={required}
            />
        </div>
    );
}

export default InputField;