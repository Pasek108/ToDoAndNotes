import { getLocalStorageItem, setTask } from '../helperFunctions';

export default function taskCompleted(checkedTask, subtaskId = -1) {
    const savedTask = getLocalStorageItem(`task${checkedTask.id}`);
    let savedSubtasks = [];

    if (savedTask[11] !== "") {
        const subTasksArray = savedTask[11].split("/");

        for (let j = 0; j < subTasksArray.length; j++) {
            const localStorageSubtask = subTasksArray[j].split(":");
            const subtask = {
                id: parseInt(localStorageSubtask[0]),
                name: decodeURIComponent(localStorageSubtask[1]),
                description: decodeURIComponent(localStorageSubtask[2]),
                date_of_execute: parseInt(localStorageSubtask[3]),
                checked: (parseInt(localStorageSubtask[4]) === 1)
            }

            savedSubtasks.push({
                id: subtask.id,
                name: subtask.name,
                description: subtask.description,
                date_of_execute: subtask.date_of_execute,
                checked: "1"
            });
        }
    }

    for (let j = 0; j < checkedTask.sub_tasks.length; j++) {
        if (subtaskId > -1) {
            if (subtaskId === j + 1) checkedTask.sub_tasks[j].checked = `${((!checkedTask.sub_tasks[j].checked) ? 1 : 0)}`;
            else checkedTask.sub_tasks[j].checked = `${((checkedTask.sub_tasks[j].checked) ? 1 : 0)}`;
        }
        else checkedTask.sub_tasks[j] = `${1}`;
    }

    checkedTask.important = `${((checkedTask.important) ? 1 : 0)}`;
    checkedTask.repeat = `${((checkedTask.repeat) ? 1 : 0)}`;
    if (subtaskId > -1) checkedTask.archive = `${((checkedTask.archive) ? 1 : 0)}`;
    else {
        checkedTask.archive = `${((!checkedTask.archive) ? 1 : 0)}`;
        checkedTask.sub_tasks = savedSubtasks;
    }

    setTask(`task${checkedTask.id}`, checkedTask)

    const response = "Succes!";
    return response;
}