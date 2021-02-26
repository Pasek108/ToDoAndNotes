import React from 'react';
import { Icon, Button, TextArea } from 'semantic-ui-react';
import formatBBCodeText from '../services/Notes/formatBBCode';

export default class OpenNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: props.note,
            edit: (props.note.category === "Nowa notatka"),
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    handleClick(e, { icon }) {
        if (icon.includes("align")) {
            let note = this.state.note;
            switch (icon) {
                case "align center":
                    note.align = "center";
                    break;
                case "align right":
                    note.align = "right";
                    break;
                case "align justify":
                    note.align = "justify";
                    break;
                default:
                    note.align = "left";
                    break;
            }

            this.setState({ note: note });
        }
        else {
            const note = document.getElementById("note");
            if (note !== null) {
                if (note.selectionStart === note.selectionEnd) return;
                let selected = note.value.slice(note.selectionStart, note.selectionEnd);
                switch (icon) {
                    case "bold":
                        note.setRangeText(`***${selected}***`);
                        break;
                    case "italic":
                        note.setRangeText(`///${selected}///`);
                        break;
                    case "underline":
                        note.setRangeText(`___${selected}___`);
                        break;
                    default:
                        note.setRangeText(`---${selected}---`);
                        break;
                }
            }
        }
    }

    handleTextareaChange(id) {
        const textArea = document.getElementById(id);
        if (textArea !== null) {
            let note = this.state.note;
            if (id === "note") note.note = textArea.value;
            else note.title = textArea.value;
            this.setState({ note: note });
        }
    }

    render() {
        const note = this.state.note;
        const align = this.state.note.align;

        return (
            <div>
                {(this.state.edit)
                    ? (
                        <TextArea
                            style={{
                                fontSize: "1.9rem",
                                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                                lineHeight: "1.28571429em",
                                color: "rgba(0,0,0,.87)",
                                fontWeight: "700",
                                padding: ".1rem .5rem"
                            }}
                            rows="1" maxLength="50" placeholder="Tytuł"
                            className="note-title" value={note.title}
                            id="title" onChange={() => this.handleTextareaChange("title")}
                        />
                    )
                    : <h1 className="note-title word-wrap">{note.title}</h1>
                }

                {(note.category[0] === "Kosz")
                    ? (
                        <Button color="grey"
                            style={{ float: "right", borderRadius: 0, fontSize: "1.2rem", padding: ".75rem 1rem .75rem 2.7rem", position: "relative" }}
                            onClick={() => { this.props.backupNote(note.id) }} >
                            <Icon title="Przywróć" name="history"
                                style={{ opacity: 1, fontSize: "1.4rem", left: "1rem", position: "absolute" }} />
                            Przywróć
                        </Button>
                    )
                    : (
                        <div style={{ width: "20%", float: "right" }}>
                            <Button color="blue" className="mx-auto"
                                style={{ float: "right", borderRadius: 0, fontSize: "1.4rem", height: "2em", padding: ".5em 1rem .5em 2.7rem", position: "relative" }}
                                onClick={() => { this.handleTextareaChange("note"); this.handleTextareaChange("title"); this.setState(state => ({ edit: !state.edit })) }} >
                                <Icon name={(this.state.edit) ? "eye" : "pencil"}
                                    title={(this.state.edit) ? "Podgląd" : "Edytuj"}
                                    style={{ opacity: 1, fontSize: "1.4rem", left: "1rem", position: "absolute" }} />
                                {(this.state.edit)
                                    ? <div style={{ fontSize: "1.2rem" }}>Podgląd</div>
                                    : <div style={{ fontSize: "1.2rem" }}>Edytuj</div>
                                }
                            </Button>

                            {(note.category === "Nowa notatka")
                                ? (<div />) : (
                                    <Icon bordered inverted title="Przypnij notatke"
                                        name="bookmark" className="cursor-pointer"
                                        color="orange" style={{ float: "right", fontSize: "1.4rem" }}
                                        onClick={() => { }} />
                                )}
                        </div>
                    )}

                <div className="color-gray" style={{ width: "100%", float: "left", fontSize: ".9rem" }}>
                    {`${note.date}  ${note.time}`}
                </div>

                {(this.state.note.category[0] === "Kosz")
                    ? (<div style={{ height: "6rem" }} />)
                    : (
                        <div style={{ float: "left", width: "100%", margin: "1rem 0" }}>
                            <div className="ui icon buttons">
                                <Button title="Pogrubienie" icon="bold" onClick={this.handleClick} className="textarea-edit-icon" />
                                <Button title="Pochylenie" icon="italic" onClick={this.handleClick} className="textarea-edit-icon" />
                                <Button title="Podkreślenie" icon="underline" onClick={this.handleClick} className="textarea-edit-icon" />
                                <Button title="Przekreślenie" icon="strikethrough" onClick={this.handleClick} className="textarea-edit-icon" />
                            </div>

                            <div className="ui icon buttons">
                                <Button title="Wyrównanie do lewej" icon="align left" active={align === "left"} onClick={this.handleClick} className="textarea-edit-icon" />
                                <Button title="Wśrodkowanie" icon="align center" active={align === "center"} onClick={this.handleClick} className="textarea-edit-icon" />
                                <Button title="Wyrównanie do prawej" icon="align right" active={align === "right"} onClick={this.handleClick} className="textarea-edit-icon" />
                                <Button title="Wyjustowanie" icon="align justify" active={align === "justify"} onClick={this.handleClick} className="textarea-edit-icon" />
                            </div>

                            <Button color="green" className="mx-auto"
                                style={{ float: "right", padding: ".70rem 1rem", fontSize: "1.1rem" }}
                                onClick={() => { this.handleTextareaChange("note"); this.handleTextareaChange("title"); this.props.saveNote(note) }}>
                                <Icon name="save" style={{ opacity: "1" }} /> Zapisz
                            </Button>
                        </div>
                    )}

                {(this.state.edit)
                    ? (
                        <TextArea className="text-area" id="note"
                            style={{ textAlign: align, fontFamily: "helvetica", letterSpacing: ".01rem" }}
                            rows="25" maxLength="2000" placeholder="Notatka"
                            onChange={() => this.handleTextareaChange("note")}
                            value={note.note} />
                    )
                    : (
                        <div className="word-wrap" style={{ textAlign: align, marginTop: "2rem", clear: "both" }}>
                            <pre className="word-wrap" style={{ fontFamily: "helvetica", letterSpacing: ".01rem" }}>
                                {formatBBCodeText(note.note)}
                            </pre>
                        </div>

                    )}
            </div>
        );
    }
}