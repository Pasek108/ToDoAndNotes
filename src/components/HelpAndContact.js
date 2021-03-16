import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function HelpAndContact(props) {
    return (
        <div className="help-and-contact">
            <div className="contact cursor-pointer" onClick={() => props.onClick("Kontakt")}>
                <Icon name="mail outline" /> Kontakt
            </div>
            <div className="help cursor-pointer" onClick={() => props.onClick("Pomoc")}>
                <Icon name="question circle outline" /> Pomoc
            </div>
        </div>
    );
}