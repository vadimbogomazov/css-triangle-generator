export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function splitCamelCase(str) {
    return str.split(/(?=[A-Z])/).join(' ');
}