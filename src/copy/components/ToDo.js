import React from 'react';
import { Button, Icon, Item } from 'semantic-ui-react';

function ToDo() {
  return (
    <div className="ui stackable two column divided grid container">
      <div className="three wide column">
        <div className="ui relaxed divided items">
          <Item>
            <Button className="mx-auto"><Icon name="plus" />Dodaj zadanie</Button>
          </Item>
          <Item>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>TODO1</Item.Header>
                  <Item.Meta>opis to do 1</Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
          </Item>
        </div>
      </div>
      <div className="thirteen wide column">

      </div>
    </div>
  );
}

export default ToDo;
