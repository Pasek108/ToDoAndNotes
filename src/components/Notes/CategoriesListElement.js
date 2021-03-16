import React from 'react';
import { Popup, Icon, Item, Accordion, Grid } from 'semantic-ui-react';

import ColorPicker from '../ColorPicker';

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