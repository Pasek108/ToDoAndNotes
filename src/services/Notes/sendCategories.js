import { getLocalStorageCounter, getCategory, getLocalStorageItem, setNote } from '../helperFunctions';

function saveAndRemoveCategories() {
    let oldCategories = [];
    const categoriesCount = getLocalStorageCounter("countCategories");

    for (let i = 1; i <= categoriesCount; i++) {
        oldCategories.push(getCategory(`category${i}`, { id: true, name: true, color: false }))
        localStorage.removeItem(`category${i}`);
    }

    return oldCategories;
}

function setAndSaveNewCategories(data) {
    let categories = [];

    for (let i = 0; i < data.length; i++) {
        let category = "" + (i + 1);
        category += ";" + encodeURIComponent(data[i].name);
        category += ";" + data[i].color;

        localStorage.setItem(`category${i + 1}`, category);

        categories.push({
            id: i + 1,
            name: data[i].name
        })
    }

    localStorage.setItem("countCategories", `${data.length}`);

    return categories;
}

function changeNotesCategories(oldCategories, categories) {
    const notesCount = getLocalStorageCounter("countNotes");

    for (let i = 1; i <= notesCount; i++) {
        const note = getLocalStorageItem(`note${i}`);
        let newNote = {};
        let categoryId = note[2];

        if (categoryId === oldCategories.length.toString()) {
            newNote.id = note[0];
            newNote.title = note[1];
            newNote.category = categories.length;
            newNote.align = note[3];
            newNote.note = note[4];
            newNote.timestamp = note[5];

            setNote(`note${i}`, newNote);
        }
        else {
            for (let j = 0; j < oldCategories.length; j++) {
                let ok = false;
                const oldId = oldCategories[j].id;

                for (let k = 0; k < categories.length; k++) {
                    const newId = categories[k].id;

                    if (oldCategories[j].name === categories[k].name) {
                        if (oldId !== newId && categoryId.includes(oldId.toString())) {
                            categoryId = categoryId.replace(oldId.toString(), newId.toString());

                            newNote.id = note[0];
                            newNote.title = note[1];
                            newNote.category = categoryId;
                            newNote.align = note[3];
                            newNote.note = note[4];
                            newNote.timestamp = note[5];

                            setNote(`note${i}`, newNote);
                        }

                        ok = true;
                        break;
                    }
                }

                if (!ok) {
                    categoryId = categoryId.replace("/" + oldId, "")

                    newNote.id = note[0];
                    newNote.title = note[1];
                    newNote.category = categoryId;
                    newNote.align = note[3];
                    newNote.note = note[4];
                    newNote.timestamp = note[5];

                    setNote(`note${i}`, newNote);
                }
            }
        }
    }
}

export default function sendCategories(data) {

    let oldCategories = saveAndRemoveCategories();
    let categories = setAndSaveNewCategories(data);

    changeNotesCategories(oldCategories, categories);

    const response = "Succes!";
    return response;
}