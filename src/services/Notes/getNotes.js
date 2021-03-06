import {
    calculateDateAndTime,
    isLocalStorageItemSet,
    getLocalStorageCounter,
    getCategory,
    getLocalStorageItem
} from '../helperFunctions';


export default function getNotes() {
    if (!isLocalStorageItemSet("countNotes")) localStorage.setItem("countNotes", "0");

    let categories = [];
    const categoriesCount = getLocalStorageCounter("countCategories");

    for (let i = 1; i <= categoriesCount; i++) {
        categories.push(getCategory(`category${i}`, { id: true, name: true, color: false }))
    }

    let notes = [];
    const notesCount = getLocalStorageCounter("countNotes");

    for (let i = 1; i <= notesCount; i++) {
        const note = getLocalStorageItem(`note${i}`);
        notes.push(
            {
                id: parseInt(note[0]),
                title: decodeURIComponent(note[1]),
                category: note[2].split("/").map((id) => {
                    for (let j = 0; j < categories.length; j++) {
                        if (parseInt(id) === categories[j].id) {
                            return decodeURIComponent(categories[j].name);
                        }
                    }
                }),
                align: note[3],
                note: decodeURIComponent(note[4]),
                timestamp: new Date(parseInt(note[5])).getTime()
            }
        )

        const parameters = { day: true, month: true, year: true, hours: true, minutes: true, seconds: true };
        const dateAndTime = calculateDateAndTime(notes[i - 1].timestamp, parameters);
        notes[i - 1].date = `${dateAndTime.day}-${dateAndTime.month}-${dateAndTime.year}`;
        notes[i - 1].time = `${dateAndTime.hours}:${dateAndTime.minutes}:${dateAndTime.seconds}`;

        if (notes.length > 0) {
            for (let j = notes.length - 1; j > 0; j--) {
                if (notes[j].timestamp > notes[j - 1].timestamp) {
                    [notes[j], notes[j - 1]] = [notes[j - 1], notes[j]];
                }
                else break;
            }
        }
    }

    return notes;
}