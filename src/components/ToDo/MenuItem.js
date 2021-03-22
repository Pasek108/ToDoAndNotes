import React, { useState } from 'react';
import { Icon, Item, Modal, Button } from 'semantic-ui-react';

import deleteUserList from '../../services/To-Do/deleteUserList';

export default function MenuItem(props) {
    const [isMouseOver, setMouseOverFlag] = useState(0);
    const [openWarning, setWarningOpen] = useState(false);
    const activeMenuStyle = (props.active) ? { backgroundColor: "white", fontWeight: "bold", color: "black" } : {};

    const deleteIcon = (
        <Modal basic size='tiny'
            trigger={
                <Icon name="delete" color="red"
                    style={{ float: "right", position: "static" }}
                    onClick={(e) => e.stopPropagation()} /> 
            }
            onClose={() => { setWarningOpen(false); setMouseOverFlag(false) }}
            onOpen={() => setWarningOpen(true)}
            open={openWarning} >

            <Modal.Header className="color-red">
                <Icon name='warning sign' /> {props.lang.warning}!
            </Modal.Header>

            <Modal.Content>
                <p>{props.lang.warning_text}</p>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    basic color='red' inverted icon="remove" content={props.lang.cancel}
                    onClick={() => { setWarningOpen(false); setMouseOverFlag(false) }} />

                <Button
                    color='green' inverted icon="checkmark" content={props.lang.confirm}
                    onClick={(e) => {
                        e.stopPropagation();
                        setWarningOpen(false);
                        setMouseOverFlag(false);
                        deleteUserList(props.id);
                        props.refresh(props.id);
                    }} />
            </Modal.Actions>
        </Modal>
    );

    return (
        <Item
            className="todo-menu-item menu-item cursor-pointer"
            style={activeMenuStyle}
            onClick={props.onClick}
            onMouseEnter={() => { if (props.icon === "circle") setMouseOverFlag(true) }}
            onMouseLeave={() => { if (props.icon === "circle") setMouseOverFlag(false) }}
        >
            <Icon name={props.icon} style={{ color: props.color }} /> {props.name}
            <div className="to-do-category-animation-underline" style={(props.active) ? { width: "100%" } : {}} />
            {(isMouseOver) ? deleteIcon : ""}
        </Item>
    );
}