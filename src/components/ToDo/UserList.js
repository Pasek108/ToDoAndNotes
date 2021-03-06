import React, { useState } from 'react';
import { Icon, Grid, Accordion } from 'semantic-ui-react';

import AccordionDivider from './AccordionDivider';
import Task from './Task';

import { calculateDateAndTime, sortAccordionsByDate, isDateEqual, sortTasks } from '../../services/helperFunctions';

import addTask from '../../services/To-Do/addTask';

export default function UserList(props) {
    const [activeIndex, setActive] = useState(-1);

    let show = [<div key="empty" className="text-center"><h4>{props.lang.no_tasks}</h4></div>];
    let accordions = [];

    const parameters = { day: true, month: true, year: true };

    let dates = [];
    let stringDates = [];

    for (let i = 0; i < props.tasks.length; i++) {
        const task = props.tasks[i];
        const date = calculateDateAndTime(task.date_of_execute, parameters);

        const active = activeIndex === i;
        const closeOrOpen = () => { (active) ? setActive(-1) : setActive(i) };

        let skip = false;
        if (task.date_of_execute !== 0) {
            for (let j = 0; j < stringDates.length; j++) {
                if (stringDates[j] === `${date.day}-${date.month}-${date.year}`) {
                    skip = true;
                    break;
                }
            }
            if (skip) continue;
            stringDates.push(`${date.day}-${date.month}-${date.year}`);

            accordions.push(
                <AccordionDivider key={i} active={active} index={i} text={`${date.day}-${date.month}-${date.year}`} onClick={closeOrOpen} />
            );
            dates.push(task.date_of_execute);

            let filteredTasks = [];
            let taskDates = [];

            for (let j = 0; j < props.tasks.length; j++) {
                const task = props.tasks[j];
                const taskTerm = calculateDateAndTime(task.date_of_execute, parameters);
                let key = 0;

                if (!task.archive && task.list_id === props.listId) {
                    if (isDateEqual(taskTerm, date)) {
                        filteredTasks.push(<Task key={key++} task={task} lists={props.lists} update={props.update} lang={props.lang.task} />);
                        taskDates.push({
                            date: task.date_of_execute,
                            important: task.important
                        });
                    }
                }
            }

            sortTasks(filteredTasks, taskDates);

            if (filteredTasks.length === 0) {
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
    }

    sortAccordionsByDate(dates, accordions, false);

    if (accordions.length > 0) show[0] = "";

    show.push(accordions);

    const [activeIndexTerm, setActiveTerm] = useState(-1);

    let empty = true;
    let showNoTerm = props.tasks.map((elem, index, array) => {
        if (elem.date_of_execute === 0 && elem.list_id === props.listId && !elem.archive) {
            empty = false;
            return <Task key={index} task={elem} lists={props.lists} update={props.update} lang={props.lang.task} />;
        }
        else if (index === array.length - 1 && empty === true) return <div key="empty" className="text-center"><h4>{props.lang.no_tasks}</h4></div>;
        else return "";
    });
    if (showNoTerm.length === 0) showNoTerm = <div key="empty" className="text-center"><h4>{props.lang.no_tasks}</h4></div>;

    function addNewTask() {
        const newTask = document.getElementsByClassName("new-task")[0];

        if (newTask.value.trim() === "") {
            newTask.style.border = "1.5px red solid";
            return;
        }

        newTask.style.border = "";

        let task = "" + (props.tasks.length + 1);
        task += ";" + encodeURIComponent(newTask.value.trim());
        task += ";";
        task += ";" + new Date().getTime();
        task += ";" + 0;
        task += ";" + props.listId;
        task += ";" + 0;
        task += ";" + 0;
        task += ";" + 0;
        task += ";" + 0;
        task += ";" + 0;
        task += ";" + [];

        newTask.value = "";
        addTask(props.tasks.length, task);
        props.update();
    }

    return (
        <div>
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column width="3" />
                    <Grid.Column width="10">
                        <input type="text" className="new-task" placeholder={props.lang.new_task} />
                        <button className="add-new-task cursor-pointer" onClick={addNewTask}>{props.lang.add}</button>
                    </Grid.Column>
                    <Grid.Column width="3" />
                </Grid.Row>
            </Grid>

            <Accordion>
                <Accordion.Title style={{ color: "inherit" }} active={activeIndexTerm === 0} index={0} onClick={() => { (activeIndexTerm === 0) ? setActiveTerm(-1) : setActiveTerm(0) }}>
                    <Icon name='dropdown' /> {props.lang.with_term}
                </Accordion.Title>
                <Accordion.Content active={activeIndexTerm === 0}>
                    <Accordion>{show}</Accordion>
                </Accordion.Content>

                <Accordion.Title style={{ color: "inherit" }} active={activeIndexTerm === 1} index={1} onClick={() => { (activeIndexTerm === 1) ? setActiveTerm(-1) : setActiveTerm(1) }}>
                    <Icon name='dropdown' /> {props.lang.without_term}
                </Accordion.Title>
                <Accordion.Content active={activeIndexTerm === 1}>
                    {showNoTerm}
                </Accordion.Content>
            </Accordion>
        </div>
    );
}