import React from 'react';
import { Icon, Grid, Segment, Checkbox, Divider, Accordion } from 'semantic-ui-react';
import { getTasks } from '../services/UserService';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subTasks: []
        }

        this.addSubTask = this.addSubTask.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ subTasks: this.props.task.sub_tasks })
        }, 100)
    }

    addSubTask() {
        let subTasks = this.state.subTasks;

        subTasks.push({
            id: subTasks.length,
            name: "Zadanie podrzędne",
            description: "",
            date_of_execute: 0
        });

        this.setState({ subTasks: subTasks });
    }

    render() {
        const task = this.props.task;

        return (
            <Segment style={{ position: "relative", paddingTop: "1.2rem" }}>
                <strong className="task-title note-description">
                    <Checkbox style={{ fontSize: "1.2rem" }} label={task.title} />
                </strong>

                <div style={{ display: "inline-block", float: "right" }}>
                    <Icon bordered inverted color="blue"
                        size="large" className="cursor-pointer"
                        name="pencil" />
                    <Icon bordered color="red" size="large"
                        className="cursor-pointer pick-date-icon mx-auto"
                        name="calendar alternate outline" />
                </div>

                <div className="task-description">
                    {task.description}
                </div>

                {this.state.subTasks.map(elem => {
                    if (!isNaN(elem.id)) {
                        return (
                            <div key={elem.length} className="subtask">
                                <strong><Checkbox label={elem.name} checked={elem.checked}></Checkbox></strong>
                                <div className="subtask-description">
                                    {elem.description}
                                </div>
                            </div>
                        );
                    }
                })}

                <div className="subtask add-subtask cursor-pointer" onClick={this.addSubTask} style={{ marginTop: 0 }}>
                    <Icon color="green" name="plus circle" />Dodaj zadanie podrzędne
                </div>
            </Segment>
        );
    }
}

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyName: false,
            tasks: [<Task key="0" task="Zadanie" />],
            activeIndex: -1
        }

        this.input = React.createRef();
        this.addTask = this.addTask.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ tasks: getTasks() })
    }

    addTask() {
        if (this.input.current.value === "") {
            this.setState({ emptyName: true });
            return;
        } else this.setState({ emptyName: false });

        let tasks = this.state.tasks;
        tasks.push(<Task key={tasks.length} task={this.input.current.value} />);
        this.input.current.value = "";

        this.setState({ tasks: tasks });
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const active = this.props.active;
        let show = [<div className="text-center mt-40vh"><h3>Brak zadań</h3></div>];

        if (active === 0) {
            let filteredTasks = [];

            for (let i = 0; i < this.state.tasks.length; i++) {
                const task = this.state.tasks[i];
                const subTasks = task.sub_tasks;

                const taskTermTimestamp = new Date(task.date_of_execute);
                const taskTerm = {
                    day: taskTermTimestamp.getDate(),
                    month: taskTermTimestamp.getMonth() + 1,
                    year: taskTermTimestamp.getFullYear()
                };

                const nowTimestamp = new Date();
                const now = {
                    day: nowTimestamp.getDate(),
                    month: nowTimestamp.getMonth() + 1,
                    year: nowTimestamp.getFullYear()
                };

                if (!task.archive) {
                    if (taskTerm.day === now.day && taskTerm.month === now.month && taskTerm.year === now.year) {
                        filteredTasks.push(<Task key={i} task={task} />);
                    }
                    else if (subTasks !== undefined) {
                        for (let j = 0; j < subTasks.length; j++) {
                            const subTaskTermTimestamp = new Date(subTasks[j].date_of_execute);
                            const subTaskTerm = {
                                day: subTaskTermTimestamp.getDate(),
                                month: subTaskTermTimestamp.getMonth() + 1,
                                year: subTaskTermTimestamp.getFullYear()
                            };

                            if (subTaskTerm.day === now.day && subTaskTerm.month === now.month && subTaskTerm.year === now.year) {
                                filteredTasks.push(<Task key={i} task={task} />);
                            }
                        }
                    }
                }
            }

            if (filteredTasks.length > 0) show[0] = <Divider horizontal className="mt-0">Dzisiaj</Divider>;
        }
        else if (active === 1) {
            let filteredTasks = [];

            for (let i = 0; i < this.state.tasks.length; i++) {
                const task = this.state.tasks[i];
                const subTasks = task.sub_tasks;

                const taskTermTimestamp = new Date(task.date_of_execute);
                const taskTerm = {
                    day: taskTermTimestamp.getDate(),
                    month: taskTermTimestamp.getMonth() + 1,
                    year: taskTermTimestamp.getFullYear()
                };

                const nowTimestamp = new Date();
                const now = {
                    day: nowTimestamp.getDate(),
                    month: nowTimestamp.getMonth() + 1,
                    year: nowTimestamp.getFullYear()
                };

                if (!task.archive) {
                    if (taskTerm.day > now.day && taskTerm.day < now.day + 8) {
                        if(taskTerm.month === now.month && taskTerm.year === now.year) {
                            filteredTasks.push(<Task key={i} task={task} />);
                        }
                    }
                    else if(taskTerm.day < now.day) {
                        

                    }
                    
                    else if (subTasks !== undefined) {
                        for (let j = 0; j < subTasks.length; j++) {
                            const subTaskTermTimestamp = new Date(subTasks[j].date_of_execute);
                            const subTaskTerm = {
                                day: subTaskTermTimestamp.getDate(),
                                month: subTaskTermTimestamp.getMonth() + 1,
                                year: subTaskTermTimestamp.getFullYear()
                            };

                            if (subTaskTerm.day === now.day && subTaskTerm.month === now.month && subTaskTerm.year === now.year) {
                                filteredTasks.push(<Task key={i} task={task} />);
                            }
                        }
                    }
                }
            }

            if (filteredTasks.length > 0) show[0] = "";
        }
        else if (active === 2) {
            show[0] = "";
            show.push(
                <div>
                    {this.state.tasks.map((elem, index) => {
                        if (elem.important) return <Task key={index} task={elem} />
                    })}
                </div>
            )
        }
        else if (active === 3) {
            show[0] = "";
            show.push(
                <div>
                    <Divider horizontal className="mt-0">Dzisiaj</Divider>
                </div>
            )
        }
        else if (active > 3 && active < 12) {
            show[0] = "";
            show.push(
                <div>
                    <Grid columns={3} divided>
                        <Grid.Row>
                            <Grid.Column width="3" />
                            <Grid.Column width="10">
                                <input type="text" className="new-task"
                                    placeholder="Nowe zadanie" ref={this.input}
                                    style={(this.state.emptyName) ? { border: "1.5px red solid" } : {}} />
                                <button className="add-new-task cursor-pointer" onClick={this.addTask}>Dodaj</button>
                            </Grid.Column>
                            <Grid.Column width="3" />
                        </Grid.Row>
                    </Grid>

                    <Accordion>
                        <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                            <Icon name='dropdown' /> Z terminem
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 0}>
                            <Divider horizontal className="mt-0">Dzisiaj</Divider>
                            {this.state.tasks.map((elem, index) => {
                                if (elem.date_of_execute !== 0) return <Task key={index} task={elem} />
                            })}
                        </Accordion.Content>

                        <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
                            <Icon name='dropdown' /> Bez terminu
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeIndex === 1}>
                            {this.state.tasks.map((elem, index) => {
                                if (elem.date_of_execute === 0) return <Task key={index} task={elem} />
                            })}
                        </Accordion.Content>
                    </Accordion>
                </div>
            );
        }
        else if (active === 12) {
            show[0] = "";
            show.push(
                <div>
                    <Divider horizontal className="mt-0">Dzisiaj</Divider>
                    {this.state.tasks.map((elem, index) => {
                        if (elem.archive) return <Task key={index} task={elem} />
                    })}
                </div>
            )
        }


        return show;
    }
}
