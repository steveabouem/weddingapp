import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Main from '../Main';
import {AdminWorkSpace} from '../Admin';
import Login from '../Admin/Login';
import {AdminContext, FirebaseContext} from '../Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import audio1 from '../../assets/audio/mad_over_you.mp3'
import audio2 from '../../assets/audio/why_i_love_you.mp3'

export default class WorkSpace extends React.Component {
    constructor() {
        super();
        //init taost
        toast.configure()

        // api calls
        this.loginAdmin = (entry, props) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/loginAdmin', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data:{entry}}
            )
            .then( ({data}) => {
                if(data.code !== 400) {
                    props.history.push('/invites');
                } else {
                    toast.error('Mot de passe invalide', {position: 'bottom-right'});
                }
            })
            .catch( () => {
                toast.error('Erreur inconue, contactez l\'administrateur.', {position: 'bottom-right'});
            });
        };
        
        this.loadGuestList = () => {
            axios.get('https://us-central1-our-wedding-55849.cloudfunctions.net/loadGuestList', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }
            )
            .then( res => {
                this.setState({
                    guestList: res.data.response
                });
            })
            .catch( error => {
                console.log(error);
            });
        };

        this.loadPlaylist = () => {
            axios.get('https://us-central1-our-wedding-55849.cloudfunctions.net/loadPlaylist', 
            {headers: 
            { Authorization: 'Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo',
            'content-type': 'application/json' }
            })
            .then( playlist => {
                this.setState({playlist});
            })
            .catch( () => {
                toast.error('Lecteur audio non disponible!', {
                    position: 'bottom-right'
                });
            });
        };

        this.submitRSVP = (userInfo) => {
            userInfo.registered_on = moment();

            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/submitRSVP', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {'userInfo': userInfo}}
            )
            .then( ({data}) => {
                if(data.code === 400) {
                    toast.error(data.error, {
                        position: 'bottom-right'
                    });
                } else {
                    toast.info('Votre soumission a été envoyée!', {
                        position: 'bottom-right'
                    });
                }
            })
            .catch( () => {
                toast.error('Une erreur sèest produite lors de la soumission. SVP contactez l\'administrateur!', {
                    position: 'bottom-right'
                });
            });
        };

        this.confirmGuest = (uid) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/confirmGuest', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {uid}}
            )
            .then( response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            })
        };

        this.removeGuest = (uid, callBack) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/removeGuest', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {uid}}
            )
            .then( ({data}) => {
                toast.info('Invitation annulée', {position: 'bottom-right'});
                callBack();
                this.setState({guestList: data.list})
            })
            .catch( () => {
                toast.error('Une erreur est survenue, aviser Steve', {position: 'bottom-right'});
            });
        };

        this.sendEmailInvite = (content) => {
            const email = `Chér(e) ${content.name} Merci de bien vouloir vous joindre à nous pour célébrer notre union. Votre invitation se trouve en pièce-jointe.`;
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/sendEmail', 
            {headers: 
            { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
            'content-type': 'application/json' }
            }, 
            {data: {email}}
        )
        .then( response => {
            console.log(response);
        })
        .catch( error => {
            console.log(error);
        })  
        };

        this.sendSMS = (action) => {

        };
        
        this.selectGuest = this.selectGuest.bind(this);
        this.state = {
            hasAdminPrivileges: false,
            rsvpValues: null,
            guestList: null,
            playlist: [
                {
                    artistName: 'Runtown',
                    title: 'Mad over you',
                    mp3: audio1
                },
                {
                    artistName: 'Major',
                    title: 'Why I love you',
                    mp3: audio2
                }
            ],
            guestSelected: null
        };

    }

    selectGuest(guestSelected) {
        this.setState({guestSelected});
    }

    render() {
        const {hasAdminPrivileges,rsvpValues, guestSelected, guestList, playlist} = this.state;
        return (
            <FirebaseContext.Provider value={{
                // properties
                hasAdminPrivileges,
                rsvpValues,
                guestSelected,
                guestList,
                playlist,
                
                // mutators
                selectGuest: this.selectGuest,
                addNewGuest: this.addNewGuest,
                removeGuest: this.removeGuest,
                sendSMS: this.sendSMS,
                submitRSVP: this.submitRSVP,
                loginAdmin: this.loginAdmin,
                loadGuestList: this.loadGuestList,
                loadPlaylist: this.loadPlaylist
            }}>
                <Router>
                    <Switch>
                        <Route exact path = '/' component={Main}/>
                        <Route path = '/administrateur' component={Login}/>
                        <Route path = '/invites' component={AdminWorkSpace}/>
                    </Switch>
                </Router>
            </FirebaseContext.Provider>
        );
    }
}

WorkSpace.contextType = AdminContext;