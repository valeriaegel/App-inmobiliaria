import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast debe ser usado dentro de un ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: 'success',
    });

    const mostrarToast = (message, type = 'success') => {
        setToast({ visible: true, message, type });
    };

    const ocultarToast = () => {
        setToast(prev => ({ ...prev, visible: false }));
    };

    return (
        <ToastContext.Provider
            value={{
                toast,
                mostrarToast,
                ocultarToast,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};
