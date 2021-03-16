import { getLocalStorageCounter, getCategory, getLocalStorageItem, setNote } from '../helperFunctions';

export default function updateNoteCategories(id, chosenCategories) {
    let categories = [];
    const categoriesCount = getLocalStorageCounter("countCategories");

    for (let i = 1; i <= categoriesCount; i++) {
        categories.push(getCategory(`category${i}`, { id: true, name: false, color: false }))
    }

    const notesCount = getLocalStorageCounter("countNotes");
    let newNote = {};

    for (let i = 1; i <= notesCount; i++) {
        const note = getLocalStorageItem(`note${i}`);

        if (parseInt(note[0]) === id) {
            let category = note[2];

            for (let i = 0; i < chosenCategories.length; i++) {
                const categoryName = categories[i + 1].id;

                if (chosenCategories[i]) {
                    if (!category.includes(categoryName)) category += "/" + categoryName;
                }
                else if (category.includes(categoryName)) category = category.replace("/" + categoryName, "");
            }

            newNote.id = note[0];
            newNote.title = note[1];
            newNote.category = category;
            newNote.align = note[3];
            newNote.note = note[4];
            newNote.timestamp = new Date().getTime().toString();

            setNote(`note${i}`, newNote);
        }
    }

    const response = "Succes!";
    return response;
}