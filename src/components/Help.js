import React, { useState } from 'react';
import { Container, Grid, Menu, List, Card, Header, Divider } from 'semantic-ui-react';

function HelpMainPage(props) {
    return (
        <>
            <Header as="h3">Pomoc</Header>
            <p>W tej części strony znajduje się opis jej funkcji oraz odpowiedzi na pytania.</p>
            <p>
                Jeśli nie znajdziesz odpowiedzi w szybkich pytaniach w części która sprawia ci
                problemy, poszukaj w bardziej sczegółowym opisie.<br />
                Jeśli nigdzie nie ma odpowiedzi na twoje pytanie, możesz do mnie napisać <a href="#" onClick={props.openContact}>tutaj</a>.
            </p>
            <br />
            <p>Linki do pytań:</p>
            <ul>
                <li><a href="#">Lista zadań</a></li>
                <li><a href="#">Notatki</a></li>
                <li><a href="#">Preferencje</a></li>
                <li><a href="#">Kontakt</a></li>
                <li><a href="#">Pytania ogólne</a></li>
            </ul>
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
            <Divider />
            <Header as="h3">Ekran główny</Header>
            <p>Ekran główny listy notatek składa się z </p>
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
                                <List.Item as='a'>Import zadań i notatek</List.Item>
                                <List.Item as='a'>Eksport zadań i notatek</List.Item>
                            </List.List>
                        </List.Item>
                        <List.Item as='a'>Pozostałe</List.Item>
                        <List.Item as='a'>Zmiana języka</List.Item>
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
            <Grid columns={2} style={{ minHeight: "calc(100vh - 2.3rem)", paddingBottom: "1rem" }}>
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