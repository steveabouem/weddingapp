import React from 'react';
import TopNav from '../Menues/TopNav';
import {Container} from '../Sections';

export default class Evite extends React.Component {
    constructor() {
        super();

        this.state = {

        };

        this.createTwiliouser = this.createTwiliouser.bind(this);
        this.sendSms = this.sendSms.bind(this);
    }

    render() {
        return (
            <div className='gla_page'>
                <TopNav />
                <Container>
                    
                </Container>
            </div>
        );
    }   
}

export const Email = ({guest}) => (
    {
        'to': guest.email,
        'from': 'test@example.com',
        'subject': 'Votre invitation électronique',
        'text': 'Bonjour ' + guest.firstName + '! Vous trouverez en pièce-jointe votre invitation electronique. Nous avons hâte de vous recevoir',
        'html': '<strong>Bonjour ' + guest.firstName + '! Vous trouverez en pièce-jointe votre invitation electronique. Nous avons hâte de vous recevoir</strong>'
      }
);