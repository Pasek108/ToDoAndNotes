export function isLocalStorageItemSet(name) {
    if (localStorage.getItem(name) === undefined) return false;
    else if (localStorage.getItem(name) === null) return false;
    else return true;
}

export function getLocalStorageCounter(name) {
    return parseInt(localStorage.getItem(name));
}

export function getLocalStorageItem(name) {
    return localStorage.getItem(name).split(";")
}

export function getCategory(name, parameters) {
    const category = getLocalStorageItem(name);

    let returnCategory = {};
    if (parameters.id) returnCategory.id = parseInt(category[0]);
    if (parameters.name) returnCategory.name = decodeURIComponent(category[1]);
    if (parameters.color) returnCategory.color = category[2];

    return returnCategory;
}

export function setNote(name, note) {
    let newNote = "" + note.id;
    newNote += ";" + note.title;
    newNote += ";" + note.category;
    newNote += ";" + note.align;
    newNote += ";" + note.note;
    newNote += ";" + note.timestamp;

    localStorage.setItem(name, newNote);
}