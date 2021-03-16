import { getLocalStorageCounter, getLocalStorageItem, setNote, isLocalStorageItemSet, getCategory } from '../helperFunctions';

export default function deleteNote(id) {
    let categories = [];
    const categoriesCount = getLocalStorageCounter("countCategories");

    for (let i = 1; i <= categoriesCount; i++) {
        categories.push(getCategory(`category${i}`, { id: true, name: false, color: false }));
    }

    let notesCount = getLocalStorageCounter("countNotes");
    let newNote = {};

    for (let i = 1; i <= notesCount; i++) {
        const note = getLocalStorageItem(`note${i}`);

        if (parseInt(note[0]) === id) {
            if (note[2] === categories.length.toString()) {
                localStorage.removeItem(`note${i}`);
                localStorage.setItem("countNotes", notesCount - 1);
            }
            else {
                newNote.id = note[0];
                newNote.title = note[1];
                newNote.category = categories.length;
                newNote.align = note[3];
                newNote.note = note[4];
                newNote.timestamp = new Date().getTime().toString();

                setNote(`note${i}`, newNote);
            }
        }
    }

    let ok = 0;
    for (let i = 1; i <= notesCount; i++) {
        if (!isLocalStorageItemSet(`note${i}`)) {
            ok = 1;
            continue;
        }

        const note = getLocalStorageItem(`note${i}`);

        newNote.id = note[0] - ok;
        newNote.title = note[1];
        newNote.category = note[2];
        newNote.align = note[3];
        newNote.note = note[4];
        newNote.timestamp = note[5];

        setNote(`note${i - ok}`, newNote);
    }

    if (ok === 1) localStorage.removeItem(`note${notesCount}`);

    const response = "Succes!";
    return response;
}