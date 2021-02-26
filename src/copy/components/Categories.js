import React from 'react';
import { Button, Icon, Item, Accordion } from 'semantic-ui-react';
import { getCategories } from '../services/UserService';

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
    <div key={props.name} className="category-parent" style={currentlyOpen ? {} : { backgroundColor: "white" }}>
      <div className="category-color-circle" style={currentlyOpen ? bigCircleStyles : { backgroundColor: props.color }}></div>
      <Accordion.Title
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
      categoriesList: [],
      categories: [],
      notes: undefined,
      update: props.update
    }

    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleEditCategoriesClick = this.handleEditCategoriesClick.bind(this);
    this.createCategories = this.createCategories.bind(this);
  }

  componentDidMount() {
    getCategories().then(categories => {
      this.setState({ categoriesList: categories }, this.createCategories)
    });
  }

  createCategories() {
    let categoriesList = [];
    for (let i = 0; i < this.state.categoriesList.length; i++) {
      categoriesList.push(
        <Category
          key={this.state.categoriesList[i].name + i}
          name={this.state.categoriesList[i].name}
          color={this.state.categoriesList[i].color}
          index={this.state.activeIndex} i={i}
          handleAccordionClick={this.handleAccordionClick}
        />
      );
    }

    this.setState({ categories: categoriesList });
  }

  handleAddButtonClick(e) {
    this.setState({ activeIndex: 0 }, () => {
      this.createCategories();
      this.props.handleButtonClick();
    })
  }

  handleEditCategoriesClick() {
    this.setState({ activeIndex: 0 }, () => {
      this.createCategories();
      this.props.editCategories();
    })
  }

  handleAccordionClick(e, titleProps) {
    const { index } = titleProps
    const currentTarget = e.currentTarget.innerHTML;
    this.setState({ activeIndex: index }, () => {
      this.createCategories();
      this.props.handleCategoryChange(currentTarget);
    })
  }

  render() {
    if (this.state.update !== this.props.update) {
      getCategories().then(categories => {
        this.setState({ categoriesList: categories, update: this.props.update }, this.createCategories)
      });
    }

    return (
      <div className="ui relaxed divided items">
        <Item>
          <Button className="mx-auto mt-1" color="green" onClick={this.handleAddButtonClick}>
            <Icon style={{ opacity: "1" }} name="plus" /> Dodaj notatke
          </Button>
        </Item>

        <h4 className="mt-1">
          Kategorie
          <Icon
            title="Edutuj kategorie"
            color="grey" size="large" name="setting"
            onClick={this.handleEditCategoriesClick}
            className="edit-categories-icon"
          />
        </h4>

        <Item>
          <Accordion fluid styled>
            {this.state.categories}
          </Accordion>
        </Item>
      </div>
    );
  }
}