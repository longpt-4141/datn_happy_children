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