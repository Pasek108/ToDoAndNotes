import React from 'react';
import { Icon, Item, Segment, Grid, Modal, Button, Popup, Checkbox } from 'semantic-ui-react';

import formatBBCodeText from '../../services/Notes/formatBBCode';

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
        let categories = this.props.categories;
        let checkedCategories = [];
        for (let i = 1; i < categories.length - 1; i++) {
            checkedCategories.push(this.state.note.category.includes(categories[i].name));
        }
        this.setState({ checkedCategories: checkedCategories }, () => {
            let newCategories = [];
            const work = this.props.lang.work;
            const poems = this.props.lang.poems;

            if (categories.length < 3) newCategories.push(this.props.lang.no_categories);
            else {
                for (let i = 1; i < categories.length - 1; i++) {
                    let name = categories[i].name;
                    if (name === "Praca") name = work;
                    else if (name === "Wiersze") name = poems;

                    newCategories.push(
                        <Item key={i}>
                            <Checkbox
                                defaultChecked={this.state.checkedCategories[i - 1]}
                                onChange={() => {
                                    let checkedCategories = this.state.checkedCategories;
                                    checkedCategories[i - 1] = !checkedCategories[i - 1];
                                    this.setState({ checkedCategories: checkedCategories })
                                }}
                                label={<label>{name}</label>}
                            />
                        </Item>
                    );
                }
                newCategories.push(
                    <Button
                        key={categories.length - 1} content={this.props.lang.save} color="green"
                        style={{ width: "100%", padding: ".5rem", marginTop: "1rem" }}
                        onClick={() => this.props.updateNoteCategories(this.state.note.id, this.state.checkedCategories)}
                    />
                );
            }

            this.setState({ categories: newCategories })
        })
    }

    handleDateHover() {
        this.setState((state) => ({ isDateHover: !state.isDateHover }));
    }

    render() {
        const note = this.state.note;
        const trash = note.category[0] === "Kosz";
        const lang = this.props.lang;

        const restoreOrEditIcon = (
            (trash)
                ? (
                    <Icon
                        title={lang.restore} name="history"
                        onClick={() => this.props.restoreNote(note.id)}
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
                                    title={lang.change_categories} name="list alternate outline"
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
                        title={(trash) ? lang.delete : lang.move_to_the_bin}
                        name={(trash) ? "delete" : "trash"}
                        bordered inverted color="red" size="large"
                        className="cursor-pointer mx-auto" style={{ fontSize: "1.3rem" }}
                    />
                }
                onClose={() => { this.setState({ warningOpen: false }); this.handleDateHover() }}
                onOpen={() => this.setState({ warningOpen: true })}
                open={this.state.warningOpen} >

                <Modal.Header className="color-red">
                    <Icon name='warning sign' /> {lang.warning}!
                </Modal.Header>

                <Modal.Content>
                    {
                        (trash)
                            ? <p>{lang.warning_text_delete}</p>
                            : <p>{lang.warning_text_move_to_the_bin}</p>
                    }
                </Modal.Content>

                <Modal.Actions>

                    <Button
                        basic color='red' inverted icon="remove" content={lang.cancel}
                        onClick={() => { this.setState({ warningOpen: false }); this.handleDateHover() }} />

                    <Button
                        color='green' inverted icon="checkmark" content={lang.confirm}
                        onClick={() => { this.setState({ warningOpen: false }); this.props.deleteNote(note.id) }} />

                </Modal.Actions>

            </Modal>
        );

        return (
            <Segment className="mb-0" onMouseOver={this.handleDateHover} onMouseOut={this.handleDateHover} style={{color: "black"}}>
                <Grid columns="2">
                    <Grid.Row>

                        <Grid.Column width="13" onClick={() => this.props.showNote(this.props.id)}>
                            <h3 className="note-description" style={{ fontSize: "1.5em", marginTop: ".1rem" }}>{note.title}</h3>
                            <div className="note-description">{formatBBCodeText(note.note)}</div>
                        </Grid.Column>

                        <Grid.Column width="3" className="text-right">

                            <Item className="mb-1">
                                {restoreOrEditIcon}
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