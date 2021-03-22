import React from 'react';
import { Button, Icon, Item, Accordion } from 'semantic-ui-react';

import HelpAndContact from '../HelpAndContact';

function Category(props) {
  const currentlyOpen = (props.index === props.i);
  const bigCircleStyles = {
    backgroundColor: props.color,
    width: "14.5rem",
    height: "14.5rem",
    marginTop: "-6rem",
    marginLeft: "-.5rem"
  }

  return (
    <div key={props.name} className="category-parent">
      <div className="category-color-circle" style={currentlyOpen ? bigCircleStyles : { backgroundColor: props.color }}></div>
      <Accordion.Title
        style={(props.i === 0) ? { borderTop: 0 } : {}}
        active={props.index === props.i}
        className="category-name" index={props.i}
        onClick={props.handleAccordionClick}>
        {props.name}
      </Accordion.Title>
    </div>
  );
}

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      categories: [],
      notes: undefined,
      update: props.update
    }

    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleEditCategoriesClick = this.handleEditCategoriesClick.bind(this);
  }

  componentDidMount() {
    const all = this.props.lang.all;
    const work = this.props.lang.work;
    const poems = this.props.lang.poems;
    const recyle = this.props.lang.recyle_bin;

    this.setState({
      categories: this.props.categories.map((elem, index) => {
        let name = elem.name;
        if (name === "Wszystkie") name = all;
        else if (name === "Praca") name = work;
        else if (name === "Wiersze") name = poems;
        else if (name === "Kosz") name = recyle;

        return (
          <Category
            key={elem.name + index}
            name={name}
            color={elem.color}
            index={this.state.activeIndex} i={index}
            handleAccordionClick={this.handleAccordionClick}
          />
        )
      }),
    })
  }

  handleAddButtonClick(e) {
    this.setState({ activeIndex: 0 }, () => {
      this.componentDidMount();
      this.props.handleButtonClick();
    })
  }

  handleEditCategoriesClick() {
    this.setState({ activeIndex: 0 }, () => {
      this.componentDidMount();
      this.props.editCategories();
    })
  }

  handleAccordionClick(e, titleProps) {
    const { index } = titleProps
    let currentTarget = e.currentTarget.innerHTML;
    const all = this.props.lang.all;
    const work = this.props.lang.work;
    const poems = this.props.lang.poems;
    const recyle = this.props.lang.recyle_bin;

    if (currentTarget === all) currentTarget = "Wszystkie";
    else if (currentTarget === work) currentTarget = "Praca";
    else if (currentTarget === poems) currentTarget = "Wiersze";
    else if (currentTarget === recyle) currentTarget = "Kosz";

    this.setState({ activeIndex: index }, () => {
      this.componentDidMount();
      this.props.handleCategoryChange(currentTarget);
    })
  }

  render() {
    return (
      <div className="ui relaxed divided items">
        <Item>
          <Button className="mx-auto mt-1" color="green" onClick={this.handleAddButtonClick}>
            <Icon style={{ opacity: "1" }} name="plus" /> {this.props.lang.add_note}
          </Button>
        </Item>

        <h4 className="mt-1">
          {this.props.lang.categories}
          <Icon
            title={this.props.lang.edit_categories}
            color="grey" size="large" name="setting"
            onClick={this.handleEditCategoriesClick}
            className="edit-categories-icon"
          />
        </h4>

        <Item style={{ paddingBottom: ".5rem" }}>
          <Accordion fluid styled>
            {this.state.categories}
          </Accordion>
        </Item>
        <div className="mb-6" />

        <HelpAndContact onClick={this.props.onClick} lang={this.props.lang} />
      </div>
    );
  }
}