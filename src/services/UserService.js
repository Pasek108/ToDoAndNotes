export function getToDoLists() {
    if (localStorage.getItem("countToDoUserLists") === null) {
        localStorage.setItem("menu4", "4;#2185D0;Osobiste");
        localStorage.setItem("menu5", "5;#A5673F;Praca");
        localStorage.setItem("menu6", "6;#FBBD08;Dom");

        localStorage.setItem("countToDoUserLists", "3");
    }

    let lists = [];
    const listsCount = parseInt(localStorage.getItem("countToDoUserLists"));

    for (let i = 4; i <= listsCount + 3; i++) {
        const menuItem = localStorage.getItem("menu" + i).split(";");
        lists.push({
            id: parseInt(menuItem[0]),
            color: menuItem[1],
            name: decodeURIComponent(menuItem[2])
        })
    }

    return lists;
}

export function deleteUserList(id) {
    const listsCount = parseInt(localStorage.getItem("countToDoUserLists"));

    let ok = false;
    for (let i = 4; i <= listsCount + 3; i++) {
        const menuItem = localStorage.getItem("menu" + i).split(";");
        if (parseInt(menuItem[0]) === id) {
            localStorage.removeItem("menu" + i);
            ok = true;
            continue;
        }

        if (ok) {
            const updateList = "" + (i - 1) + ";" + menuItem[1] + ";" + menuItem[2];
            localStorage.setItem("menu" + (i - 1), updateList);
        }
    }

    if (ok) localStorage.removeItem("menu" + (listsCount + 3));

    localStorage.setItem("countToDoUserLists", "" + (listsCount - 1));
    const response = "Succes!";
    return response;
}

export function getTasks() {
    // zadanie = id;nazwa;opis;data_utworzenia;termin;lista;ważne;powtarzalne;co_ile;ile_razy;archiwum;pod_kategorie
    // pod_kategorie = id:nazwa:opis:termin/id:nazwa:opis:termin/id:nazwa:opis:termin


    if (localStorage.getItem("countTasks") === null) {
        const tasks = [
            {
                id: 1,
                title: "Powtarzalne zadanie z terminem",
                description: "",
                creation_date: 16141928725554,
                date_of_execute: 1614194872555,
                list_id: 4,
                important: 0,
                repeat: 1,
                how_often: 0,
                how_many_times: 0,
                archive: 0,
                sub_tasks: [
                    {
                        id: 1,
                        title: "Zadanie podzrędne 1",
                        description: "",
                        date_of_execute: 0,
                        checked: 0
                    },
                    {
                        id: 2,
                        title: "Zadanie podzrędne 2",
                        description: "",
                        date_of_execute: 0,
                        checked: 1
                    },
                    {
                        id: 3,
                        title: "Zadanie podzrędne 3",
                        description: "",
                        date_of_execute: 0,
                        checked: 0
                    }
                ]
            },
            {
                id: 2,
                title: "Ważne powtarzalne zadanie bez terminu",
                description: "",
                creation_date: 16141920725555,
                date_of_execute: 0,
                list_id: 5,
                important: 1,
                repeat: 1,
                how_often: 0,
                how_many_times: 0,
                archive: 0,
                sub_tasks: [
                    {
                        id: 1,
                        title: "Zadanie podzrędne 1",
                        description: "",
                        date_of_execute: 0,
                        checked: 0
                    }
                ]
            },
            {
                id: 3,
                title: "Ważne zadanie z terminem",
                description: "",
                creation_date: 16141923785554,
                date_of_execute: 1614193882555,
                list_id: 4,
                important: 1,
                repeat: 0,
                how_often: 0,
                how_many_times: 0,
                archive: 0,
                sub_tasks: []
            }
        ]

        for (let i = 0; i < tasks.length; i++) {
            const currentTask = tasks[i];

            let task = "" + currentTask.id;
            task += ";" + currentTask.title;
            task += ";" + currentTask.description;
            task += ";" + currentTask.creation_date;
            task += ";" + currentTask.date_of_execute;
            task += ";" + currentTask.list_id;
            task += ";" + currentTask.important;
            task += ";" + currentTask.repeat;
            task += ";" + currentTask.how_often;
            task += ";" + currentTask.how_many_times;
            task += ";" + currentTask.archive;

            let subTasks = ";";
            for (let j = 0; j < currentTask.sub_tasks.length; j++) {
                const currentSubTask = currentTask.sub_tasks[j];

                (j === 0)
                    ? subTasks += "" + currentSubTask.id
                    : subTasks += "/" + currentSubTask.id;

                subTasks += ":" + currentSubTask.title;
                subTasks += ":" + currentSubTask.description;
                subTasks += ":" + currentSubTask.date_of_execute;
                subTasks += ":" + currentSubTask.checked;
            }

            task += subTasks;

            localStorage.setItem("task" + (i + 1), task);
        }

        localStorage.setItem("countTasks", tasks.length);
    }

    let tasks = [];
    const tasksCount = parseInt(localStorage.getItem("countTasks"));

    for (let i = 1; i <= tasksCount; i++) {
        const task = localStorage.getItem("task" + i).split(";");

        let subTasks = [];
        const subTasksArray = task[11].split("/");
        for (let j = 0; j < subTasksArray.length; j++) {
            const subTask = subTasksArray[j].split(":");

            subTasks.push({
                id: parseInt(subTask[0]),
                name: decodeURIComponent(subTask[1]),
                description: decodeURIComponent(subTask[2]),
                date_of_execute: parseInt(subTask[3]),
                checked: (parseInt(subTask[4]) === 1)
            });
        }

        tasks.push({
            id: parseInt(task[0]),
            title: decodeURIComponent(task[1]),
            description: decodeURIComponent(task[2]),
            creation_date: parseInt(task[3]),
            date_of_execute: parseInt(task[4]),
            list_id: parseInt(task[5]),
            important: (parseInt(task[6]) === 1),
            repeat: (parseInt(task[7]) === 1),
            how_often: parseInt(task[8]),
            how_many_times: parseInt(task[9]),
            archive: (parseInt(task[10]) === 1),
            sub_tasks: subTasks
        })
    }

    return tasks;
}

getTasks();

export function addTask() {





    const response = "Succes!";
    return response;
}