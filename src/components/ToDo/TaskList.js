import React from 'react';

import Today from './Today';
import Next7Days from './Next7Days';
import Important from './Important';
import Overdue from './Overdue';
import UserList from './UserList';
import Archive from './Archive';

import getToDoLists from '../../services/To-Do/getToDoLists';
import getTasks from '../../services/To-Do/getTasks';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyName: false,
            tasks: [],
            userLists: [],
            activeIndex: -1
        }

        this.updateTasks = this.updateTasks.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ tasks: getTasks(), userLists: getToDoLists() })
    }

    updateTasks() {
        this.setState({ tasks: getTasks() })
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const active = this.props.active;
        let show = [];

        if (active === 0) {
            show.push(
                <Today key={active}
                    tasks={this.state.tasks}
                    lists={this.state.userLists}
                    update={this.updateTasks}
                    lang={this.props.lang}
                />
            );
        }
        else if (active === 1) {
            show.push(
                <Next7Days key={active}
                    tasks={this.state.tasks}
                    lists={this.state.userLists}
                    update={this.updateTasks}
                    lang={this.props.lang}
                />
            );
        }
        else if (active === 2) {
            show.push(
                <Important key={active}
                    tasks={this.state.tasks}
                    lists={this.state.userLists}
                    update={this.updateTasks}
                    lang={this.props.lang}
                />
            );
        }
        else if (active === 3) {
            show.push(
                <Overdue key={active}
                    tasks={this.state.tasks}
                    lists={this.state.userLists}
                    update={this.updateTasks}
                    lang={this.props.lang}
                />
            );
        }
        else if (active > 3 && active < 12) {
            show.push(
                <UserList key={active}
                    tasks={this.state.tasks}
                    listId={active}
                    lists={this.state.userLists}
                    update={this.updateTasks}
                    lang={this.props.lang}
                />
            );
        }
        else if (active === 12) {
            show.push(
                <Archive key={active}
                    tasks={this.state.tasks}
                    lists={this.state.userLists}
                    update={this.updateTasks}
                    lang={this.props.lang}
                />
            )
        }

        return show;
    }
}