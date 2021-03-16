import React, { useState } from 'react';
import { Container, Grid, Menu, List, Card, Header } from 'semantic-ui-react';

function HelpMainPage(props) {
    return (
        <>
            <Header as="h3">Pomoc</Header>
            <p>
                W tej części strony znajduje się opis jej funkcji oraz szybkie odpowiedzi na pytania.
                Jeśli czegoś nie wiesz zajrzyj w szybkie pytania w części która sprawia ci problemy. 
                Jeśli nie znajdziesz tam odpowiedzi na swoje pytanie przeglądnij wszystko z nią związane z możesz je zadać <a href="#" onClick={props.openContact}>tutaj</a>
            </p>
        </>
    );
}

function TaskListHelp(props) {
    return (
        <>
            <Card fluid>
                <Card.Content description={
                    <List ordered>
                        <List.Item as='a'>Ekran główny</List.Item>
                        <List.Item>
                            <a>Listy zadań</a>
                            <List.List>
                                <List.Item as='a'>Gotowe listy</List.Item>
                                <List.Item as='a'>Listy użytkownika</List.Item>
                                <List.Item as='a'>Dodawanie nowych list</List.Item>
                                <List.Item as='a'>Usuwanie list</List.Item>
                                <List.Item as='a'>Edycja list</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item>
                            <a>Zadania</a>
                            <List.List>
                                <List.Item as='a'>Dodawanie zadań</List.Item>
                                <List.Item as='a'>Dodawanie zadań podrzędnych</List.Item>
                                <List.Item as='a'>Edycja zadań i ich zadań podrzędnych</List.Item>
                                <List.Item as='a'>Usuwanie zadań</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item as='a'>Szybkie pytania</List.Item>
                    </List>
                } />
            </Card>
        </>
    );
}

function NotesHelp(props) {
    return (
        <>
            <Card fluid>
                <Card.Content description={
                    <List ordered>
                        <List.Item as='a'>Ekran głowny</List.Item>
                        <List.Item as='a'>Kategorie</List.Item>
                        <List.Item>
                            <a>Notatki</a>
                            <List.List>
                                <List.Item as='a'>Dodawanie notatek</List.Item>
                                <List.Item as='a'>Edycja notatek</List.Item>
                                <List.Item as='a'>Przypisywanie notatek do kategorii</List.Item>
                                <List.Item as='a'>Usuwanie Notatek</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item as='a'>Szybkie pytania</List.Item>
                    </List>
                } />
            </Card>
        </>
    );
}

function PreferencesHelp(props) {
    return (
        <>
            <Card fluid>
                <Card.Content description={
                    <List ordered>
                        <List.Item as='a'>Motyw</List.Item>
                        <List.Item>
                            <a>Import/Eksport</a>
                            <List.List>
                                <List.Item as='a'>Po co jest ta opcja?</List.Item>
                                <List.Item as='a'>Import zadań i notatek</List.Item>
                                <List.Item as='a'>Eksport zadań i notatek</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item as='a'>Pozostałe</List.Item>
                        <List.Item as='a'>Szybkie pytania</List.Item>
                    </List>
                } />
            </Card>
        </>
    );
}

function Questions(props) {
    return (
        <>
            
        </>
    );
}

export default function Help(props) {
    const [activeItem, setActive] = useState(0);
    const backgroundWhite = { background: "#fafafa" };
    const backgroundUnset = { background: "unset" };

    const menuNames = ["Strona pomocy", "Lista zadań", "Notatki", "Preferencje", "Pytania ogólne"];
    let menuItems = [];
    let activeContent;
    for (let i = 0; i < 5; i++) {
        menuItems.push(
            <Menu.Item style={(activeItem === i) ? backgroundWhite : backgroundUnset}
                name={menuNames[i]}
                active={activeItem === i}
                onClick={() => setActive(i)}
            />
        )

        if (activeItem === 0) activeContent = <HelpMainPage openContact={props.openContact} />
        else if (activeItem === 1) activeContent = <TaskListHelp />
        else if (activeItem === 2) activeContent = <NotesHelp />
        else if (activeItem === 3) activeContent = <PreferencesHelp />
        else if (activeItem === 4) activeContent = <Questions />
    }

    return (
        <Container>
            <Grid columns={2} style={{ minHeight: "calc(100vh - 5.2rem)", paddingBottom: "1rem" }}>
                <Grid.Row className="p-0">
                    <Grid.Column width={3} className="p-0">
                        <Menu fluid vertical tabular style={{ height: "100%", padding: "1rem 0" }}>
                            {menuItems}
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={13} className="p-1" style={backgroundWhite}>
                        {activeContent}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}