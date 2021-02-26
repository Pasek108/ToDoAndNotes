import React from 'react';
import { Button, Icon, Radio, Popup, Item, Accordion } from 'semantic-ui-react';
import { getCategories, getNotes } from '../services/UserService'
import NoteEdit from './NoteEdit';

function AllNotes(props) {
  let notes = [];
  if (props.notes !== undefined) {
    for (let i = 0; i < props.notes.length; i++) {
      if (props.notes[i].category.includes(props.category)) {
        notes.push(
          <Item>
            <Item.Content className="p-0">
              <Item.Header>{props.notes[i].title}</Item.Header>
              <Item.Meta className="note-description">{props.notes[i].note}</Item.Meta>
            </Item.Content>
          </Item>
        );
      }
    }
  }

  return (
    <Item.Group>
      {notes}
    </Item.Group>
  );
}

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
      categoriesList: [],
      notes: undefined
    }

    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  handleAccordionClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  getCategories(e) {
    getCategories(this.state.user)
      .then(categories => {
        this.setState({ categoriesList: categories.categories })
        this.setState({ notes: categories.notes })
      });
  }

  render() {
    const activeIndex = this.state.activeIndex;
    this.getCategories();

    let categoriesList = [];
    for (let i = 0; i < this.state.categoriesList.length; i++) {
      categoriesList.push(
        <div>
          <Accordion.Title
            active={activeIndex === i}
            index={i}
            onClick={this.handleAccordionClick}>
            {this.state.categoriesList[i]}
            <div className="dropdownIcon">
              <Icon name="dropdown" fitted />
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            <AllNotes notes={this.state.notes} category={this.state.categoriesList[i]} />
          </Accordion.Content>
        </div>
      );
    }

    return (
      <div className="ui relaxed divided items">
        <Item>
          <Button className="mx-auto" color="green">
            <Icon style={{ opacity: "1" }} name="plus" />
            Dodaj notatke
          </Button>
        </Item>
        <h4>Kategorie</h4>
        <Item>
          <Accordion fluid styled>
            {categoriesList}
          </Accordion>
        </Item>
      </div>
    );
  }
}

export default class Notes extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="ui stackable two column divided grid container">
        <div className="three wide column">
          <NoteList />
        </div>
        <div className="thirteen wide column">
          <NoteEdit />
        </div>
      </div>
    );
  }
}
