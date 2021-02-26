import React from 'react';
import { Button, TextArea } from 'semantic-ui-react';

export default class NoteEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                bold: false,
                italic: false,
                underline: false,
                strike: false,
                text_align: "left",
            }
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, { icon }) {
        const disableActive = document.getElementsByClassName("textarea-text-align");
        for (let i = 0; i < 4; i++) disableActive[i].classList.remove("active");
        e.currentTarget.classList.add("active");

        switch (icon) {
            case "align left":
                this.setState({ settings: { text_align: "left" } });
                break;
            case "align center":
                this.setState({ settings: { text_align: "center" } });
                break;
            case "align right":
                this.setState({ settings: { text_align: "right" } });
                break;
            case "align justify":
                this.setState({ settings: { text_align: "justify" } });
                break;
            default:
                this.setState({ settings: { text_align: "left" } });
                break;
        }
    }

    render() {
        let title = undefined;
        let text = undefined;
        if (this.props.note !== undefined) {
            title = this.props.note.title;
            text = this.props.note.note;
        }
        return (
            <div>
                <div>
                    <TextArea className="input-title" rows="1" maxLength="50" placeholder="Tytuł" value={title} />
                </div>

                <div>
                    <div className="ui icon buttons">
                        <Button icon="font" />
                        <Button icon="bold" onClick={this.handleClick} />
                        <Button icon="italic" onClick={this.handleClick} />
                        <Button icon="underline" onClick={this.handleClick} />
                        <Button icon="strikethrough" onClick={this.handleClick} />
                    </div>

                    <div className="ui icon buttons">
                        <Button icon="align left" active={true} onClick={this.handleClick} className="textarea-text-align" />
                        <Button icon="align center" onClick={this.handleClick} className="textarea-text-align" />
                        <Button icon="align right" onClick={this.handleClick} className="textarea-text-align" />
                        <Button icon="align justify" onClick={this.handleClick} className="textarea-text-align" />
                    </div>
                    <form>
                        <TextArea className="text-area" id="note"
                            style={{ textAlign: this.state.settings.text_align }}
                            rows="25" maxLength="2000"
                            placeholder="Notatka"
                            value={text} />
                    </form>
                </div>
            </div>
        );
    }
}