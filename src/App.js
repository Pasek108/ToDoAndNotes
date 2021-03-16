import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Icon } from 'semantic-ui-react';

import ToDo from './components/ToDo/ToDo'
import Notes from './components/Notes/Notes';
import Preferences from './components/Preferences';
import Contact from './components/Contact';
import Help from './components/Help';

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.activeItem
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onClick(name);
  }

  render() {
    let activeItem = this.state.activeItem;
    if (this.props.activeItem !== activeItem) activeItem = this.props.activeItem;

    return (
      <Menu tabular className="ui inverted menu">
        <Menu tabular className="ui inverted stackable container grid menu">
          <div className="header item three wide column" style={{ paddingLeft: "1.1rem", paddingRight: "0rem" }}>
            <div className="brand">To-do & notes</div>
            <div className="language">
              <select>
                <option value="pl">PL</option>
                <option value="en">EN</option>
              </select>
            </div>

          </div>

          <Menu.Item name="Lista zadań" active={activeItem === 'Lista zadań'} onClick={this.handleItemClick} />
          <Menu.Item name="Notatki" active={activeItem === 'Notatki'} onClick={this.handleItemClick} />

          <Menu.Menu position="right">
            <Menu.Item active={activeItem === 'Preferencje'} name="Preferencje" onClick={this.handleItemClick}>
              <Icon name="wrench" /> Preferencje
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Menu>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Lista zadań"
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  render() {
    let openPage = undefined;
    if (this.state.activeItem === "Lista zadań") openPage = <ToDo onClick={this.handleItemClick} />
    else if (this.state.activeItem === "Notatki") openPage = <Notes onClick={this.handleItemClick} />;
    else if (this.state.activeItem === "Preferencje") openPage = <Preferences />;
    else if (this.state.activeItem === "Kontakt") openPage = <Contact openHelp={() => this.handleItemClick("Pomoc")} />;
    else if (this.state.activeItem === "Pomoc") openPage = <Help openContact={() => this.handleItemClick("Kontakt")} />;

    return (
      <div>
        <PageHeader onClick={this.handleItemClick} activeItem={this.state.activeItem} />
        {openPage}
        <div className="footer">2021 © Artur Pas</div>
      </div>
    );
  }
}

export default App;
