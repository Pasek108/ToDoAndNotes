import React, { useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import ToDoCategories from './ToDoCategories';
import TaskList from './TaskList';
import HelpAndContact from '../HelpAndContact';

function ToDo(props) {
  const [openedCategory, changeCategory] = useState(0);

  return (
    <Container>
      <Grid columns={2} divided style={{ minHeight: "calc(100vh - 2.3rem)", paddingBottom: "1rem" }}>
        <Grid.Row className="p-0">
          <Grid.Column width={3} className="p-1">
            <ToDoCategories active={openedCategory} changeCategory={(id) => changeCategory(id)} lang={props.lang.lists} />
            <HelpAndContact onClick={props.onClick} lang={props.lang.lists} />
          </Grid.Column>

          <Grid.Column width={13} className="p-1">
            <TaskList active={openedCategory} lang={props.lang.tasks_window} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default ToDo;
