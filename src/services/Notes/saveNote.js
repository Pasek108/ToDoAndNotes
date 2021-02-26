import { getLocalStorageCounter, getLocalStorageItem, setNote } from './helperFunctions';

export default function saveNote(data) {
    const notesCount = getLocalStorageCounter("countNotes");

    let newNote = {};
    newNote.id = data.id;
    newNote.title = encodeURIComponent(data.title);
    newNote.category = 1;
    newNote.align = data.align;
    newNote.note = encodeURIComponent(data.note);
    newNote.timestamp = new Date().getTime().toString();

    if (data.id === notesCount + 1) {
        setNote(`note${data.id}`, newNote);
        localStorage.setItem("countNotes", notesCount + 1);
    }
    else {
        for (let i = 1; i <= notesCount; i++) {
            const note = getLocalStorageItem(`note${i}`);

            if (parseInt(note[0]) === data.id) {
                newNote.category = note[2];
                setNote(`note${i}`, newNote);
                break;
            }
        }
    }

    const response = "Succes!";
    return response;
}