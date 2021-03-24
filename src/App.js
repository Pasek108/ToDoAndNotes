import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Icon } from 'semantic-ui-react';

import ToDo from './components/ToDo/ToDo'
import Notes from './components/Notes/Notes';
import Preferences from './components/Preferences';
import Contact from './components/Contact';
import Help from './components/Help';


const lang_en = {
  menu: {
    to_do: "Tasks list",
    notes: "Notes",
    preferences: "Preferences",
    contact: "Contact",
    help: "Help"
  },
  to_do_list: {
    lists: {
      today: "Today",
      next_7_days: "Next 7 days",
      important: "Important",
      overdue: "Overdue",
      tasks_lists: "Tasks lists",
      personal: "Personal",
      work: "Work",
      house: "House",
      archive: "Archive",
      contact: "Contact",
      help: "Help",
      add_lists: {
        add_new_lists: "Add new lists",
        available: "available",
        add_next_list: "Add new list",
        color: "Color",
        new_list_name: "New list name",
        reached_lists_limit: "Reached lists limit",
        add: "Add",
        delete: "Delete",
        cancel: "Cancel"
      },
      delete_list: {
        warning: "WARNING",
        warning_text: "Deleting a list will delete its tasks permanently",
        cancel: "Cancel",
        confirm: "Confirm"
      }
    },
    tasks_window: {
      no_tasks: "No tasks",
      new_task: "NewTask",
      with_term: "With deadline",
      without_term: "Without deadline",
      today: "Today",
      tomorrow: "Tomorrow",
      day_after_tomorrow: "Day after tomorrow",
      add: "Add",
      task: {
        add_subtask: "Add subtask",
        subtask_name: "Subtask name",
        description: "Description",
        edit_task: "Edit task",
        important: "Important",
        task_name: "Task name",
        task_description: "Task description",
        no_term: "No deadline",
        list: "List",
        subtasks: "Subtasks",
        personal: "Personal",
        work: "Work",
        house: "House",
        save: "Save",
        add: "Add",
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel"
      }
    }
  },
  notes: {
    loading: "Loading",
    new_note: "New note",
    write_something: "Write some text",
    categories: {
      add_note: "Add new note",
      categories: "Categories",
      edit_categories: "Edit categories",
      all: "All",
      work: "Work",
      poems: "Poems",
      recyle_bin: "Recyle bin",
      contact: "Contact",
      help: "Help"
    },
    categories_edit: {
      number_of_categories: "Number of categories",
      add_category: "Add category",
      new_category: "New category",
      work: "Work",
      poems: "Poems",
      click_to_change_name: "Click to change name",
      change_color: "Change color",
      delete: "Delete",
      save: "Save"
    },
    no_notes: "No notes found",
    note: {
      no_categories: "No categories",
      change_categories: "Change categories",
      all: "All",
      work: "Work",
      poems: "Poems",
      restore: "Restore",
      delete: "Delete",
      move_to_the_bin: "Move to the recyle bin",
      warning: "WARNING",
      warning_text_delete: "Deleting a note from the recycle bin is permanent, it can't be restored",
      warning_text_move_to_the_bin: "Moving note to the recyle bin will cause permanently delete categories assigned to it",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save"
    },
    edit_note: {
      edit: "Edit",
      preview: "Preview",
      restore: "Restore",
      save: "Save",
      pin_note: "Pin note",
      title: "Title",
      write_something: "Write some text",
      bold: "Bold",
      italics: "Italics",
      underline: "Underline",
      strikethrough: "Strikethrough",
      align_text_left: "Align left",
      center_text: "Center",
      align_text_right: "Align right",
      justify_text: "Justify"
    }
  },
  preferences: {
    theme: "Theme",
    dark_theme: "Dark theme",
    auto_change_theme: "Auto change theme",
    from: "From",
    to: "To",
    theme_type: "Theme type",
    light: "Light",
    dark: "Dark",
    neutral: "Neutral",
    warm: "Warm",
    cold: "Cold",
    import: "Import",
    export: "Export",
    other: "Others",
    turn_off_animations: "Turn off animations",
    turn_off_warnings: "Turn off warnings",
    auto_save_notes: "Auto save notes",
    restore_default_settings: "Restore default settings"
  },
  contact: {
    contact: "Contact",
    welcome: "Welcome to the contact page",
    questions_list: {
      bug: "Did you find a bug",
      question: "Do you have a question that doesn't have an answer in the ",
      help: "help",
      change: "Do you have an idea for improvement"
    },
    describe_problem: "If you answered yes for one of this questions, write to me using field below, try describe your problem as best as you can",
    write_a_message: "Write a message",
    list_of_known_bugs: "List of known bugs",
    no_known_bugs: "No known bugs"

  },
  help: {

  },
  add: "Dodaj",
  edit: "Edytuj",
  delete: "Usuń",
  cancel: "Anuluj"
}

