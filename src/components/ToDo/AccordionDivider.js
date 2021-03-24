import React from 'react';
import { Icon, Divider, Accordion } from 'semantic-ui-react';

export default function AccordionDivider(props) {
    return (
        <Accordion.Title className="mb-1-5 mt-05" active={props.active} index={props.index} onClick={props.onClick} style={{ color: "inherit" }}>
            <Icon name='dropdown' className="float-left" />
            <Divider horizontal className="mt-0 mb-0 float-left" style={{ width: "97.5%" }}>{props.text}</Divider>
        </Accordion.Title>
    );
}