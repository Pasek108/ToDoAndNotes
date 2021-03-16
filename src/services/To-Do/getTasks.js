import { getLocalStorageCounter, getLocalStorageItem, isLocalStorageItemSet } from '../helperFunctions';

export default function getTasks() {
    if (!isLocalStorageItemSet("countTasks")) {
        localStorage.setItem("countTasks", "0");
    }

    let tasks = [];
    const tasksCount = getLocalStorageCounter("countTasks");

    for (let i = 1; i <= tasksCount; i++) {
        const localStorageTask = getLocalStorageItem(`task${i}`);
        const task = {
            id: parseInt(localStorageTask[0]),
            title: decodeURIComponent(localStorageTask[1]),
            description: decodeURIComponent(localStorageTask[2]),
            creation_date: parseInt(localStorageTask[3]),
            date_of_execute: parseInt(localStorageTask[4]),
            list_id: parseInt(localStorageTask[5]),
            important: (parseInt(localStorageTask[6]) === 1),
            repeat: (parseInt(localStorageTask[7]) === 1),
            how_often: parseInt(localStorageTask[8]),
            how_many_times: parseInt(localStorageTask[9]),
            archive: (parseInt(localStorageTask[10]) === 1),
            sub_tasks: localStorageTask[11]
        };

        let subtasks = [];
        if (task.sub_tasks !== "") {
            const subtasksArray = task.sub_tasks.split("/");

            for (let j = 0; j < subtasksArray.length; j++) {
                const localStorageSubtask = subtasksArray[j].split(":");
                const subtask = {
                    id: parseInt(localStorageSubtask[0]),
                    name: decodeURIComponent(localStorageSubtask[1]),
                    description: decodeURIComponent(localStorageSubtask[2]),
                    date_of_execute: parseInt(localStorageSubtask[3]),
                    checked: (parseInt(localStorageSubtask[4]) === 1)
                }

                subtasks.push({
                    id: subtask.id,
                    name: subtask.name,
                    description: subtask.description,
                    date_of_execute: subtask.date_of_execute,
                    checked: subtask.checked
                });
            }
        }

        tasks.push({
            id: task.id,
            title: task.title,
            description: task.description,
            creation_date: task.creation_date,
            date_of_execute: task.date_of_execute,
            list_id: task.list_id,
            important: task.important,
            repeat: task.repeat,
            how_often: task.how_often,
            how_many_times: task.how_many_times,
            archive: task.archive,
            sub_tasks: subtasks
        })
    }

    return tasks;
}