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