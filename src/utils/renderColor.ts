export const renderColor = (percentage: number, type: 'completed' | 'pending') => {
    if (type === 'completed') {
        if (percentage < 25) return 'danger';
        if (percentage < 50) return 'warning';
        if (percentage > 50) return 'success';
        return 'primary';
    }
    if (percentage < 25) return 'success';
    if (percentage < 50) return 'primary';
    if (percentage > 50) return 'warning';
    return 'danger';
};
