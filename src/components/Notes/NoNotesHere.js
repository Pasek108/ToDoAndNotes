import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function NoNotesHere(props) {
    return (
        <div className="text-center mt-40vh">
            <strong style={{ fontSize: "1.5rem" }}>Brak notatek</strong>
            <Icon.Group size='big' style={{ marginLeft: ".5rem" }}>
                <Icon name='frown outline' style={{ margin: "-.25rem .55rem 0 0" }} />
                <Icon size='large' name='search' />
            </Icon.Group>
        </div>
    );
}