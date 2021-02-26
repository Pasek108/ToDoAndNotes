import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Input } from 'semantic-ui-react';
import ToDo from './components/ToDo'
import Notes from './components/Notes';

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Lista zadań"
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onClick(name);
  }

  render() {
    const activeItem = this.state.activeItem;

    return (
      <Menu tabular className="ui inverted menu">
        <Menu tabular className="ui inverted stackable container grid menu">
          <div className="header item three wide column">
            <div className="brand">To-do i notes</div>
          </div>
          <Menu.Item
            name="Lista zadań"
            active={activeItem === 'Lista zadań'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Notatki"
            active={activeItem === 'Notatki'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                icon={{ name: "search", link: true }}
                placeholder="Szukaj"
              />
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
    (this.state.activeItem === "Lista zadań") ? openPage = <ToDo /> : openPage = <Notes />;

    return (
      <div>
        <PageHeader onClick={this.handleItemClick} />
        {openPage}
      </div>
    );
  }
}

export default App;
