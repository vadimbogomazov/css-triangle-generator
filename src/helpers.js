export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function splitCamelCase(str) {
    return str.split(/(?=[A-Z])/).join(' ');
}

export function insertToArray(arr, index, newItem) {
    return [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
    ]
}