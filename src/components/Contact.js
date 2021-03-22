import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export default function Contact(props) {
    const lang = props.lang;
    return (
        <div style={{ minHeight: "calc(100vh - 7.2rem)", paddingBottom: "1rem" }}>
            <Container>
                <div className="mb-1" style={{ width: "80%", float: "left" }}>
                    <Header as="h2">{lang.contact}</Header>
                    <p>{lang.welcome}.</p>
                    <ul>
                        <li>{lang.questions_list.bug}?</li>
                        <li>{lang.questions_list.question} <a href="#" onClick={props.openHelp}>{lang.questions_list.help}</a>?</li>
                        <li>{lang.questions_list.change}?</li>
                    </ul>
                    <p>{lang.describe_problem}. </p>
                </div>
                <div style={{ width: "20%", float: "left" }} className="known-problems">
                    <div>{lang.list_of_known_bugs}</div>
                    <ul>
                        <li>{lang.no_known_bugs}</li>
                    </ul>
                </div>
                <div style={{ width: "100%", float: "left" }}>
                    <textarea rows="15" placeholder={lang.write_a_message} className="contact-textarea" />
                </div>
            </Container>
        </div>
    );
}