export const getFormData = (formData, data, previousKey) => {
    if (data instanceof Object && !Array.isArray(data)) {
        Object.keys(data).forEach((key) => {
            const value = data[key];
            if (previousKey) {
                key = `${previousKey}[${key}]`;
            }
            formData = getFormData(formData, value, key);
        });
    } else if (Array.isArray(data)) {
        data.forEach((val, index) => {
            if (previousKey) {
                index = `${previousKey}[${index}]`;
            }
            formData = getFormData(formData, val, index);
        });
    } else {
        if (data === null) {
            data = '';
        }
        formData.append(previousKey, data);
    }

    return formData;
};