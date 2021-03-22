import React, { useState } from 'react';
import { Icon, Popup } from 'semantic-ui-react';

import ColorPicker from '../ColorPicker';

export default function NewList(props) {
    const [color, setColor] = useState("#000000");
    const lang = props.lang;

    return (
        <div>
            <Popup
                trigger={
                    <div className="color-pick-button">
                        <Icon name="circle" style={{ color: color, float: "left" }} className="color-circle" /> {lang.color}
                    </div>
                }
                content={<ColorPicker i={props.i + 1} color={color} handleChangeComplete={(i, color) => { setColor(color.hex) }} />}
                on='click'
                position='left center'
            />

            <input type="text" className="new-task new-list" placeholder={lang.new_list_name} style={{ width: "78%" }} />

            <div className="remove-new-list-button" onClick={props.onClick} title={lang.delete}>
                <Icon name="delete" color="red" size="large" style={{ marginRight: 0 }} />
            </div>
        </div>
    );
}