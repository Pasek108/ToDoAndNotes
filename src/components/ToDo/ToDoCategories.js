import React from 'react';
import { Icon, Divider } from 'semantic-ui-react';

import MenuItem from './MenuItem';
import AddListsModal from './AddListModal';

import getToDoLists from '../../services/To-Do/getToDoLists';
import addUserLists from '../../services/To-Do/addUserLists';

export default class ToDoCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            active: props.active,
            newListColor: "#000000",
            userListsCount: -1,
            addListOpen: false,
            update: false,
            today: props.lang.today
        }

        this.addLists = this.addLists.bind(this);
    }

    componentDidMount() {
        const menuItems = [
            { icon: "calendar outline", color: "#21BA45", name: this.props.lang.today },
            { icon: "calendar alternate outline", color: "#6435C9", name: this.props.lang.next_7_days },
            { icon: "warning", color: "#DB2828", name: this.props.lang.important },
            { icon: "alarm", color: "#1B1C1D", name: this.props.lang.overdue },
            { icon: "archive", color: "#767676", name: this.props.lang.archive }
        ];

        const userMenuItems = getToDoLists();

        let menu = [];
        let userMenuItemLength = userMenuItems.length;

        for (let i = 0; i < 4; i++) {
            menu.push(
                <MenuItem key={menuItems[i].name}
                    active={this.state.active === i}
                    icon={menuItems[i].icon}
                    color={menuItems[i].color}
                    name={menuItems[i].name}
                    lang={this.props.lang.delete_list}
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
                {this.props.lang.tasks_lists} ({userMenuItemLength}/8)
                <Icon name="plus" color="green" className="float-right cursor-pointer" onClick={() => this.setState({ addListOpen: true })} />
            </h4>
        )

        for (let i = 0; i < userMenuItemLength; i++) {
            if (userMenuItems[i].name === "Osobiste") userMenuItems[i].name = this.props.lang.personal;
            else if (userMenuItems[i].name === "Praca") userMenuItems[i].name = this.props.lang.work;
            else if (userMenuItems[i].name === "Dom") userMenuItems[i].name = this.props.lang.house;

            menu.push(
                <MenuItem key={userMenuItems[i].name + i}
                    active={this.state.active === i + 4}
                    icon="circle"
                    id={userMenuItems[i].id}
                    color={userMenuItems[i].color}
                    name={userMenuItems[i].name}
                    lang={this.props.lang.delete_list}
                    onClick={() => {
                        this.setState({ active: i + 4 }, this.componentDidMount);
                        this.props.changeCategory(i + 4);
                    }}
                    refresh={(id) => {
                        if (this.state.active === id) {
                            this.setState({ active: 0, update: true }, () => {
                                this.componentDidMount();
                                this.props.changeCategory(this.state.active);
                            });
                        }
                        else if (this.state.active < id) this.setState({ update: true }, this.componentDidMount);
                        else if (this.state.active > id) {
                            this.setState({ active: id - 1 + (this.state.active - id), update: true }, () => {
                                this.componentDidMount();
                                this.props.changeCategory(this.state.active);
                            });
                        }
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
                lang={this.props.lang.delete_list}
                onClick={() => {
                    this.setState({ active: 12 }, this.componentDidMount);
                    this.props.changeCategory(12);
                }}
            />
        );

        this.setState({ menu: menu, userListsCount: userMenuItemLength, today: this.props.lang.today });
    }

    addLists() {
        let lists = [];
        const colors = document.getElementsByClassName("color-circle");
        const names = document.getElementsByClassName("new-list");

        function RGBToHex(rgb) {
            rgb = rgb.substr(4).split(")")[0].split(",");

            let r = (+rgb[0]).toString(16),
                g = (+rgb[1]).toString(16),
                b = (+rgb[2]).toString(16);

            if (r.length === 1) r = "0" + r;
            if (g.length === 1) g = "0" + g;
            if (b.length === 1) b = "0" + b;

            return "#" + r + g + b;
        }

        if (colors !== undefined && names !== undefined) {
            let empty = 0;
            for (let i = 0; i < names.length; i++) {
                if (names[i].value.trim() !== "") {
                    lists.push({
                        id: this.state.userListsCount + 4 + i - empty,
                        color: RGBToHex(colors[i].style.color),
                        name: encodeURIComponent(names[i].value)
                    })
                }
                else empty++;
            }

            addUserLists(lists);
            this.setState({ update: true }, this.componentDidMount);
        }
    }

    render() {
        if (this.state.today !== this.props.lang.today) this.componentDidMount();

        if (this.state.userListsCount !== -1) {
            return (
                <div>
                    <div className="mb-6">{this.state.menu}</div>
                    <AddListsModal
                        open={this.state.addListOpen} listCount={this.state.userListsCount}
                        onClose={() => this.setState({ addListOpen: false })}
                        onOpen={() => this.setState({ addListOpen: true })}
                        addLists={() => this.addLists()}
                        dontUpdate={() => this.setState({ update: false })}
                        update={this.state.update}
                        lang={this.props.lang.add_lists} />
                </div>
            );
        }
        else return "";
    }
}