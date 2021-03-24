import { setTask } from '../helperFunctions';

export default function editTask(editedTask) {
    for (let i = 0; i < editedTask.sub_tasks.length; i++) {
        editedTask.sub_tasks[i] = {
            id: "" + editedTask.sub_tasks[i].id,
            name: encodeURIComponent(editedTask.sub_tasks[i].name),
            description: encodeURIComponent(editedTask.sub_tasks[i].description),
            date_of_execute: "" + editedTask.sub_tasks[i].date_of_execute,
            checked: "" + editedTask.sub_tasks[i].checked
        }
    }

    editedTask = {
        id: "" + editedTask.id,
        title: encodeURIComponent(editedTask.title),
        description: encodeURIComponent(editedTask.description),
        creation_date: "" + editedTask.creation_date,
        date_of_execute: "" + editedTask.date_of_execute,
        list_id: "" + editedTask.list_id,
        important: "" + editedTask.important,
        repeat: editedTask.repeat,
        how_often: editedTask.how_often,
        how_many_times: editedTask.how_many_times,
        archive: editedTask.archive,
        sub_tasks: editedTask.sub_tasks
    };
    
    setTask(`task${editedTask.id}`, editedTask)

    const response = "Succes!";
    return response;
}