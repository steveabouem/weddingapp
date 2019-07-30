import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Main from '../Main';
import GuestList from '../GuestList';
import Login from '../Admin/Login';
import {AdminContext, FirebaseContext} from '../Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class WorkSpace extends React.Component {
    constructor() {
        super();
        //init taost
        toast.configure()

        // api calls
        this.loginAdmin = (entry) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/loginAdmin', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: entry}
            )
            .then( response => {
                console.log(response);
                
            })
            .catch( error => {
                console.log(error);
            })
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

        this.submitRSVP = (userInfo) => {
            userInfo.registered_on = moment();

            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/submitRSVP', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {'userInfo': userInfo}}
            )
            .then( () => {
                toast.warn("Votre soumission a été envoyée!", {
                    position: 'bottom-right'
                  });
                  
            })
            .catch( error => {
                console.log(error);
            });
        };

        this.confirmGuest = (uid) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/confirmGuest', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: uid}
            )
            .then( response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            })
        };

        this.removeGuest = (action) => {

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
        
        // state mutators
        this.selectGuest = this.selectGuest.bind(this);

        this.state = {
            hasAdminPrivileges: false,
            rsvpValues: null,
            guestList: null,
            guestSelected: null
        };

    }

    selectGuest(guestSelected) {
        this.setState({guestSelected});
    }

    render() {
        const {hasAdminPrivileges,rsvpValues, guestSelected, guestList} = this.state;
        return (
            <FirebaseContext.Provider value={{
                hasAdminPrivileges,
                rsvpValues,
                selectGuest: this.selectGuest,
                guestSelected,
                guestList,

                addNewGuest: this.addNewGuest,
                removeGuest: this.removeGuest,
                sendSMS: this.sendSMS,
                submitRSVP: this.submitRSVP,
                loginAdmin: this.loginAdmin,
                loadGuestList: this.loadGuestList
            }}>
                <Router>
                    <Switch>
                        <Route exact path = '/' component={Main}/>
                        <Route path = '/administrateur' component={Login}/>
                        <Route path = '/invites' component={GuestList}/>
                    </Switch>
                </Router>
            </FirebaseContext.Provider>
        );
    }
}

WorkSpace.contextType = AdminContext;