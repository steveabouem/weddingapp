import React from 'react';
import {FirebaseContext} from '../Context'
import TopNav from '../Menus/TopNav';
import {Container} from '../Sections';
import Countdown from '../Countdown';
import RSVPForm from './RSVPForm';

export default class Main extends React.Component {
    scrollNextSection() {
        console.log('scroll');
        
    }

    render() {
        return (
            <div className='gla_page'>
                    <TopNav />
                    <Container 
                        id='main-page'
                        hasScrollIcon
                        handleClick={this.scrollNextSection}
                    >
                        <div className='gif-container'>
                            <div className='animated-div our-wedding' />
                        </div>
                    </Container>
                    <Container additionalClass='text-center' id='main-intro'>
                        <div className='animated-div flowers-main' />
                        <p>
                            My fiancé proposed on the Fourth of July. My mother asked us to go to the backyard to get
                            some chairs and he took me by the shed where we could see all of the fireworks. 
                            He kissed me, then he took the ring box out of his pocket and asked me to be his wife. 
                            He was shaking a little. The proposal was a little silly but perfect, just like him." 
                            — Jeska Cords
                        </p>
                    </Container>
                    <Container additionalClass='text-center' id='main-countdown'>
                        <Countdown />
                    </Container>
                    <Container additionalClass='text-center' id='wedding-details'>
                        <div className='gif-container'>
                            <div className='animated-div wedding-details' />
                        </div>
                        <p>
                            My fiancé proposed on the Fourth of July. My mother asked us to go to the backyard to get
                            some chairs and he took me by the shed where we could see all of the fireworks. 
                            He kissed me, then he took the ring box out of his pocket and asked me to be his wife. 
                            He was shaking a little. The proposal was a little silly but perfect, just like him." 
                            — Jeska Cords
                        </p>
                    </Container>
                    <RSVPForm />
                    <Container id='thank-you-bottom'>
                        <div className='gif-container'>
                            <div className='animated-div thank-you' />
                        </div>
                    </Container>
            </div>
        );
    }
}

Main.contextType = FirebaseContext;