import React from 'react';
import { Icon, Item, Segment, TransitionablePortal, Transition, ItemGroup } from 'semantic-ui-react';

import getCategories from '../services/Notes/getCategories';
import updateNoteCategories from '../services/Notes/updateNoteCategories';
import getNotes from '../services/Notes/getNotes';
import saveNote from '../services/Notes/saveNote';
import deleteNote from '../services/Notes/deleteNote';
import backupNote from '../services/Notes/backupNote';

import Categories from './Categories';
import CategoriesEdit from './CategoriesEdit';
import NoNotesHere from './NoNotesHere';
import NotesListElement from './NotesListElement';
import OpenNote from './OpenNote';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedTab: "Wszystkie",
      categories: [],
      categoriesList: [],
      notes: undefined,
      noteToEdit: undefined,
      showNotesElement: [],
      update: false,
      saved: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.showNote = this.showNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.backupNote = this.backupNote.bind(this);
    this.updateNoteCategories = this.updateNoteCategories.bind(this);
    this.editCategories = this.editCategories.bind(this);
    this.handleCategoriesUpdate = this.handleCategoriesUpdate.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount() {
    this.getCategories(this.getNotes);
  }

  getNotes(category) {
    this.setState({
      noteToEdit: undefined,
      showNotesElement: [<div key={"temp"}>Ładowanie...</div>],
      openedTab: undefined
    }, () => {
      this.setState({ notes: getNotes() }, () => this.handleCategoryChange(category));
    })
  }

  getCategories(callback) {
    this.setState({
      categoriesList: [<div key={"temp"}>Ładowanie...</div>]
    }, () => {
      this.setState({ categories: getCategories() }, () => {
        this.setState({
          categoriesList: <Categories
            categories={this.state.categories}
            handleCategoryChange={this.handleCategoryChange}
            handleButtonClick={this.handleButtonClick}
            editCategories={this.editCategories}
            update={this.state.update} />
        }, () => { if (callback !== undefined) callback("Wszystkie") })
      });
    });
  }

  handleCategoryChange(category) {
    const stateNotes = this.state.notes;
    let notesInCategory = [];
    for (let i = 0; i < stateNotes.length; i++) {
      if (stateNotes[i].category.includes(category)) {
        notesInCategory.push(
          <NotesListElement
            key={"" + stateNotes.id + i} id={i}
            note={stateNotes[i]}
            categories={this.state.categories}
            backupNote={this.backupNote}
            updateNoteCategories={this.updateNoteCategories}
            showNote={this.showNote}
            deleteNote={this.deleteNote}
          />
        )
      }
    }

    this.setState({
      showNotesElement: (notesInCategory.length === 0) ? [<NoNotesHere />] : notesInCategory,
      openedTab: category
    });

  }

  handleButtonClick() {
    const newNote = {
      id: this.state.notes.length + 1,
      title: "Nowa notatka",
      category: "Nowa notatka",
      align: "left",
      note: "Napisz coś",
      timestamp: new Date().getTime()
    }
    const dateTimestamp = new Date(newNote.timestamp);
    const dateAndTime = {
      seconds: dateTimestamp.getSeconds().toString().padStart(2, "0"),
      minutes: dateTimestamp.getMinutes().toString().padStart(2, "0"),
      hours: dateTimestamp.getHours().toString().padStart(2, "0"),
      day: dateTimestamp.getDate().toString().padStart(2, "0"),
      month: (dateTimestamp.getMonth() + 1).toString().padStart(2, "0"),
      year: dateTimestamp.getFullYear().toString().padStart(2, "0")
    }
    newNote.date = `${dateAndTime.day}-${dateAndTime.month}-${dateAndTime.year}`;
    newNote.time = `${dateAndTime.hours}:${dateAndTime.minutes}:${dateAndTime.seconds}`;

    this.setState({ showNotesElement: [<div>Ładowanie...</div>] }, () => {
      this.setState({
        showNotesElement: [<OpenNote saveNote={this.saveNote} id={newNote.id} note={newNote} />]
      })
    })
  }

  updateNoteCategories(id, chosenCategories) {
    updateNoteCategories(id, chosenCategories);
    this.getNotes(this.state.openedTab)
  }

  deleteNote(id) {
    deleteNote(id);
    this.getNotes(this.state.openedTab)
  }

  backupNote(id) {
    backupNote(id);
    this.getNotes(this.state.openedTab)
  }

  editCategories() {
    this.setState({ showNotesElement: [<CategoriesEdit categories={this.state.categories} update={this.handleCategoriesUpdate} />] });
  }

  handleCategoriesUpdate() {
    this.getCategories();
    this.setState((state) => ({ update: !state.update, saved: true }));
    setTimeout(() => { this.setState({ saved: false }) }, 1000);
  }

  showNote(id) {
    this.setState({ showNotesElement: [<OpenNote saveNote={this.saveNote} id={id} note={this.state.notes[id]} />] });
  }

  saveNote(note) {
    saveNote(note);
    this.getNotes(this.state.openedTab)
  }

  render() {

    return (
      <div className="ui stackable two column divided grid container" style={{ minHeight: "90vh", paddingBottom: "1rem" }}>
        <div className="three wide column">
          {this.state.categoriesList}
        </div>
        <div className="thirteen wide column h-min-85vh">
          <Transition.Group as={ItemGroup} duration={{ hide: 0, show: 250 }}>
            {this.state.showNotesElement.map((item, index) => (
              <Item key={index}>{item}</Item>
            ))}
          </Transition.Group>
        </div>

        <TransitionablePortal open={this.state.saved} transition={{ animation: "fade up", duration: 500 }} >
          <Segment className="saved-popup">
            <h3 className="popup-header">
              <Icon name="save outline" size="large" style={{ marginLeft: "-1rem", marginTop: "-.3rem" }} /> Zapisano
            </h3>
          </Segment>
        </TransitionablePortal>
      </div>
    );
  }
}