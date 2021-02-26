import { getLocalStorageCounter, getLocalStorageItem, setNote } from './helperFunctions';

export default function backupNote(id) {
    const notesCount = getLocalStorageCounter("countNotes");
    let newNote = {};

    for (let i = 1; i <= notesCount; i++) {
        const note = getLocalStorageItem(`note${i}`);

        if (parseInt(note[0]) === id) {
            newNote.id = note[0];
            newNote.title = note[1];
            newNote.category = 1;
            newNote.align = note[3];
            newNote.note = note[4];
            newNote.timestamp = new Date().getTime().toString();

            setNote(`note${i}`, newNote);
        }
    }

    const response = "Succes!";
    return response;
}