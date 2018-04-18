export const log = (type, file, message) => {
    switch (type) {
        case "debug":
            console.debug(file,message);
            break;
        case "info":
            console.info(file,message);
            break;
        case "error":
            console.error(file,message);
            break;
        default:
            console.log(file,message);
            break;
    }
};

export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}