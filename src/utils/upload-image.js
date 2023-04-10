export const checkType = file => (
    file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
);

export const checkSize = file => (file.size <= 4 * 1024 * 1024);

export default checkType;
