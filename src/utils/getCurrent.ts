export const getCurrent = () => {
    let current: any = sessionStorage.getItem('user');
    if (current) {
        try {
            current = JSON.parse(current)
        } catch (error) {
            current = {};
        }
    }
    return current;

};