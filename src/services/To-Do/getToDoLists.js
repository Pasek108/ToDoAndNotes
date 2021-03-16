import { getLocalStorageCounter, getLocalStorageItem, isLocalStorageItemSet, setUserList } from '../helperFunctions';

const premadeLists = [
    { id: 4, name: "Osobiste", color: "#2185D0" },
    { id: 5, name: "Praca", color: "#A5673F" },
    { id: 6, name: "Dom", color: "#FBBD08" },
]

export default function getToDoLists() {
    if (!isLocalStorageItemSet("countToDoUserLists")) {
        for (let i = 0; i < premadeLists.length; i++) {
            setUserList(`menu${premadeLists[i].id}`, premadeLists[i]);
        }

        localStorage.setItem("countToDoUserLists", `${premadeLists.length}`);
    }

    let lists = [];
    const listsCount = getLocalStorageCounter("countToDoUserLists");

    for (let i = 4; i <= listsCount + 3; i++) {
        const menuItem = getLocalStorageItem(`menu${i}`);
        const userList = {
            id: parseInt(menuItem[0]),
            name: decodeURIComponent(menuItem[2]),
            color: menuItem[1]
        };

        lists.push({
            id: userList.id,
            color: userList.color,
            name: userList.name
        })
    }

    return lists;
}