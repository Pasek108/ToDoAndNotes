import { getLocalStorageCounter, setUserList } from '../helperFunctions';

export default function addUserLists(lists) {
    const listsCount = getLocalStorageCounter("countToDoUserLists");

    for (let i = 0; i < lists.length; i++) {
        setUserList(`menu${lists[i].id}`, lists[i])
    }

    localStorage.setItem("countToDoUserLists", `${listsCount + lists.length}`);

    const response = "Succes!";
    return response;
}
