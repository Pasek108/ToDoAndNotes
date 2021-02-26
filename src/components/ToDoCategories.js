import React, { useState } from 'react';
import { Icon, Item, Divider, Modal, Button, Header } from 'semantic-ui-react';
import { getToDoLists, deleteUserList } from '../services/UserService';
import { SketchPicker } from 'react-color';

function MenuItem(props) {
    const [isMouseOver, setMouseOverFlag] = useState(0);
    const activeMenuStyle = (props.active) ? { backgroundColor: "white", fontWeight: "bold", color: "black" } : {};

    return (
        <Item
            className="todo-menu-item menu-item cursor-pointer"
            style={activeMenuStyle}
            onClick={props.onClick}
            onMouseEnter={() => { if (props.icon === "circle") setMouseOverFlag(true) }}
            onMouseLeave={() => { if (props.icon === "circle") setMouseOverFlag(false) }}
        >
            <Icon name={props.icon} style={{ color: props.color }} /> {props.name}
            <div className="to-do-category-animation-underline" style={(props.active) ? { width: "100%" } : {}} />
            {(isMouseOver)
                ? (
                    <Icon name="delete" color="red"
                        style={{ float: "right", position: "static" }}
                        onClick={(e) => { deleteUserList(props.id); e.stopPropagation(); props.refresh(props.id) }} />
                )
                : ("")
            }
        </Item>
    );
}

function NewList(props) {
    return (
        <div>
            <div className="color-pick-button">
                <Icon name="circle" style={{ color: "#000000", float: "left" }} /> Kolor
            </div>

            <input type="text" className="new-task" placeholder="Nazwa nowej listy" style={{ width: "78%" }} />

            <div className="remove-new-list-button">
                <Icon name="delete" color="red" size="large" style={{ marginRight: 0 }} />
            </div>
        </div>
    );
}

function AddListsModal(props) {
    const defaultColors = [
        '#DB2828',
        '#F2711C',
        '#FBBD08',
        '#B5CC18',
        '#21BA45',
        '#00B5AD',
        '#2185D0',
        '#6435C9',
        '#A333C8',
        '#E03997',
        '#A5673F',
        '#767676',
        '#1B1C1D'
    ]

    let newLists = [];
    newLists.push(<NewList />);

    return (
        <Modal
            onClose={props.onClose}
            onOpen={props.onOpen}
            open={props.open}
            size='small'
        >
            <Header icon>
                Dodaj nową liste
            </Header>
            <Modal.Content>
                {newLists}
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' icon="remove" content="Anuluj" onClick={props.onClose} />
                <Button color='green' icon="checkmark" content="Dodaj" onClick={props.onClose} />
            </Modal.Actions>
        </Modal>
    );
}

export default class ToDoCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            active: props.active,
            newListColor: "#000000",
            userListsCount: 0,
            addListOpen: false
        }
    }

    componentDidMount() {
        const menuItems = [
            { icon: "calendar outline", color: "#21BA45", name: "Dzisiaj" },
            { icon: "calendar alternate outline", color: "#6435C9", name: "Następne 7 dni" },
            { icon: "warning", color: "#DB2828", name: "Ważne" },
            { icon: "alarm", color: "#1B1C1D", name: "Zaległe" },
            { icon: "archive", color: "#767676", name: "Archiwum" }
        ];

        const userMenuItems = getToDoLists();

        let menu = [];
        let userMenuItemLength = userMenuItems.length;
        this.setState({ userListsCount: userMenuItemLength });

        for (let i = 0; i < 4; i++) {
            menu.push(
                <MenuItem key={menuItems[i].name}
                    active={this.state.active === i}
                    icon={menuItems[i].icon}
                    color={menuItems[i].color}
                    name={menuItems[i].name}
                    onClick={() => {
                        this.setState({ active: i }, this.componentDidMount)
                        this.props.changeCategory(i);
                    }}
                />
            );
        }

        menu.push(<Divider key={"1"} />);
        menu.push(
            <h4 style={{ marginTop: 0 }} key="2">
                Listy zadań ({userMenuItemLength}/8)
                <Icon name="plus" color="green" className="float-right cursor-pointer" onClick={() => this.setState({ addListOpen: true })} />
            </h4>
        )

        for (let i = 0; i < userMenuItemLength; i++) {
            menu.push(
                <MenuItem key={userMenuItems[i].name}
                    active={this.state.active === i + 4}
                    icon="circle"
                    id={userMenuItems[i].id}
                    color={userMenuItems[i].color}
                    name={userMenuItems[i].name}
                    onClick={() => {
                        this.setState({ active: i + 4 }, this.componentDidMount);
                        this.props.changeCategory(i + 4);
                    }}
                    refresh={(id) => {
                        if (this.state.active === id) this.setState({ active: 0 }, this.componentDidMount);
                        else if (this.state.active < id) this.componentDidMount();
                        else if (this.state.active > id) this.setState({ active: id - 1 + (this.state.active - id) }, this.componentDidMount);
                    }}
                />
            );
        }

        menu.push(<Divider key="3" />);
        menu.push(
            <MenuItem key={menuItems[4].name}
                active={this.state.active === 12}
                icon={menuItems[4].icon}
                color={menuItems[4].color}
                name={menuItems[4].name}
                onClick={() => {
                    this.setState({ active: 12 }, this.componentDidMount);
                    this.props.changeCategory(12);
                }}
            />
        );

        this.setState({ menu: menu });
    }

    render() {


        return (
            <div>
                {this.state.menu}
                <AddListsModal open={this.state.addListOpen} onClose={() => this.setState({ addListOpen: false })} onOpen={() => this.setState({ addListOpen: true })} />
            </div>
        );
    }
}