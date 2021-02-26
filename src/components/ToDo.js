import React, { useState } from 'react';
import ToDoCategories from './ToDoCategories';
import TaskList from './TaskList';

function ToDo() {
  const [openedCategory, changeCategory] = useState(0);

  return (
    <div className="ui stackable two column divided grid container" style={{ minHeight: "90vh", paddingBottom: "1rem" }}>
      <div className="three wide column">
        <ToDoCategories active={openedCategory} changeCategory={(id) => changeCategory(id)} />
      </div>
      <div className="thirteen wide column">
        <TaskList active={openedCategory} />
      </div>
    </div>
  );
}

export default ToDo;
