import React from 'react';
import { Icon, Item, Segment, TransitionablePortal, Transition, ItemGroup } from 'semantic-ui-react';
import { updateNoteCategories, getNotes, deleteNote, backupNote } from '../services/UserService'
import NoteEdit from './NoteEdit';
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
      notes: undefined,
      noteToEdit: undefined,
      showNotesElement: [],
      update: false,
      saved: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.editNote = this.editNote.bind(this);
    this.showNote = this.showNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.backupNote = this.backupNote.bind(this);
    this.updateNoteCategories = this.updateNoteCategories.bind(this);
    this.editCategories = this.editCategories.bind(this);
    this.handleCategoriesUpdate = this.handleCategoriesUpdate.bind(this);
  }

  componentDidMount() {
    getNotes().then(getNotes => {
      this.setState({ notes: getNotes }, () => this.handleCategoryChange("Wszystkie"));
    });
  }

  handleCategoryChange(category) {
    this.setState({
      noteToEdit: undefined,
      showNotesElement: [],
      openedTab: category
    });

    const stateNotes = this.state.notes;
    let notesInCategory = [];
    for (let i = 0; i < stateNotes.length; i++) {
      if (stateNotes[i].category.includes(category)) {
        notesInCategory.push(
          <NotesListElement
            key={"" + stateNotes.id + i} id={i}
            note={stateNotes[i]}
            backupNote={this.backupNote}
            updateNoteCategories={this.updateNoteCategories}
            showNote={this.showNote}
            deleteNote={this.deleteNote}
          />
        )
      }
    }

    if (notesInCategory.length === 0) this.setState({ showNotesElement: [<NoNotesHere />] });
    else this.setState({ showNotesElement: notesInCategory });
  }

  handleButtonClick() {
    const noteEdit = [<NoteEdit note={this.state.notes[this.state.noteToEdit]} />];
    this.setState({ showNotesElement: noteEdit });
  }

  editNote(id) {
    this.setState({ noteToEdit: id }, this.handleButtonClick);
  }

  updateNoteCategories(id, chosenCategories) {
    updateNoteCategories(id, chosenCategories).then(succes => {
      getNotes().then(getNotes => {
        this.setState({ notes: getNotes }, () => this.handleCategoryChange(this.state.openedTab));
      });
    });
  }

  deleteNote(id) {
    deleteNote(id).then(succes => {
      getNotes().then(getNotes => {
        this.setState({ notes: getNotes }, () => this.handleCategoryChange(this.state.openedTab));
      });
    });
  }

  backupNote(id) {
    backupNote(id).then(succes => {
      getNotes().then(getNotes => {
        this.setState({ notes: getNotes }, () => this.handleCategoryChange(this.state.openedTab));
      });
    });
  }

  editCategories() {
    this.setState({ showNotesElement: [<CategoriesEdit update={this.handleCategoriesUpdate} />] });
  }

  handleCategoriesUpdate() {
    getNotes().then(getNotes => {
      this.setState({ notes: getNotes }, () => this.handleCategoryChange("Wszystkie"));
    });
    this.setState((state) => ({ update: !state.update, saved: true }));
    setTimeout(() => { this.setState({ saved: false }) }, 1000);
  }

  showNote(id) {
    this.setState({ showNotesElement: [<OpenNote id={id} note={this.state.notes[id]} editNote={this.editNote} />] });
  }

  render() {
    return (
      <div className="ui stackable two column divided grid container">
        <div className="three wide column">
          <Categories
            handleCategoryChange={this.handleCategoryChange}
            handleButtonClick={this.handleButtonClick}
            editCategories={this.editCategories}
            update={this.state.update} />
        </div>
        <div className="thirteen wide column h-min-85vh">
          <Transition.Group as={ItemGroup} duration={{ hide: 0, show: 250 }}>
            {this.state.showNotesElement.map((item, index) => (
              <Item key={index}>
                {this.state.showNotesElement[index]}
              </Item>
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
