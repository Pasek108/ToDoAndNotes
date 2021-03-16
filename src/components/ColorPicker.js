import React from 'react';
import { SketchPicker } from 'react-color';

export default function ColorPicker(props) {
    const defaultColors = [
        '#DB2828',
        '#F2711C',
        '#FBBD08',
        '#B5CC18',
        '#21BA45',
        '#00B5AD',
        '#2185D0',
        '#6435C9',
        '#A333C8',
        '#E03997',
        '#A5673F',
        '#767676',
        '#1B1C1D'
    ]

    return (
        <div className="color-picker" style={{ marginTop: "-" + props.i * 2.3 + "rem", right: "-.04rem", zIndex: -5 }}>
            <SketchPicker
                color={props.color}
                onChangeComplete={(color) => props.handleChangeComplete(props.i, color)}
                presetColors={defaultColors}
                disableAlpha
            />
        </div>
    );
}