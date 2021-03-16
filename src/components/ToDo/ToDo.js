import React, { useState } from 'react';

import ToDoCategories from './ToDoCategories';
import TaskList from './TaskList';
import HelpAndContact from '../HelpAndContact';
import { Container, Grid } from 'semantic-ui-react';

function ToDo(props) {
  const [openedCategory, changeCategory] = useState(0);

  return (
    <Container>
      <Grid columns={2} divided style={{ minHeight: "calc(100vh - 5.2rem)", paddingBottom: "1rem" }}>
        <Grid.Row className="p-0">
          <Grid.Column width={3} className="p-1">
            <ToDoCategories active={openedCategory} changeCategory={(id) => changeCategory(id)} />
            <HelpAndContact onClick={props.onClick} />
          </Grid.Column>

          <Grid.Column width={13} className="p-1">
            <TaskList active={openedCategory} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default ToDo;
