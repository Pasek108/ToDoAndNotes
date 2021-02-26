import React from 'react';
import { Icon, Item, Segment, Grid, Modal, Button, Popup, Checkbox } from 'semantic-ui-react';
import { formatBBCodeText } from '../services/FormatBBCode';
import { getCategories } from '../services/UserService'

export default class NotesListElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: props.note,
            categories: [],
            checkedCategories: [],
            isDateHover: false,
            warningOpen: false,
            categoriesOpen: false
        }

        this.handleDateHover = this.handleDateHover.bind(this);
    }

    componentDidMount() {
        getCategories().then(categories => {
            this.setState({
                categories: categories.map((category, index, array) => {
                    if (category.name === "Wszystkie") return "";
                    else if (array.length < 3) return "Brak kategorii";
                    else if (category.name === "Kosz") {
                        return (
                            <Button
                                key={index} content="Zapisz" color="green"
                                style={{ width: "100%", padding: ".5rem", marginTop: "1rem" }}
                                onClick={() => this.props.updateNoteCategories(this.state.note.id, this.state.checkedCategories)}
                            />
                        );
                    }

                    let next = 0;
                    let checkedCategories = this.state.checkedCategories;
                    checkedCategories.push(this.state.note.category.includes(category.name));
                    this.setState({ checkedCategories: checkedCategories }, () => next = 1);

                    if (next === 1) {
                        return (
                            <Item key={index}><Checkbox
                                defaultChecked={this.state.checkedCategories[this.state.checkedCategories.length - 1]}
                                onChange={() => {
                                    let checkedCategories = this.state.checkedCategories;
                                    checkedCategories[index - 1] = !checkedCategories[index - 1];
                                    this.setState({ checkedCategories: checkedCategories })
                                }}
                                label={<label>{category.name}</label>}
                            /></Item>
                        );
                    }
                })
            })
        });
    }

    handleDateHover() {
        this.setState((state) => ({ isDateHover: !state.isDateHover }));
    }

    render() {
        const note = this.state.note;
        const trash = note.category[0] === "Kosz";

        const backupOrEditIcon = (
            (trash)
                ? (
                    <Icon
                        title="Przywróć" name="history"
                        onClick={() => this.props.backupNote(note.id)}
                        bordered inverted color="grey" size="large"
                        className="cursor-pointer" style={{ fontSize: "1.3rem" }} />
                )
                : (
                    <Popup
                        position='left center' on='click'
                        content={<div>{this.state.categories}</div>}
                        onClose={() => this.setState({ categoriesOpen: false })}
                        onOpen={() => this.setState({ categoriesOpen: true })}
                        open={this.state.categoriesOpen}
                        style={{ marginTop: "2.5rem" }}
                        trigger={
                            <div style={{ display: "inline" }}>
                                <Icon
                                    title="Zmień kategorie" name="list alternate outline"
                                    onClick={() => ("")}
                                    bordered inverted color="grey" size="large"
                                    className="cursor-pointer" style={{ fontSize: "1.3rem" }} />
                            </div>
                        }
                    />
                )
        );

        const deleteIcon = (
            <Modal basic size='tiny'
                trigger={
                    <Icon
                        title={(trash) ? "Usuń" : "Przenieś do kosza"}
                        name={(trash) ? "delete" : "trash"}
                        bordered inverted color="red" size="large"
                        className="cursor-pointer" style={{ fontSize: "1.3rem" }}
                    />
                }
                onClose={() => this.setState({ warningOpen: false })}
                onOpen={() => this.setState({ warningOpen: true })}
                open={this.state.warningOpen} >

                <Modal.Header icon className="color-red">
                    <Icon name='warning sign' /> UWAGA!
                </Modal.Header>

                <Modal.Content>
                    {
                        (trash)
                            ? <p>Usunięcie notatki z kosza jest trwałe, nie ma możliwości jej przywrócenia</p>
                            : <p>Przniesienie notatki do kosza spowoduje nieodwracalne usunięcie przypisanych do niej kategorii</p>
                    }
                </Modal.Content>

                <Modal.Actions>

                    <Button
                        basic color='red' inverted icon="remove" content="Anuluj"
                        onClick={() => { this.setState({ warningOpen: false }); this.handleDateHover() }} />

                    <Button
                        color='green' inverted icon="checkmark" content="Potwierdż"
                        onClick={() => { this.setState({ warningOpen: false }); this.props.deleteNote(note.id) }} />

                </Modal.Actions>

            </Modal>
        );

        return (
            <Segment className="mb-0" onMouseOver={this.handleDateHover} onMouseOut={this.handleDateHover}>
                <Grid columns="2">
                    <Grid.Row>

                        <Grid.Column width="13" onClick={() => this.props.showNote(this.props.id)}>
                            <h3 style={{ fontSize: "1.5em", marginTop: ".1rem" }}>{note.title}</h3>
                            <div className="note-description">{formatBBCodeText(note.note)}</div>
                        </Grid.Column>

                        <Grid.Column width="3" className="text-right">

                            <Item className="mb-1">
                                {backupOrEditIcon}
                                {deleteIcon}
                            </Item>

                            <div className="color-gray cursor-default">
                                {(this.state.isDateHover) ? note.time : note.date}
                            </div>

                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}