import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function HelpAndContact(props) {
    return (
        <div className="help-and-contact">
            <div className="contact cursor-pointer" onClick={() => props.onClick(props.lang.contact)}>
                <Icon name="mail outline" /> {props.lang.contact}
            </div>
            <div className="help cursor-pointer" onClick={() => props.onClick(props.lang.help)}>
                <Icon name="question circle outline" /> {props.lang.help}
            </div>
        </div>
    );
}