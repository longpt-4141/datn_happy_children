import {toast} from 'react-toastify'
import './toast-popup.scss';

export const toastError = (message) => {
    return toast.error(message, {
        className: "error-background",
        bodyClassName: "error-font-size",
        progressClassName: "error-progress-bar",
    })
}

export const toastSuccess = (message) => {
    return toast.success(message, {
        className: "success-background",
        bodyClassName: "success-font-size",
        progressClassName: "success-progress-bar",
    })
}

export const toastWarning = (message) => {
    return toast.warning(message, {
        className: "warning-background",
        bodyClassName: "warning-font-size",
        progressClassName: "warning-progress-bar",
    })
}

export const toastWaiting = () => {
    return toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}