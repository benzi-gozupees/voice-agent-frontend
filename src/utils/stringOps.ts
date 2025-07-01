export const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeFileExtension = (fileName: string): string => fileName.replace(/\.[^/.]+$/, '');

export const getFileExtension = (fileName: string): string => fileName.split('.').pop() || '';
