import React from 'react';
import { Icon } from 'semantic-ui-react';
import { formatBBCodeText } from '../services/FormatBBCode';

export default function OpenNote(props) {
    const note = props.note;
    let formattedNote = formatBBCodeText(note.note);

    return (
        <div>
            <h1 className="note-title">
                {note.title}
                <Icon name="pencil" size="small" onClick={() => props.editNote(props.id)} />
            </h1>
            <small className="color-gray">
                {`${note.date}  ${note.time}`}
            </small>

            <div className="word-wrap" style={{ textAlign: note.align, marginTop: "2rem" }}>
                <pre className="word-wrap" style={{ textAlign: note.align }}>
                    {formattedNote}
                </pre>
            </div>
        </div>
    );
}