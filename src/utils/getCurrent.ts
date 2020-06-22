export const getCurrent = () => {
    let current: any = localStorage.getItem('user');
    if (current) {
        try {
            current = JSON.parse(current)
        } catch (error) {
            current = {};
        }
    }
    return current;

};