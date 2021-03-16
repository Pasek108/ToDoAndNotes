import React from 'react';
import { Container, Header, Form, TextArea } from 'semantic-ui-react';

export default function Contact(props) {
    return (
        <div style={{ minHeight: "calc(100vh - 7.2rem)", paddingBottom: "1rem" }}>
            <Container>
                <div className="mb-1" style={{ width: "80%", float: "left" }}>
                    <Header as="h2">Kontakt</Header>
                    <p>
                        Witaj na stronie kontaktowej.
                        <ul>
                            <li>Zauważyłeś błąd?</li>
                            <li>Masz pytanie którego nie ma w <a href="#" onClick={props.openHelp}>pomocy</a>?</li>
                            <li>Masz pomysł na zmianę?</li>
                        </ul>
                        Jeśli tak, napisz do mnie używając pola poniżej, postaraj się jak najdokładniej opisać swój problem.

                    </p>
                </div>
                <div style={{ width: "20%", float: "left" }} className="known-problems">
                    <div>Lista znanych problemów</div>
                    <ul>
                        <li>Brak</li>
                    </ul>
                </div>
                <div style={{ width: "100%", float: "left" }}>
                    <textarea rows="15" placeholder='Napisz wiadomośc' className="contact-textarea" />
                </div>
            </Container>
        </div>
    );
}