const lang_pl = {
  menu: {
    to_do: "Lista Zadań",
    notes: "Notatki",
    preferences: "Preferencje",
    contact: "Kontakt",
    help: "Pomoc"
  },
  to_do_list: {
    lists: {
      today: "Dzisiaj",
      next_7_days: "Następne 7 dni",
      important: "Ważne",
      overdue: "Zaległe",
      tasks_lists: "Listy zadań",
      personal: "Osobiste",
      work: "Praca",
      house: "Dom",
      archive: "Archiwum",
      contact: "Kontakt",
      help: "Pomoc",
      add_lists: {
        add_new_lists: "Dodaj nowe listy",
        available: "pozostało",
        add_next_list: "Dodaj nową liste",
        color: "Kolor",
        new_list_name: "Nazwa nowej listy",
        reached_lists_limit: "Osiągnięto limit list",
        add: "Dodaj",
        delete: "Usuń",
        cancel: "Anuluj"
      },
      delete_list: {
        warning: "UWAGA",
        warning_text: "Usunięcie listy spowoduje trwałe usunięcie znajdujących się w niej zadań",
        cancel: "Anuluj",
        confirm: "Potwierdź"
      }
    },
    tasks_window: {
      no_tasks: "Brak zadań",
      new_task: "Nowe zadanie",
      with_term: "Z terminem",
      without_term: "Bez terminu",
      today: "Dzisiaj",
      tomorrow: "Jutro",
      day_after_tomorrow: "Pojutrze",
      add: "Dodaj",
      task: {
        add_subtask: "Dodaj zadanie podrzędne",
        subtask_name: "Nazwa zadanie podrzędnego",
        description: "Opis",
        edit_task: "Edytuj zadanie",
        important: "Ważne",
        task_name: "Nazwa zadania",
        task_description: "Opis zadania",
        no_term: "Brak terminu",
        list: "Lista",
        subtasks: "Zadania podrzędne",
        personal: "Osobiste",
        work: "Praca",
        house: "Dom",
        save: "Zapisz",
        add: "Dodaj",
        edit: "Edytuj",
        delete: "Usuń",
        cancel: "Anuluj"
      }
    }
  },
  notes: {
    loading: "Ładowanie",
    new_note: "Nowa notatka",
    write_something: "Napisz coś",
    categories: {
      add_note: "Dodaj notatke",
      categories: "Kategorie",
      edit_categories: "Edytuj kategorie",
      all: "Wszystkie",
      work: "Praca",
      poems: "Wiersze",
      recyle_bin: "Kosz",
      contact: "Kontakt",
      help: "Pomoc"
    },
    categories_edit: {
      number_of_categories: "Liczba kategorii",
      add_category: "Dodaj kategorie",
      new_category: "Nowa kategoria",
      work: "Praca",
      poems: "Wiersze",
      click_to_change_name: "Kliknij aby zmienić nazwę",
      change_color: "Zmień kolor",
      delete: "Usuń",
      save: "Zapisz"
    },
    no_notes: "Brak notatek",
    note: {
      no_categories: "Brak kategorii",
      change_categories: "Zmień kategorie",
      all: "Wszystkie",
      work: "Praca",
      poems: "Wiersze",
      restore: "Przywróć",
      delete: "Usuń",
      move_to_the_bin: "Przenieś do kosza",
      warning: "UWAGA",
      warning_text_delete: "Usunięcie notatki z kosza jest trwałe, nie ma możliwości jej przywrócenia",
      warning_text_move_to_the_bin: "Przniesienie notatki do kosza spowoduje nieodwracalne usunięcie przypisanych do niej kategorii",
      cancel: "Anuluj",
      confirm: "Potwierdź",
      save: "Zapisz"
    },
    edit_note: {
      edit: "Edytuj",
      preview: "Podgląd",
      restore: "Przywróć",
      save: "Zapisz",
      pin_note: "Przypnij notatke",
      title: "Tytuł",
      write_something: "Napisz coś",
      bold: "Pogrubienie",
      italics: "Pochylenie",
      underline: "Podkreślenie",
      strikethrough: "Przekreślenie",
      align_text_left: "Wyrównanie do lewej",
      center_text: "Wyśrodkowanie",
      align_text_right: "Wyrównanie do prawej",
      justify_text: "Wyjustowanie"
    }
  },
  preferences: {
    theme: "Motyw",
    dark_theme: "Ciemny motyw",
    auto_change_theme: "Automatyczna zmiana motywu",
    from: "Od",
    to: "Do",
    theme_type: "Typ motywu",
    light: "Jasny",
    dark: "Ciemny",
    neutral: "Neutralny",
    warm: "Ciepły",
    cold: "Zimny",
    import: "Import",
    export: "Eksport",
    other: "Pozostałe",
    turn_off_animations: "Wyłącz animacje",
    turn_off_warnings: "Wyłącz ostrzeżenia",
    auto_save_notes: "Autozapis notatek",
    restore_default_settings: "Przywróć ustawienia domyślne"
  },
  contact: {
    contact: "Kontakt",
    welcome: "Witaj na stronie kontaktowej",
    questions_list: {
      bug: "Zauważyłeś błąd",
      question: "Masz pytanie którego nie ma w ",
      help: "pomocy",
      change: "Masz pomysł na zmianę"
    },
    describe_problem: "Jeśli tak, napisz do mnie używając pola poniżej, postaraj się jak najdokładniej opisać swój problem",
    write_a_message: "Napisz wiadomość",
    list_of_known_bugs: "Lista znanych problemów",
    no_known_bugs: "Brak"

  },
  help: {

  },
  add: "Dodaj",
  edit: "Edytuj",
  delete: "Usuń",
  cancel: "Anuluj"
}

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
    const lang = this.props.lang;
    let activeItem = this.state.activeItem;
    if (this.props.activeItem !== activeItem) activeItem = this.props.activeItem;
    const activeLanguage = localStorage.getItem("lang");

    return (
      <Menu tabular className="ui inverted menu" style={{color: "whitesmoke"}}>
        <Menu tabular className="ui inverted stackable container grid menu">
          <div className="header item three wide column" style={{ paddingLeft: "1.1rem", paddingRight: "0rem" }}>
            <div className="brand">To-do & notes</div>
            <div className="language">
              <select onChange={this.props.changeLanguage} defaultValue={activeLanguage}>
                <option value="pl">PL</option>
                <option value="en">EN</option>
              </select>
            </div>

          </div>

          <Menu.Item name={lang.to_do} active={activeItem === lang.to_do} onClick={this.handleItemClick} />
          <Menu.Item name={lang.notes} active={activeItem === lang.notes} onClick={this.handleItemClick} />

          <Menu.Menu position="right">
            <Menu.Item active={activeItem === lang.preferences} name={lang.preferences} onClick={this.handleItemClick}>
              <Icon name="wrench" /> {lang.preferences}
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
      activeItem: lang_pl.menu.to_do,
      lang: lang_pl
    }

    this.changeLanguage = this.changeLanguage.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    const body = document.getElementsByTagName("body")[0];
    const footer = document.getElementsByClassName("footer")[0];

    const lightThemeType = localStorage.getItem("light_theme");
    const lang = localStorage.getItem("lang");
    const darkThemeOn = localStorage.getItem("darkThemeOn");

    if (lang === undefined || lang === null) localStorage.setItem("lang", "pl");
    else this.changeLanguage(undefined, lang);

    if (lightThemeType === undefined || lightThemeType === null) {
      localStorage.setItem("light_theme", "Neutral");
    }
    else {
      if (lightThemeType === "Neutral") body.style.backgroundColor = "#F1F1F1";
      else if (lightThemeType === "Warm") body.style.backgroundColor = "#F0EDE5";
      else body.style.backgroundColor = "#EDF1FF";

      body.style.color = "black";
    }

    if (darkThemeOn === undefined || darkThemeOn === null) {
      localStorage.setItem("light_theme", "Neutral");
    }
    else {
      if (darkThemeOn === "true") {
        body.style.backgroundColor = "#222222";
        footer.style.backgroundColor = "#151515";
        body.style.color = "whitesmoke";
        localStorage.setItem("darkThemeOn", "true");
      }
    }
  }

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  changeLanguage(e, name) {
    if (e !== undefined) {
      if (e.currentTarget.value === "pl") {
        this.setState({ lang: lang_pl, activeItem: lang_pl.menu.to_do });
        localStorage.setItem("lang", "pl");
      }
      else {
        this.setState({ lang: lang_en, activeItem: lang_en.menu.to_do });
        localStorage.setItem("lang", "en");
      }
    }
    else {
      if (name === "pl") {
        this.setState({ lang: lang_pl, activeItem: lang_pl.menu.to_do });
        localStorage.setItem("lang", "pl");
      }
      else {
        this.setState({ lang: lang_en, activeItem: lang_en.menu.to_do });
        localStorage.setItem("lang", "en");
      }
    }
  }

  render() {
    let openPage = undefined;
    if (this.state.activeItem === this.state.lang.menu.to_do) {
      openPage = <ToDo onClick={this.handleItemClick} lang={this.state.lang.to_do_list} />
    }
    else if (this.state.activeItem === this.state.lang.menu.notes) {
      openPage = <Notes onClick={this.handleItemClick} lang={this.state.lang.notes} />;
    }
    else if (this.state.activeItem === this.state.lang.menu.preferences) {
      openPage = <Preferences lang={this.state.lang.preferences} lang={this.state.lang.preferences} />;
    }
    else if (this.state.activeItem === this.state.lang.menu.contact) {
      openPage = <Contact openHelp={() => this.handleItemClick(this.state.lang.menu.help)} lang={this.state.lang.contact} />;
    }
    else if (this.state.activeItem === this.state.lang.menu.help) {
      openPage = <Help openContact={() => this.handleItemClick(this.state.lang.menu.contact)} lang={this.state.lang.help} />;
    }

    return (
      <div>
        <PageHeader
          onClick={this.handleItemClick}
          activeItem={this.state.activeItem}
          changeLanguage={this.changeLanguage}
          lang={this.state.lang.menu}
        />
        {openPage}
        <div className="footer">2021 © Artur Pas</div>
      </div>
    );
  }
}

export default App;
