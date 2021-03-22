import React from 'react';
import { Divider } from 'semantic-ui-react';

import Task from './Task';

import { calculateDateAndTime, isDateEqual, sortTasks } from '../../services/helperFunctions';

export default function Today(props) {
    let show = [<div key="empty" className="text-center mt-40vh"><h3>{props.lang.no_tasks}</h3></div>];
    let filteredTasks = [];
    let taskDates = [];

    const parameters = { day: true, month: true, year: true };
    const now = calculateDateAndTime(new Date().getTime(), parameters);

    for (let i = 0; i < props.tasks.length; i++) {
        const task = props.tasks[i];
        const subTasks = task.sub_tasks;

        const taskTerm = calculateDateAndTime(task.date_of_execute, parameters);
        let key = 0;

        if (!task.archive) {
            if (isDateEqual(taskTerm, now)) {
                filteredTasks.push(<Task key={key++} task={task} lists={props.lists} update={props.update} lang={props.lang.task} />);
                taskDates.push({
                    date: task.date_of_execute,
                    important: task.important
                });
            }
            else {
                for (let j = 0; j < subTasks.length; j++) {
                    const subTaskTerm = calculateDateAndTime(subTasks[j].date_of_execute, parameters);
                    if (isDateEqual(subTaskTerm, now)) {
                        filteredTasks.push(<Task key={key++} task={task} lists={props.lists} update={props.update} lang={props.lang.task} />);
                        taskDates.push({
                            date: subTasks[j].date_of_execute,
                            important: task.important
                        });
                    }
                }
            }
        }
    }

    sortTasks(filteredTasks, taskDates);

    if (filteredTasks.length > 0) show[0] = <Divider key="today" horizontal className="mt-0">{props.lang.today}</Divider>;

    show.push(filteredTasks);

    return show;
}