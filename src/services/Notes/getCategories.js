import { isLocalStorageItemSet, getLocalStorageCounter, getCategory } from '../helperFunctions';

const premadeCategories = [
    { id: 1, name: "Wszystkie", color: "#FBBD08" },
    { id: 2, name: "Praca", color: "#2185d0" },
    { id: 3, name: "Wiersze", color: "#b5cc18" },
    { id: 4, name: "Kosz", color: "#a0a0a0" }
]

function setPremadeCategories() {
    for (let i = 0; i < premadeCategories.length; i++) {
        let category = "" + premadeCategories[i].id;
        category += ";" + premadeCategories[i].name;
        category += ";" + premadeCategories[i].color;

        localStorage.setItem(`category${i + 1}`, category);
    }

    localStorage.setItem("countCategories", `${premadeCategories.length}`);
}

export default function getCategories() {
    if (!isLocalStorageItemSet("countCategories")) setPremadeCategories();

    let categories = [];
    const categoriesCount = getLocalStorageCounter("countCategories");

    for (let i = 1; i <= categoriesCount; i++) {
        categories.push(getCategory(`category${i}`, { id: true, name: true, color: true }))
    }

    return categories;
}