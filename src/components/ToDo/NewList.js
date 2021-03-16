import React, { useState } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

import ColorPicker from '../ColorPicker';

export default function NewList(props) {
    const [color, setColor] = useState("#000000");

    return (
        <div>
            <Popup
                trigger={
                    <div className="color-pick-button">
                        <Icon name="circle" style={{ color: color, float: "left" }} className="color-circle" /> Kolor
                    </div>
                }
                content={<ColorPicker i={props.i + 1} color={color} handleChangeComplete={(i, color) => { setColor(color.hex) }} />}
                on='click'
                position='left center'
            />

            <input type="text" className="new-task new-list" placeholder="Nazwa nowej listy" style={{ width: "78%" }} />

            <div className="remove-new-list-button" onClick={props.onClick}>
                <Icon name="delete" color="red" size="large" style={{ marginRight: 0 }} />
            </div>
        </div>
    );
}