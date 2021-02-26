import React from 'react';
import { Popup, Icon, Item, Accordion, Grid } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultColors: [
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
        }
    }

    render() {
        return (
            <div className="color-picker">
                <SketchPicker
                    color={this.props.color}
                    onChangeComplete={(color) => this.props.handleChangeComplete(this.props.i, color)}
                    presetColors={this.state.defaultColors}
                    disableAlpha
                />
            </div>
        );
    }
}

export default function CategoriesListElement(props) {
    return (
        <Accordion.Title
            active={true}
            style={{ backgroundColor: props.color }}
            index={props.i}>
            <Grid columns='two'>
                <Grid.Column
                    width={14} contentEditable
                    suppressContentEditableWarning
                    className="category-edit-name"
                    onKeyUp={(e) => props.categoryNameChange(e, props.i)}>
                    {props.name}
                </Grid.Column>
                <Grid.Column width={2} className="text-right">
                    <Item>
                        <Popup
                            trigger={<Icon bordered inverted color="blue" name="tint" className="cursor-pointer" />}
                            content={<ColorPicker i={props.i} color={props.color} handleChangeComplete={props.handleChangeComplete} />}
                            on='click'
                            position='left center'
                        />
                        <Icon
                            bordered inverted
                            color="red" name="close"
                            className="cursor-pointer"
                            onClick={() => props.deleteCategory(props.i)}
                        />
                    </Item>
                </Grid.Column>
            </Grid>
        </Accordion.Title>
    );
}