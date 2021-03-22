import React from 'react';
import { Button, Icon, Item, Accordion, Transition, ItemGroup } from 'semantic-ui-react';

import sendCategories from '../../services/Notes/sendCategories';

import CategoriesListElement from './CategoriesListElement';

export default class CategoriesEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            keys: [],
            newCategoriesList: [],
            colors: [],
            countCategories: 0
        }

        this.keyCount = 0;

        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.updateCategories = this.updateCategories.bind(this);
        this.createCategoriesList = this.createCategoriesList.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.categoryNameChange = this.categoryNameChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            categoriesList: this.props.categories,
            colors: this.props.categories.map((elem) => { return elem.color }),
            countCategories: this.props.categories.length - 2
        }, this.createCategoriesList)
    }

    createCategoriesList() {
        let categoriesList = [];
        let keys = this.state.keys;
        const work = this.props.lang.work;
        const poems = this.props.lang.poems;

        for (let i = 1; i < this.props.categories.length - 1; i++) {
            if (this.state.keys.length === 0) {
                const key = this.keyCount++;
                keys.push(key);
            }

            let name = this.props.categories[i].name;
            if (name === "Praca") name = work;
            else if (name === "Wiersze") name = poems;

            categoriesList.push(
                <CategoriesListElement
                    key={keys[i - 1]}
                    handleChangeComplete={this.handleChangeComplete}
                    name={name}
                    color={this.state.colors[i]} i={i}
                    deleteCategory={this.deleteCategory}
                    categoryNameChange={this.categoryNameChange}
                    lang={this.props.lang}
                />
            );
        }

        this.setState({ newCategoriesList: categoriesList, keys: keys });
    }

    handleChangeComplete(i, color) {
        let newColors = this.state.colors;
        newColors[i] = color.hex;
        this.setState({ colors: newColors }, this.createCategoriesList);
    };

    categoryNameChange(e, i) {
        let categoriesList = this.props.categories;
        for (let j = 0; j < categoriesList.length; j++) {
            if (j === i) categoriesList[i].name = e.currentTarget.innerHTML;
            else {
                if (categoriesList[j].name[categoriesList[j].name.length - 1] !== " ") {
                    categoriesList[j].name = categoriesList[j].name.trim();
                }
                else categoriesList[j].name = categoriesList[j].name + " ";
            }
        }

        this.setState({ categoriesList: categoriesList });
    }

    addCategory() {
        if (this.state.countCategories > 7) return;

        let colors = this.state.colors;
        colors.splice(colors.length - 1, 0, "#FBBD08");
        this.setState({ colors: colors }, () => {
            let categoriesList = this.props.categories;
            categoriesList.splice(categoriesList.length - 1, 0, {
                name: "(" + this.props.lang.click_to_change_name + ")",
                color: "#FBBD08"
            });
            this.setState({ categoriesList: categoriesList }, () => {
                this.setState((state) => ({ countCategories: state.countCategories + 1 }));
                const i = this.props.categories.length - 2;
                let newCategoriesList = this.state.newCategoriesList;
                let keys = this.state.keys;

                const key = this.keyCount++;
                keys.push(key);
                newCategoriesList.push(
                    <CategoriesListElement
                        key={key}
                        handleChangeComplete={this.handleChangeComplete}
                        name={this.props.categories[i].name}
                        color={this.state.colors[i]} i={i}
                        deleteCategory={this.deleteCategory}
                        categoryNameChange={this.categoryNameChange}
                        lang={this.props.lang}
                    />
                );

                this.setState({ newCategoriesList: newCategoriesList, keys: keys });
            });
        });
    }

    deleteCategory(i) {
        let colors = this.state.colors;
        colors.splice(i, 1);
        let keys = this.state.keys;
        keys.splice(i, 1);
        this.setState({ colors: colors, keys: keys }, () => {
            let categoriesList = this.props.categories;
            categoriesList.splice(i, 1);
            this.setState({ categoriesList: categoriesList }, () => {
                this.setState((state) => ({ countCategories: state.countCategories - 1 }), this.createCategoriesList);
            });
        });

    }

    updateCategories() {
        let categoriesList = this.props.categories;
        let colors = this.state.colors;
        for (let j = 0; j < categoriesList.length; j++) {
            let name = categoriesList[j].name.trim();
            if (name === "(" + this.props.lang.click_to_change_name + ")") name = this.props.lang.new_category;

            categoriesList[j].name = name.slice(0, 20);
            categoriesList[j].color = colors[j];
        }

        sendCategories(categoriesList);
        this.props.update();
    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.lang.number_of_categories} [{this.state.countCategories}/8]
                    <Icon name="add circle" color="green"
                        title={this.props.lang.add_category}
                        style={{ marginLeft: ".5rem" }}
                        className="cursor-pointer"
                        onClick={this.addCategory}
                    />
                </h2>
                <Accordion fluid styled style={{ boxShadow: "none" }}>
                    <Transition.Group as={ItemGroup} duration={250} style={{ backgroundColor: "#f1f1f1" }}>
                        {this.state.newCategoriesList.map((item, index) => {
                            return <Item key={index} style={{ margin: "0" }}>{item}</Item>
                        })}
                    </Transition.Group>
                </Accordion>
                <Button style={{ margin: "2rem 0 0 44.1%" }} color="green" onClick={this.updateCategories}>
                    <Icon style={{ opacity: "1" }} name="save" /> {this.props.lang.save}
                </Button>
            </div>
        );
    }
}