import React from 'react';
import { Button, Icon, Item, Accordion, Transition, ItemGroup } from 'semantic-ui-react';
import { getCategories, sendCategories } from '../services/UserService';
import CategoriesListElement from './CategoriesListElement';

export default class CategoriesEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            newCategoriesList: [],
            colors: [],
            countCategories: 0
        }

        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.updateCategories = this.updateCategories.bind(this);
        this.createCategoriesList = this.createCategoriesList.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.categoryNameChange = this.categoryNameChange.bind(this);
    }

    componentDidMount() {
        getCategories().then(categories => {
            this.setState({
                categoriesList: categories,
                colors: categories.map((elem) => { return elem.color }),
                countCategories: categories.length - 2
            }, this.createCategoriesList)
        });
    }

    createCategoriesList() {
        let categoriesList = [];

        for (let i = 1; i < this.state.categoriesList.length - 1; i++) {
            categoriesList.push(
                <CategoriesListElement
                    key={this.state.categoriesList[i].name + i}
                    handleChangeComplete={this.handleChangeComplete}
                    name={this.state.categoriesList[i].name}
                    color={this.state.colors[i]} i={i}
                    deleteCategory={this.deleteCategory}
                    categoryNameChange={this.categoryNameChange}
                />
            );
        }

        this.setState({ newCategoriesList: categoriesList });
    }

    handleChangeComplete(i, color) {
        let newColors = this.state.colors;
        newColors[i] = color.hex;
        this.setState({ colors: newColors }, this.createCategoriesList);
    };

    categoryNameChange(e, i) {
        let categoriesList = this.state.categoriesList;
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
            let categoriesList = this.state.categoriesList;
            categoriesList.splice(categoriesList.length - 1, 0, {
                name: "Nowa kategoria",
                color: "#FBBD08"
            });
            this.setState({ categoriesList: categoriesList }, () => {
                this.setState((state) => ({ countCategories: state.countCategories + 1 }));
                const i = this.state.categoriesList.length - 2;
                let newCategoriesList = this.state.newCategoriesList;

                newCategoriesList.push(
                    <CategoriesListElement
                        key={this.state.categoriesList[i].name + i}
                        handleChangeComplete={this.handleChangeComplete}
                        name={this.state.categoriesList[i].name}
                        color={this.state.colors[i]} i={i}
                        deleteCategory={this.deleteCategory}
                        categoryNameChange={this.categoryNameChange}
                    />
                );

                this.setState({ newCategoriesList: newCategoriesList });
            });
        });
    }

    deleteCategory(i) {
        let colors = this.state.colors;
        colors.splice(i, 1);
        this.setState({ colors: colors }, () => {
            let categoriesList = this.state.categoriesList;
            categoriesList.splice(i, 1);
            this.setState({ categoriesList: categoriesList }, () => {
                this.setState((state) => ({ countCategories: state.countCategories - 1 }), this.createCategoriesList);
            });
        });

    }

    updateCategories() {
        let categoriesList = this.state.categoriesList;
        let colors = this.state.colors;
        for (let j = 0; j < categoriesList.length; j++) {
            categoriesList[j].name = categoriesList[j].name.trim().slice(0, 20);
            categoriesList[j].color = colors[j];
        }

        sendCategories(categoriesList).then(succes => { this.props.update() });
    }

    render() {
        return (
            <div>
                <h2>
                    Liczba kategorii [{this.state.countCategories}/8]
                    <Icon name="add circle" color="green"
                        style={{ marginLeft: ".5rem" }}
                        className="cursor-pointer"
                        onClick={this.addCategory}
                    />
                </h2>
                <Accordion fluid styled style={{ boxShadow: "none" }}>
                    <Transition.Group as={ItemGroup} duration={250} style={{ backgroundColor: "#f1f1f1" }}>
                        {this.state.newCategoriesList.map((item, index) => (
                            <Item key={index} style={{ margin: "0" }}>
                                {this.state.newCategoriesList[index]}
                            </Item>
                        ))}
                    </Transition.Group>
                </Accordion>
                <Button style={{ margin: "2rem 0 0 44.1%" }} color="blue" onClick={this.updateCategories}>
                    <Icon style={{ opacity: "1" }} name="save" /> Zapisz
                </Button>
            </div>
        );
    }
}