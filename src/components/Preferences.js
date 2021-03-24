import React, { useState } from 'react';
import { Checkbox, Container, Divider, Header, Icon } from 'semantic-ui-react';

function Theme(props) {
    const lang = props.lang;
    const themes = [
        { key: 'neutral', value: 'Neutral', text: lang.neutral },
        { key: 'warm', value: 'Warm', text: lang.warm },
        { key: 'cold', value: 'Cold', text: lang.cold }
    ];

    const [darkThemeOn, toggleTheme] = useState(localStorage.getItem("darkThemeOn") === "true");
    const [lightThemeType, toggleLightThemeType] = useState(localStorage.getItem("light_theme"));

    return (
        <>
            <Header as="h2">{lang.theme}</Header>
            <Container fluid className="preferences-container">
                <div className="flex">
                    <strong>{lang.dark_theme}:</strong>
                    <Checkbox toggle className="mx-05" checked={darkThemeOn} onClick={() => {
                        const body = document.getElementsByTagName("body")[0];
                        const footer = document.getElementsByClassName("footer")[0];

                        if (!darkThemeOn) {
                            body.style.backgroundColor = "#222222";
                            footer.style.backgroundColor = "#151515";
                            body.style.color = "whitesmoke";
                            localStorage.setItem("darkThemeOn", "true");
                        }
                        else {
                            if (lightThemeType === "Neutral") body.style.backgroundColor = "#F1F1F1";
                            else if (lightThemeType === "Warm") body.style.backgroundColor = "#F0EDE5";
                            else body.style.backgroundColor = "#EDF1FF";

                            body.style.color = "black";
                            footer.style.backgroundColor = "#222222";
                            localStorage.setItem("light_theme", lightThemeType);
                            localStorage.setItem("darkThemeOn", "false");
                        }

                        toggleTheme(!darkThemeOn);
                    }} />
                    <Icon name="question circle" style={{ fontSize: "1.5rem" }} />
                </div>
                <Divider />

                <div className="flex">
                    <div className="flex break">
                        <strong>{lang.auto_change_theme}:</strong>
                        <Checkbox toggle className="mx-05" />
                        <Icon name="question circle" style={{ fontSize: "1.5rem" }} />
                    </div>
                    <div><br />
                        {lang.from}: <input type="time" className="preferences-date ml-02" />
                        <div className="mx-05" style={{ display: "inline-block" }} />
                        {lang.to}: <input type="time" className="preferences-date ml-02" />
                    </div>
                </div>
                <Divider />

                <div className="flex">
                    <strong className="break mb-1">{lang.theme_type}:</strong>
                    <div className="break mb-05">
                        <div className="label">{lang.light}:</div>
                        <select className="preferences-select mx-05" value={lightThemeType} onChange={(e) => {
                            const body = document.getElementsByTagName("body")[0];
                            const newThemeType = e.target.value;

                            if (!darkThemeOn) {
                                if (newThemeType === "Neutral") body.style.backgroundColor = "#F1F1F1";
                                else if (newThemeType === "Warm") body.style.backgroundColor = "#F0EDE5";
                                else body.style.backgroundColor = "#EDF1FF";

                                localStorage.setItem("light_theme", newThemeType);
                                body.style.color = "black";
                            }

                            toggleLightThemeType(newThemeType);
                        }}>
                            {themes.map(elem => {
                                return <option key={elem.key} value={elem.value}>{elem.text}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <div className="label">{lang.dark}:</div>
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
    const lang = props.lang;

    return (
        <>
            <Header as="h2">{lang.import}/{lang.export}</Header>
            <Container fluid className="preferences-container">

            </Container>
        </>
    );
}

function Other(props) {
    const lang = props.lang;

    return (
        <>
            <Header as="h2">{lang.other}</Header>
            <Container fluid className="preferences-container">
                <div className="flex">
                    <strong>{lang.turn_off_animations}:</strong>
                    <Checkbox toggle className="mx-05" />
                </div>
                <Divider />

                <div className="flex">
                    <strong>{lang.turn_off_warnings}:</strong>
                    <Checkbox toggle className="mx-05" />
                </div>
                <Divider />

                <div className="flex">
                    <strong>{lang.auto_save_notes}:</strong>
                    <Checkbox toggle className="mx-05" />
                </div>
                <Divider />
            </Container>
        </>
    );
}

export default function Preferences(props) {
    const lang = props.lang;

    return (
        <div style={{ minHeight: "calc(100vh - 7.2rem)", paddingBottom: "1rem" }}>
            <Container>
                <Theme lang={lang} />
                <ImportExport lang={lang} />
                <Other lang={lang} />
                <div className="backup-default-settings">{lang.restore_default_settings}</div>
            </Container>
        </div>
    );
}