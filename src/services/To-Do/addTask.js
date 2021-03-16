import { getLocalStorageCounter } from '../helperFunctions';

export default function addTask(id, task) {
    localStorage.setItem(`task${id + 1}`, task);

    const tasksCount = getLocalStorageCounter("countTasks");
    localStorage.setItem("countTasks", tasksCount + 1);

    const response = "Succes!";
    return response;
}
