import React from 'react';
import { Checkbox, Container, Divider, Header, Icon, Select } from 'semantic-ui-react';

function Theme(props) {
    const themes = [
        { key: 'neutral', value: 'Neutral', text: 'Neutralny' },
        { key: 'warm', value: 'Warm', text: 'Ciepły' },
        { key: 'cold', value: 'Cold', text: 'Zimny' }
    ]

    return (
        <>
            <Header as="h2">Motyw</Header>
            <Container fluid className="preferences-container">
                <div className="flex">
                    <strong>Ciemny motyw:</strong>
                    <Checkbox toggle className="mx-05" />
                    <Icon name="question circle" style={{ fontSize: "1.5rem" }} />
                </div>
                <Divider />

                <div className="flex">
                    <div className="flex break">
                        <strong>Automatyczna zmiana motywu:</strong>
                        <Checkbox toggle className="mx-05" />
                        <Icon name="question circle" style={{ fontSize: "1.5rem" }} />
                    </div>
                    <div><br />
                        Od: <input type="time" className="preferences-date ml-02" />
                        <div className="mx-05" style={{ display: "inline-block" }} />
                        Do: <input type="time" className="preferences-date ml-02" />
                    </div>
                </div>
                <Divider />

                <div className="flex">
                    <strong className="break mb-1">Typ motywu:</strong>
                    <div className="break mb-05">
                        <div className="label">Jasny:</div>
                        <select className="preferences-select mx-05">
                            {themes.map(elem => {
                                return <option key={elem.key} value={elem.value}>{elem.text}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <div className="label">Ciemny:</div>
                        <select className="preferences-select mx-05">
                            {themes.map(elem => {
                                return <option key={elem.key} value={elem.value}>{elem.text}</option>
                            })}
                        </select>
                    </div>
                </div>
                <Divider />
            </Container>
        </>
    );
}

function ImportExport(props) {
    return (
        <>
            <Header as="h2">Import/Eksport</Header>
            <Container fluid className="preferences-container">

            </Container>
        </>
    );
}

function Other(props) {
    return (
        <>
            <Header as="h2">Pozostałe</Header>
            <Container fluid className="preferences-container">
                <div className="flex">
                    <strong>Wyłącz animacje:</strong>
                    <Checkbox toggle className="mx-05" />
                </div>
                <Divider />

                <div className="flex">
                    <strong>Wyłącz ostrzeżenia:</strong>
                    <Checkbox toggle className="mx-05" />
                </div>
                <Divider />

                <div className="flex">
                    <strong>Autozapis notatek:</strong>
                    <Checkbox toggle className="mx-05" />
                </div>
                <Divider />
            </Container>
        </>
    );
}

export default function Preferences(props) {
    return (
        <div style={{ minHeight: "calc(100vh - 7.2rem)", paddingBottom: "1rem" }}>
            <Container>
                <Theme />
                <ImportExport />
                <Other />
                <div className="backup-default-settings">Przywróć ustawienia domyślne</div>
            </Container>
        </div>
    );
}