export const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}

export const formatDateShort = (value) => {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).format(new Date(value));
}

export const accountMask = (value) => {
    const mask = '**** **** **** **** $5';
    return value.replace(/(\w{2}\d{2})(\d{4})(\d{4})(\d{4})(\d{4})/, mask);
}