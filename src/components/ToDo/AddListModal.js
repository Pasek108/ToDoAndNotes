import React from 'react';
import { Icon, Modal, Button, Header } from 'semantic-ui-react';

import NewList from './NewList';

export default class AddListsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLists: [],
            userListsCount: props.listCount,
            update: props.update
        }

        this.keyCount = 0;

        this.pushNewList = this.pushNewList.bind(this);
        this.deleteNewList = this.deleteNewList.bind(this);
    }

    componentDidMount() {
        this.props.dontUpdate();
        this.setState({ newLists: [], userListsCount: this.props.listCount }, () => {
            this.pushNewList(true);
        });
    }

    pushNewList(reload) {
        let newLists = this.state.newLists;
        const listCount = this.state.userListsCount;
        const listLength = newLists.length;

        if (listCount > 7) {
            if (newLists[listLength - 1] !== "stop") {
                newLists.push("stop");
                this.setState({ newLists: newLists });
            }
            return;
        }
        if (reload) {
            newLists.push("start");
            if (listLength >= 1) newLists.pop();
            return;
        }
        else if (reload && listLength > 0) newLists.pop();
        else {
            if (newLists[listLength - 1] === "start" || newLists[listLength - 1] === "stop") newLists.pop();
            newLists.push(this.keyCount++);
        }
        this.setState({ newLists: newLists, userListsCount: listCount + 1 });
    }

    deleteNewList(id) {
        let newLists = this.state.newLists;
        newLists.splice(id, 1);
        if (newLists[newLists.length - 1] === "start" || newLists[newLists.length - 1] === "stop") newLists.pop();
        if (newLists.length === 0) newLists.push("start");
        this.setState({ newLists: newLists, userListsCount: this.state.userListsCount - 1 });
    }

    render() {
        const lang = this.props.lang;
        if (this.state.update !== this.props.update) this.setState({ update: this.props.update })
        if (this.state.update && (this.state.newLists.length > 0 || this.state.userListsCount === 8)) {
            this.setState({ update: false }, this.componentDidMount)
        }

        return (
            <Modal onClose={this.props.onClose} onOpen={this.props.onOpen} open={this.props.open} size='small'>
                <Header icon>
                    {lang.add_new_lists} ({lang.available}: {8 - this.state.userListsCount})
                </Header>
                <Modal.Content>
                    {this.state.newLists.map((elem, index) => {
                        if (elem === "stop") return <div key={elem} className="text-center mt-05">{lang.reached_lists_limit}</div>
                        else if (elem === "start") return <div key={elem} className="text-center mt-05">{lang.add_new_lists}</div>
                        else return <NewList key={elem} i={index} onClick={() => this.deleteNewList(index)} lang={lang} />
                    })}
                    <div className="subtask add-subtask cursor-pointer" onClick={() => this.pushNewList(false)} style={{ margin: 0, paddingLeft: 0 }}>
                        <Icon color="green" name="plus circle" />{lang.add_next_list}
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' icon="remove" content={lang.cancel} onClick={this.props.onClose} />
                    <Button color='green' icon="checkmark" content={lang.add} onClick={() => { this.props.addLists(); this.props.onClose() }} />
                </Modal.Actions>
            </Modal>
        );
    }
}