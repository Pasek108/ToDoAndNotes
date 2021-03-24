import React from 'react';
import { Icon, Segment, Checkbox, Grid, Modal, Header, Button, Divider } from 'semantic-ui-react';

import { calculateDateAndTime, isOverdue } from '../../services/helperFunctions';

import addSubtask from '../../services/To-Do/addSubtask';
import editTask from '../../services/To-Do/editTask';
import completeTask from '../../services/To-Do/completeTask';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            subTasks: props.task.sub_tasks,
            editSubTasks: [],
            countEditSubtasks: 0,
            showAddSubTaskModal: false,
            showEditTaskModal: false,
            save: props.lang.save
        }

        this.addSubTask = this.addSubTask.bind(this);
        this.editTask = this.editTask.bind(this);
    }

    componentDidMount() {
        const parameters = { day: true, month: true, year: true, hours: true, minutes: true }

        this.setState({
            save: this.props.lang.save,
            countEditSubtasks: this.state.subTasks.length,
            editSubTasks: this.state.subTasks.map((elem, index) => {
                const subTaskDate = calculateDateAndTime(elem.date_of_execute, parameters);
                if (elem !== undefined) {
                    return (
                        <details key={index}>
                            <summary className="cursor-pointer mb-1">{elem.name}</summary>
                            <div>
                                <input type="text"
                                    className="new-subtask edit-subtask-name"
                                    placeholder={this.props.lang.subtask_name}
                                    defaultValue={elem.name}
                                    style={{ width: "calc(100% - 1.5rem)" }} />
                                <input type="text"
                                    className="new-subtask edit-subtask-description"
                                    placeholder={this.props.lang.description}
                                    defaultValue={elem.description}
                                    style={{ width: "calc(100% - 1.5rem)" }} />
                                <div>
                                    <input type="datetime-local"
                                        className="new-subtask-date edit-subtask-date"
                                        min="2000-01-01T00:00:00" max="2038-01-01T00:00:00"
                                        defaultValue={
                                            (elem.date_of_execute !== 0)
                                                ? `${subTaskDate.year}-${subTaskDate.month}-${subTaskDate.day}T${subTaskDate.hours}:${subTaskDate.minutes}:00`
                                                : ""
                                        } />

                                    <div className="delete-subtask" onClick={() => {
                                        this.setState((state) => ({
                                            editSubTasks: state.editSubTasks.map((elem, indexx) => {
                                                if (indexx !== index) return elem;
                                                else return undefined;
                                            }),
                                            countEditSubtasks: state.countEditSubtasks - 1
                                        }))
                                    }}>{this.props.lang.delete}</div>
                                </div>
                                <Divider />
                            </div>
                        </details>
                    )
                }
            }, this.componentDidMount)
        })
    }

    addSubTask() {
        const newSubtask = document.getElementsByClassName("new-subtask");
        const newSubtaskDate = document.getElementsByClassName("new-subtask-date");

        let subTasks = this.state.subTasks;

        if (newSubtask[0].value.trim() === "") return;
        if (isNaN(newSubtaskDate[0].valueAsNumber)) newSubtaskDate[0].valueAsNumber = 3600000;

        const subTask = {
            id: subTasks.length + 1,
            name: newSubtask[0].value.trim(),
            description: newSubtask[1].value.trim(),
            date_of_execute: newSubtaskDate[0].valueAsNumber - 3600000,
            checked: 1 - 1
        };

        addSubtask(this.props.task.id, subTask);

        subTask.checked = false;
        subTasks.push(subTask);

        this.setState({ subTasks: subTasks });
    }

    editTask() {
        const taskImportant = document.getElementById("important");
        const taskName = document.getElementsByClassName("edit-task-name");
        const taskDescription = document.getElementsByClassName("edit-task-description");
        const taskDate = document.getElementsByClassName("edit-task-date");
        const list = document.getElementsByClassName("edit-task-select");
        const subTasksNames = document.getElementsByClassName("edit-subtask-name")
        const subTasksDescriptions = document.getElementsByClassName("edit-subtask-description");
        const subTaskDates = document.getElementsByClassName("edit-subtask-date");

        if (taskName[0].value.trim() === "") return;
        if (isNaN(taskDate[0].valueAsNumber)) taskDate[0].valueAsNumber = 3600000;

        let subTasks = [];
        for (let i = 0; i < subTasksNames.length; i++) {
            if (subTasksNames[i].value.trim() === "") continue;
            if (isNaN(subTaskDates[i].valueAsNumber)) subTaskDates[i].valueAsNumber = 3600000;

            subTasks.push({
                id: i,
                name: subTasksNames[i].value.trim(),
                description: subTasksDescriptions[i].value.trim(),
                date_of_execute: subTaskDates[i].valueAsNumber - 3600000,
                checked: 0 + this.props.task.sub_tasks[i].checked
            })
        }

        const task = {
            id: this.props.task.id,
            title: taskName[0].value.trim(),
            description: taskDescription[0].value.trim(),
            creation_date: new Date().getTime(),
            date_of_execute: taskDate[0].valueAsNumber - 3600000,
            list_id: parseInt(list[0].value),
            important: taskImportant.checked ? 1 : 0,
            repeat: "0",
            how_often: "0",
            how_many_times: "0",
            archive: "0",
            sub_tasks: subTasks
        };

        editTask(task);
        this.setState({ task: task, subTasks: subTasks }, this.props.update);
    }

    render() {
        const lang = this.props.lang;
        if (this.state.save !== lang.save) this.componentDidMount();

        const task = this.state.task;
        const lists = this.props.lists;
        const parameters = { day: true, month: true, year: true, hours: true, minutes: true }
        const date = calculateDateAndTime(task.date_of_execute, parameters);
        const now = calculateDateAndTime(new Date().getTime(), parameters);
        let list = {};
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === task.list_id) {
                if (lists[i].name === "Osobiste") lists[i].name = lang.personal;
                else if (lists[i].name === "Praca") lists[i].name = lang.work;
                else if (lists[i].name === "Dom") lists[i].name = lang.house;

                list = lists[i];
            }
        }

        return (
            <Segment style={{ position: "relative", paddingTop: "1.2rem", color: "black" }}>
                <Grid columns="2">
                    <Grid.Row>
                        <Grid.Column width="12">
                            <div className="mb-05">
                                <strong className="task-title note-description">
                                    <Checkbox style={{ fontSize: "1.2rem" }} label={task.title} defaultChecked={task.archive} onClick={() => { completeTask(task); this.props.update() }} />
                                </strong>
                                <div className="task-description">
                                    {task.description}
                                </div>
                            </div>

                            {this.state.subTasks.map((elem, index) => {
                                const subTaskdate = calculateDateAndTime(elem.date_of_execute, parameters);

                                return (
                                    <div key={index} className="subtask">
                                        <Grid columns="2">
                                            <Grid.Row>
                                                <Grid.Column width="12">
                                                    <strong>
                                                        <Checkbox label={elem.name} defaultChecked={elem.checked} onClick={() => { completeTask(task, elem.id); this.props.update() }} />
                                                    </strong>
                                                    <div className="subtask-description">
                                                        {elem.description}
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column width="4" className="text-right">
                                                    {(elem.date_of_execute !== 0)
                                                        ? (
                                                            <div className="task-date" style={(isOverdue(subTaskdate, now)) ? { fontWeight: "bold", color: "#db2828" } : {}}>
                                                                <div>{`${subTaskdate.hours}:${subTaskdate.minutes}:00`}</div>
                                                                <div className="ml-1">{`${subTaskdate.day}-${subTaskdate.month}-${subTaskdate.year}`}</div>
                                                            </div>
                                                        ) : ""
                                                    }
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                );
                            })}

                            <Modal size='small' style={{ color: "black" }}
                                onClose={() => this.setState({ showAddSubTaskModal: false })}
                                onOpen={() => this.setState({ showAddSubTaskModal: true })}
                                open={this.state.showAddSubTaskModal}
                                trigger={
                                    <div className="subtask add-subtask cursor-pointer" style={{ marginTop: 0 }}>
                                        <Icon color="green" name="plus circle" />{lang.add_subtask}
                                    </div>
                                }>
                                <Header icon>{lang.add_subtask}</Header>
                                <Modal.Content>
                                    <input type="text" className="new-subtask" placeholder={lang.subtask_name} />
                                    <input type="text" className="new-subtask" placeholder={lang.description} />
                                    <div>
                                        <input type="datetime-local" className="new-subtask-date" min="2000-01-01T00:00:00" max="2038-01-01T00:00:00" />
                                    </div>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button basic color='red' icon="remove" content={lang.cancel} onClick={() => this.setState({ showAddSubTaskModal: false })} />
                                    <Button color='green' icon="checkmark" content={lang.add} onClick={() => { this.addSubTask(); this.setState({ showAddSubTaskModal: false }) }} />
                                </Modal.Actions>
                            </Modal>

                        </Grid.Column>

                        <Grid.Column width="4" className="text-right">
                            <div style={{ display: "inline-block", float: "right", width: "100%" }}>
                                {(task.date_of_execute !== 0)
                                    ? (
                                        <div className="task-date" style={(isOverdue(date, now)) ? { fontWeight: "bold", color: "#db2828" } : {}}>
                                            <div>{`${date.hours}:${date.minutes}:00`}</div>
                                            <div className="ml-1">{`${date.day}-${date.month}-${date.year}`}</div>
                                        </div>
                                    )
                                    : <div className="task-date">{lang.no_term}</div>
                                }
                                <div className="task-list"><Icon name="circle" style={{ color: list.color }} /> {list.name}</div>

                                <Modal size='small' style={{ color: "black" }}
                                    onClose={() => this.setState({ showEditTaskModal: false }, this.componentDidMount)}
                                    onOpen={() => this.setState({ showEditTaskModal: true })}
                                    open={this.state.showEditTaskModal}
                                    trigger={
                                        <div>
                                            <Button color="blue" className="task-edit-button">
                                                <Icon className="cursor-pointer float-right" name="pencil" /> {lang.edit}
                                            </Button>
                                        </div>
                                    }>
                                    <Header icon>{lang.edit_task}</Header>

                                    <Modal.Content>
                                        <div className="edit-task-important">
                                            <input type="checkbox" id="important" defaultChecked={task.important} />
                                            <label htmlFor="important">{lang.important}</label>
                                        </div>
                                        <input type="text" className="new-subtask edit-task-name" placeholder={lang.task_name} defaultValue={task.title} />
                                        <input type="text" className="new-subtask edit-task-description" placeholder={lang.task_description} defaultValue={task.description} />
                                        <div style={{ display: "inline-block", width: "50%" }}>
                                            <input type="datetime-local"
                                                className="new-subtask-date edit-task-date"
                                                min="2000-01-01T00:00:00" max="2038-01-01T00:00:00"
                                                defaultValue={(task.date_of_execute !== 0) ? `${date.year}-${date.month}-${date.day}T${date.hours}:${date.minutes}:00` : ""} />
                                        </div>
                                        <div style={{ display: "inline-block", width: "50%", textAlign: "right" }}>
                                            {lang.list}:
                                            <select className="edit-task-select" defaultValue={list.id}>
                                                {lists.map(elem => {
                                                    return <option key={elem.id} value={elem.id}>{elem.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        {(this.state.countEditSubtasks > 0)
                                            ? (
                                                <div>
                                                    <Divider />
                                                    <Header as="h4" className="mt-0">{lang.subtasks}:</Header>
                                                    {this.state.editSubTasks}
                                                </div>
                                            )
                                            : ""}
                                    </Modal.Content>

                                    <Modal.Actions>
                                        <Button basic color='red' icon="remove" content={lang.cancel} onClick={() => this.setState({ showEditTaskModal: false }, this.componentDidMount)} />
                                        <Button color='green' icon="checkmark" content={lang.save} onClick={() => { this.editTask(); this.setState({ showEditTaskModal: false }) }} />
                                    </Modal.Actions>
                                </Modal>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}