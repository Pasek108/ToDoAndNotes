export function isLocalStorageItemSet(name) {
    if (localStorage.getItem(name) === undefined) return false;
    else if (localStorage.getItem(name) === null) return false;
    else return true;
}

export function getLocalStorageCounter(name) {
    return parseInt(localStorage.getItem(name));
}

export function getLocalStorageItem(name) {
    return localStorage.getItem(name).split(";")
}


//notes
export function getCategory(name, parameters) {
    const category = getLocalStorageItem(name);

    let returnCategory = {};
    if (parameters.id) returnCategory.id = parseInt(category[0]);
    if (parameters.name) returnCategory.name = decodeURIComponent(category[1]);
    if (parameters.color) returnCategory.color = category[2];

    return returnCategory;
}

export function setNote(name, note) {
    let newNote = "" + note.id;
    newNote += ";" + note.title;
    newNote += ";" + note.category;
    newNote += ";" + note.align;
    newNote += ";" + note.note;
    newNote += ";" + note.timestamp;

    localStorage.setItem(name, newNote);
}


//To Do
export function setUserList(name, list) {
    let newList = "" + list.id;
    newList += ";" + list.color;
    newList += ";" + list.name;

    localStorage.setItem(name, newList);
}

export function setTask(name, currentTask) {
    let subTasks = "";
    for (let j = 0; j < currentTask.sub_tasks.length; j++) {
        const currentSubTask = currentTask.sub_tasks[j];

        if (j === 0) subTasks += "" + currentSubTask.id;
        else subTasks += "/" + currentSubTask.id;
        subTasks += ":" + currentSubTask.name;
        subTasks += ":" + currentSubTask.description;
        subTasks += ":" + currentSubTask.date_of_execute;
        subTasks += ":" + currentSubTask.checked;
    }

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
    task += ";" + subTasks;

    localStorage.setItem(name, task);
}

export function calculateDateAndTime(timestamp, { day, month, year, hours, minutes, seconds }) {
    let calculatedDate = {};
    const date = new Date(timestamp);

    if (day) calculatedDate.day = date.getDate().toString().padStart(2, "0");
    if (month) calculatedDate.month = (date.getMonth() + 1).toString().padStart(2, "0");
    if (year) calculatedDate.year = date.getFullYear();
    if (hours) calculatedDate.hours = date.getHours().toString().padStart(2, "0");
    if (minutes) calculatedDate.minutes = date.getMinutes().toString().padStart(2, "0");
    if (seconds) calculatedDate.seconds = date.getSeconds().toString().padStart(2, "0");

    return calculatedDate;
}

export function isDateEqual(date1, date2) {
    return date1.day === date2.day && date1.month === date2.month && date1.year === date2.year;
}

export function isOverdue(date, now) {
    const isOverdue = (date.year < now.year)
        || (date.day > now.day && date.month < now.month && date.year === now.year)
        || (date.day < now.day && date.month <= now.month && date.year === now.year);

    return isOverdue;
}

export function sortAccordionsByDate(dates, accordions, asc) {
    for (let i = 0; i < dates.length; i++) {
        for (let j = 0; j < dates.length; j++) {
            if (asc) {
                if (dates[i] < dates[j]) {
                    [dates[i], dates[j]] = [dates[j], dates[i]];
                    [accordions[i * 2], accordions[j * 2]] = [accordions[j * 2], accordions[i * 2]];
                    [accordions[(i * 2) + 1], accordions[(j * 2) + 1]] = [accordions[(j * 2) + 1], accordions[(i * 2) + 1]];
                }
            }
            else {
                if (dates[i] > dates[j]) {
                    [dates[i], dates[j]] = [dates[j], dates[i]];
                    [accordions[i * 2], accordions[j * 2]] = [accordions[j * 2], accordions[i * 2]];
                    [accordions[(i * 2) + 1], accordions[(j * 2) + 1]] = [accordions[(j * 2) + 1], accordions[(i * 2) + 1]];
                }
            }
        }
    }
}


export function sortTasks(filteredTasks, taskDates) {
    for (let j = 0; j < taskDates.length; j++) {
        for (let k = 0; k < taskDates.length; k++) {
            if (taskDates[j].important === taskDates[k].important) {
                if (taskDates[j].date > taskDates[k].date) {
                    [taskDates[j], taskDates[k]] = [taskDates[k], taskDates[j]];
                    [filteredTasks[j], filteredTasks[k]] = [filteredTasks[k], filteredTasks[j]];
                }
            }
            else {
                if (taskDates[j].important) {
                    if (j > k) {
                        [taskDates[j], taskDates[k]] = [taskDates[k], taskDates[j]];
                        [filteredTasks[j], filteredTasks[k]] = [filteredTasks[k], filteredTasks[j]];
                    }
                }
                else {
                    if (k > j) {
                        [taskDates[j], taskDates[k]] = [taskDates[k], taskDates[j]];
                        [filteredTasks[j], filteredTasks[k]] = [filteredTasks[k], filteredTasks[j]];
                    }
                }
            }
        }
    }
}
