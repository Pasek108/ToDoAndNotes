import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';

import AccordionDivider from './AccordionDivider';
import Task from './Task';

import { calculateDateAndTime, sortAccordionsByDate, isDateEqual, isOverdue, sortTasks } from '../../services/helperFunctions';

export default function Overdue(props) {
    const [activeIndex, setActive] = useState(-1);

    let show = [<div key="empty" className="text-center mt-40vh"><h3>{props.lang.no_tasks}</h3></div>];
    let accordions = [];

    const parameters = { day: true, month: true, year: true };
    const now = calculateDateAndTime(new Date().getTime(), parameters);

    let dates = [];
    let stringDates = [];
    let key = 0;

    for (let i = 0; i < props.tasks.length; i++) {
        const task = props.tasks[i];
        const subTasks = task.sub_tasks;

        let date = calculateDateAndTime(task.date_of_execute, parameters);

        const active = activeIndex === i;
        const closeOrOpen = () => { (active) ? setActive(-1) : setActive(i) };

        let skip = false;
        if (task.date_of_execute !== 0 && task.date_of_execute < new Date().getTime()) {
            for (let j = 0; j < stringDates.length; j++) {
                if (stringDates[j] === `${date.day}-${date.month}-${date.year}`) {
                    skip = true;
                    break;
                }
            }
            if (skip) continue;
            stringDates.push(`${date.day}-${date.month}-${date.year}`);

            accordions.push(
                <AccordionDivider key={key++} active={active} index={i} text={`${date.day}-${date.month}-${date.year}`} onClick={closeOrOpen} />
            );
            dates.push(task.date_of_execute);
        }
        else {
            for (let k = 0; k < subTasks.length; k++) {
                const subTaskTerm = calculateDateAndTime(subTasks[k].date_of_execute, parameters);
                date = subTaskTerm;

                for (let j = 0; j < stringDates.length; j++) {
                    if (stringDates[j] === `${date.day}-${date.month}-${date.year}`) {
                        skip = true;
                        break;
                    }
                }
                if (skip) continue;
                stringDates.push(`${date.day}-${date.month}-${date.year}`);

                if (subTasks[k].date_of_execute !== 0) {
                    accordions.push(
                        <AccordionDivider key={key++} active={active} index={i}
                            text={`${subTaskTerm.day}-${subTaskTerm.month}-${subTaskTerm.year}`}
                            onClick={closeOrOpen} />
                    );
                    dates.push(subTasks[k].date_of_execute);
                }
            }
        }

        let filteredTasks = [];
        let taskDates = [];

        for (let j = 0; j < props.tasks.length; j++) {
            const task = props.tasks[j];
            const subTasks = task.sub_tasks;

            const taskTerm = calculateDateAndTime(task.date_of_execute, parameters);

            if (!task.archive && task.date_of_execute !== 0 && task.date_of_execute < new Date().getTime()) {
                if (isOverdue(taskTerm, now)) {
                    if (isDateEqual(taskTerm, date)) {
                        filteredTasks.push(<Task key={key++} task={task} lists={props.lists} update={props.update} lang={props.lang.task} />);
                        taskDates.push({
                            date: task.date_of_execute,
                            important: task.important
                        });
                    }
                    else {
                        for (let k = 0; k < subTasks.length; k++) {
                            const subTaskTerm = calculateDateAndTime(subTasks[k].date_of_execute, parameters);

                            if (!subTaskTerm.checked && isDateEqual(subTaskTerm, date) && subTasks[k].date_of_execute !== 0 && subTasks[k].date_of_execute < new Date().getTime()) {
                                if (isOverdue(subTaskTerm, now)) {
                                    filteredTasks.push(<Task key={key++} task={task} lists={props.lists} update={props.update} lang={props.lang.task} />);
                                    taskDates.push({
                                        date: subTasks[k].date_of_execute,
                                        important: task.important
                                    });
                                }
                            }
                        }
                    }
                }
            }
            else {
                for (let k = 0; k < subTasks.length; k++) {
                    const subTaskTerm = calculateDateAndTime(subTasks[k].date_of_execute, parameters);

                    if (!subTaskTerm.checked && isDateEqual(subTaskTerm, date) && subTasks[k].date_of_execute !== 0 && subTasks[k].date_of_execute < new Date().getTime()) {
                        if (isOverdue(subTaskTerm, now)) {
                            filteredTasks.push(<Task key={key++} task={task} lists={props.lists} update={props.update} lang={props.lang.task} />);
                            taskDates.push({
                                date: subTasks[k].date_of_execute,
                                important: task.important
                            });
                        }
                    }
                }
            }
        }

        sortTasks(filteredTasks, taskDates);

        if (task.archive) {
            accordions.pop();
            dates.pop();
        }
        else {
            accordions.push(
                <Accordion.Content key={-i - 1} active={activeIndex === i}>
                    {filteredTasks}
                </Accordion.Content>
            );
        }

    }

    sortAccordionsByDate(dates, accordions, true);

    if (accordions.length > 0) show[0] = "";

    show.push(accordions);

    return <Accordion>{show}</Accordion>;
}