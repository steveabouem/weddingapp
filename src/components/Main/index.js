import React from 'react';
import {FirebaseContext} from '../Context'
import {TopNav} from '../Menus/TopNav';
import {Container} from '../Sections';
import {Countdown} from '../Countdown';
import RSVPForm from './RSVPForm';
import {MusicPlayer} from '../MusicPlayer';
import {SlideshowContainer} from '../Diaporama';

export default class Main extends React.Component {
    constructor() {
        super();

        this.scrollToForm = this.scrollToForm.bind(this);
    }

    scrollToForm() {
        if (document.getElementById('rsvp-wrap')) {
            document.getElementById('rsvp-wrap').scrollIntoView({ behavior: 'smooth' });
        }
    }

    render() {
        return (
            <div className='gla_page'>
                <MusicPlayer />
                <TopNav />
                <Container
                    additionalClass='text-center padded'
                    id='intro-section'
                >
                    <div className='gif-container'/>
                    <SlideshowContainer/>
                </Container>
                <Container  additionalClass='text-center padded'>
                    <div className='gif-container'>
                        <div className='animated-div our-wedding' />
                    </div>
                    <div className='center-gif wedding-gif'/>
                    <h3>Notre mariage</h3>
                    <p>
                        Nous sommes heureux de vous accueillir sur ce site. Vous y trouverez votre <a onClick={this.scrollToForm}>formulaire de réservation</a>&nbsp;
                        qui vous permettra une fois rempli d’obtenir par mail votre billet d’invitation digital. <br/>
                        Vous pourrez également, le moment venu, vous y référer pour  accéder <a href="/blog">ici</a> aux indications relatives aux différents lieux de cérémonie. Vous pouvez même dès maintenant nous écrire des petits mots et commentaires. Nous vous laissons vous plonger dans ce micro univers conçu à notre image pour vous.
                    </p>
                    <div className='bottom-line'/>
                </Container	>
                <Container additionalClass='text-center' id='main-countdown'>
                    <Countdown />
                </Container>
                <Container additionalClass='text-center padded'>
                    <div className='gif-container'>
                        <div className='animated-div our-story' />
                    </div>
                    <div className='center-gif story-gif'/>
                    <h3>Notre histoire</h3>
                    <div className='couples-quotes'>
                        <p className='his'>
                            <span>Jacques Arnaud</span><br/>
                            La cérémonie de mariage civil suivie du vin d’honneur, se tiendra à Nyom, le Vendredi 27 décembre 2019 à partir de 14h. <br/>
                            Le culte œcuménique de célébration nuptiale aura lieu le samedi 28 décembre 2019, dès 15h à Nkoabang. 
                        </p>
                        <p className='hers'>
                            <span>Grace Line</span><br/>
                            La cérémonie de mariage civil suivie du vin d’honneur, se tiendra à Nyom, le Vendredi 27 décembre 2019 à partir de 14h. <br/>
                            Le culte œcuménique de célébration nuptiale aura lieu le samedi 28 décembre 2019, dès 15h à Nkoabang. 
                        </p>
                    </div>
                    <div className='bottom-line'/>
                </Container>
                {/* <Container 
                    id='main-page'
                    hasScrollIcon
                    handleClick={this.scrollNextSection}
                    additionalClass='text-center padded'
                >
                    <div className='gif-container'>
                        <div className='animated-div our-wedding' />
                    </div>
                </Container> */}
                {/* <Container additionalClass='text-center padded' id='wedding-details'>
                    <div className='gif-container'>
                        <div className='animated-div wedding-details' />
                    </div>
                </Container> */}
                <Container additionalClass='text-center padded'>
                    <div className='gif-container'>
                        <div className='animated-div wedding-details' />
                    </div>
                    <div className='center-gif details-gif'/>
                    <h3>Détails de la cérémonie</h3>
                    <p>
                        La cérémonie de mariage civil suivie du vin d’honneur, se tiendra à Nyom, le Vendredi 27 décembre 2019 à partir de 14h. <br/>
                        Le culte œcuménique de célébration nuptiale aura lieu le samedi 28 décembre 2019, dès 15h à Nkoabang. 
                        La nourriture, la musique , la danse c’est juste après au même endroit :)
                    </p>
                    <div className='bottom-line'/>
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