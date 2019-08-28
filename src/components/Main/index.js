import React from 'react';
import {FirebaseContext} from '../Context'
import {TopNav} from '../Menus/TopNav';
import {Container} from '../Sections';
import {Countdown} from '../Countdown';
import RSVPForm from './RSVPForm';
import {BottomSection} from './BottomSection';
import {MusicPlayer} from '../MusicPlayer';

export default class Main extends React.Component {
    constructor() {
        super();

        this.scrollNextSection = this.scrollNextSection.bind(this);
    }

    scrollNextSection() {
        console.log('scroll');
    }

    render() {
        return (
            <div className='gla_page'>
                    <MusicPlayer />
                    <TopNav />
                    <Container
                        additionalClass='text-center'
                        id='intro-section'
                    >
                        <div className='gif-container'/>
                        <div className='inner-left'/>
                        <div className='inner-right'/>
                        <h1>Grace Line & Jacques-Arnaud</h1>
                        <BottomSection title='Notre mariage' expands>
                            <p>
                                Etiam fringilla enim at mollis pulvinar. Aliquam congue commodo ornare. Mauris interdum, ipsum in condimentum sagittis, lectus neque mollis nulla, vitae pharetra eros velit sit amet ex. 
                            </p>
                        </BottomSection	>
                    </Container>
                    <Container 
                        id='main-page'
                        hasScrollIcon
                        handleClick={this.scrollNextSection}
                        additionalClass='text-center'
                    >
                        <div className='gif-container'>
                            <div className='animated-div our-wedding' />
                        </div>
                        <BottomSection title='Notre histoire' expands>
                            <p>
                                Etiam fringilla enim at mollis pulvinar. Aliquam congue commodo ornare. Mauris interdum, ipsum in condimentum sagittis, 
                                lectus neque mollis nulla, vitae pharetra eros velit sit amet ex. Praesent mollis convallis libero vitae mattis.
                                Integer consectetur hendrerit neque. Vestibulum iaculis neque et rutrum egestas. Fusce augue leo, 
                            </p>
                        </BottomSection>
                    </Container>
                    <Container additionalClass='text-center' id='main-countdown'>
                        <Countdown />
                    </Container>
                    <Container additionalClass='text-center' id='wedding-details'>
                        <div className='gif-container'>
                            <div className='animated-div wedding-details' />
                        </div>
                        <BottomSection title='Détails de la cérémonie' expands>
                            <p>
                                My fiancé proposed on the Fourth of July. My mother asked us to go to the backyard to get
                                some chairs and he took me by the shed where we could see all of the fireworks. 
                                He kissed me, then he took the ring box out of his pocket and asked me to be his wife. 
                                He was shaking a little. The proposal was a little silly but perfect, just like him." 
                                — Jeska Cords
                            </p>
                        </BottomSection>
                    </Container>
                    <RSVPForm hasCodeField />
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