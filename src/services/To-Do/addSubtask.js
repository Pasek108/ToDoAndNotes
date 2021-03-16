import { getLocalStorageCounter, getLocalStorageItem, setTask } from '../helperFunctions';

export default function addSubtask(id, newSubtask) {
    const tasksCount = getLocalStorageCounter("countTasks");

    for (let i = 1; i <= tasksCount; i++) {
        const localStorageTask = getLocalStorageItem(`task${i}`);
        const task = {
            id: localStorageTask[0],
            title: localStorageTask[1],
            description: localStorageTask[2],
            creation_date: localStorageTask[3],
            date_of_execute: localStorageTask[4],
            list_id: localStorageTask[5],
            important: localStorageTask[6],
            repeat: localStorageTask[7],
            how_often: localStorageTask[8],
            how_many_times: localStorageTask[9],
            archive: localStorageTask[10],
            sub_tasks: localStorageTask[11]
        };

        if (task.id === id) {
            let subTasks = [];

            if (task.sub_tasks !== "") {
                const subTasksArray = task.sub_tasks.split("/");

                for (let j = 0; j < subTasksArray.length; j++) {
                    const localStorageSubtask = subTasksArray[j].split(":");
                    const subtask = {
                        id: localStorageSubtask[0],
                        name: localStorageSubtask[1],
                        description: localStorageSubtask[2],
                        date_of_execute: localStorageSubtask[3],
                        checked: localStorageSubtask[4]
                    }

                    subTasks.push({
                        id: subtask.id,
                        name: subtask.name,
                        description: subtask.description,
                        date_of_execute: subtask.date_of_execute,
                        checked: subtask.checked
                    });
                }
            }

            newSubtask = {
                id: "" + newSubtask.id,
                name: encodeURIComponent(newSubtask.name),
                description: encodeURIComponent(newSubtask.description),
                date_of_execute: "" + newSubtask.date_of_execute,
                checked: "0"
            }

            subTasks.push(newSubtask);
            task.sub_tasks = subTasks;

            setTask(`task${i}`, task);
        }
    }

    const response = "Succes!";
    return response;
}