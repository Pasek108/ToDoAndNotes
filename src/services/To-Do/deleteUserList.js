import { getLocalStorageCounter, getLocalStorageItem } from '../helperFunctions';

export default function deleteUserList(id) {
    const userListsCount = getLocalStorageCounter("countToDoUserLists");
    const allListsCount = userListsCount + 3;

    let deleted = false;

    for (let i = 4; i <= allListsCount; i++) {
        const menuItem = getLocalStorageItem(`menu${i}`);
        const userList = {
            id: parseInt(menuItem[0]),
            name: menuItem[2],
            color: menuItem[1]
        };

        if (userList.id === id) {
            localStorage.removeItem(`menu${i}`);
            deleted = true;
            continue;
        }

        if (deleted) {
            let updateList = "" + (i - 1);
            updateList += ";" + userList.color;
            updateList += ";" + userList.name;

            localStorage.setItem(`menu${i - 1}`, updateList);
        }
    }

    if (deleted) localStorage.removeItem(`menu${allListsCount}`);

    localStorage.setItem("countToDoUserLists", `${userListsCount - 1}`);

    const response = "Succes!";
    return response;
}