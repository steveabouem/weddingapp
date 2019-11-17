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
        let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        return (
            <div className='gla_page'>
                {!iOS && <MusicPlayer />}
                <TopNav />
                <Container
                    additionalClass='text-center padded'
                    id='intro-section'
                >
                    <div className='gif-container'/>
                    <div className='overlay-cover'/>
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
                <Container additionalClass='text-center padded vows'>
                    <div className='gif-container' id='story-top-gif'>
                        <div className='animated-div our-story' />
                    </div>
                    <div className='center-gif story-gif'/>
                    <h3>Notre histoire</h3>
                    <div className='couples-quotes'>
                        <p className='his'>
                            <div className='innner'>
                                <div className='material-icons quote open'>format_quote</div>Surprenante,<br/>
                                Montagnes russes, une vraie boule d'énergie
                                <br/>
                                Souriante,<br/>
                                Nos jours ne sont que rarement gris
                                Inlassablement,<br/>
                                originale, candide... conquis.<br/>
                                Mon amie,<br/>
                                ma promise, ma demeure,<br/>
                                <b>Elle...C'est ELLE.</b>
                                <div className='material-icons quote'>format_quote</div><br/>
                            </div>
                            <span>Jacques Arnaud</span>
                        </p>
                        <p className='hers'>
                            <div className='inner'>
                                <div className='material-icons quote open'>format_quote</div>
                                The way you vex me ehn,I can’t describe!<br/> 
                                <br/>
                                But as you get me on my nerves you proportionally know how to soothe me.<br/>
                                As if God gave you the key, of simple little me.<br/>
                                I fell in love with a good man, thanks to some precious and inspiring features of his.<br/>
                                My reflection through his eyes is where I intent to reach for he makes me better.<br/>
                                To my Haiku, my man, my friend and my future,<br/>
                                <b>See you at the altar, Mr Manga.</b>
                                <div className='material-icons quote'>format_quote</div><br/>
                            </div>
                            <span>Grace Line</span>
                        </p>
                    </div>
                    <div className='bottom-line'/>
                </Container>
                <Container additionalClass='text-center padded'>
                    <div className='gif-container'>
                        <div className='animated-div wedding-details' />
                    </div>
                    <div className='center-gif details-gif'/>
                    <h3>Détails de la cérémonie</h3>
                    <p>
                        La <b>cérémonie de mariage civil</b> suivie du vin d’honneur, se tiendra à <b>Nyom, le Vendredi 27 décembre 2019 à partir de 14h</b>. <br/>
                        Le <b>culte œcuménique</b> de célébration nuptiale aura lieu le <b>samedi 28 décembre 2019, dès 15h à Nkoabang</b>. 
                        La nourriture, la musique , la danse c’est juste après au même endroit :)
                    </p>
                    <div className='bottom-line'/>
                </Container>
                <RSVPForm hasCodeField />
                <Container id='thank-you-bottom'>
                    <div className='gif-container'>
                        <div className='animated-div thank-you' />
                    </div>
                    <div className='credentials'>
                        <a href='mailto:webmaster@example.com'>Contacter le développeur</a>.
                    </div>
                </Container>
            </div>
        );
    }
}

Main.contextType = FirebaseContext;