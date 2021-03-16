import React, { useState } from 'react';
import { Accordion } from 'semantic-ui-react';

import AccordionDivider from './AccordionDivider';
import Task from './Task';

import { calculateDateAndTime, isDateEqual, sortTasks } from '../../services/helperFunctions';

export default function Next7Days(props) {
    const [activeIndex, setActive] = useState(-1);

    let show = [<div key="empty" className="text-center mt-40vh"><h3>Brak zadań</h3></div>];
    let accordions = [];

    const nowTimestamp = new Date();
    const parameters = { day: true, month: true, year: true };

    for (let i = 0; i < 7; i++) {
        const date = calculateDateAndTime(nowTimestamp.setDate(nowTimestamp.getDate() + 1), parameters);

        const active = activeIndex === i;
        const closeOrOpen = () => { (active) ? setActive(-1) : setActive(i) };

        if (i === 0) accordions.push(
            <AccordionDivider key={i} active={active} index={i} text="Jutro" onClick={closeOrOpen} />
        );
        else if (i === 1) accordions.push(
            <AccordionDivider key={i} active={active} index={i} text="Pojutrze" onClick={closeOrOpen} />
        );
        else accordions.push(
            <AccordionDivider key={i} active={active} index={i} text={`${date.day}-${date.month}-${date.year}`} onClick={closeOrOpen} />
        );

        let filteredTasks = [];
        let taskDates = [];

        for (let j = 0; j < props.tasks.length; j++) {
            const task = props.tasks[j];
            const subTasks = task.sub_tasks;

            const taskTerm = calculateDateAndTime(task.date_of_execute, parameters);

            if (!task.archive) {
                if (isDateEqual(taskTerm, date)) {
                    filteredTasks.push(<Task key={j} task={task} lists={props.lists} update={props.update} />);
                    taskDates.push({
                        date: task.date_of_execute,
                        important: task.important
                    });
                }
                else {
                    for (let k = 0; k < subTasks.length; k++) {
                        const subTaskTerm = calculateDateAndTime(subTasks[k].date_of_execute, parameters);
                        if (isDateEqual(subTaskTerm, date)) {
                            filteredTasks.push(<Task key={j} task={task} lists={props.lists} update={props.update} />);
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

        if (filteredTasks.length === 0) accordions.pop();
        else {
            accordions.push(
                <Accordion.Content key={i + 7} active={activeIndex === i}>
                    {filteredTasks}
                </Accordion.Content>
            );
        }
    }

    if (accordions.length > 0) show[0] = "";

    show.push(accordions);

    return <Accordion>{show}</Accordion>;
}