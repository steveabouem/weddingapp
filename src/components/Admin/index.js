import React from 'react';
import {MemoryRouter, Switch, Route, NavLink} from 'react-router-dom';
import {FirebaseContext} from '../Context';
import {TopNav} from '../Menus/TopNav';
import {WelcomeAdmin} from './Welcome';
import {GuestList} from './GuestList';
import {Modal} from './Modal';

export class AdminWorkSpace extends React.Component {
    constructor() {
        super(); 

        this.state = {
            isGuestModalOpen: false
        };

        this.renderGuestInfo = this.renderGuestInfo.bind(this);
    }

    renderGuestInfo(uid) {
        let currentGuest = this.context.guestList.filter(guest => guest.uid === uid);
        
        this.setState({isGuestModalOpen: true, currentGuest});
    }

    render() {
        const {isGuestModalOpen, currentGuest} = this.state;

        return (
            <React.Fragment>
                {isGuestModalOpen && (
                    <div className='admin-modal'>
                       <Modal currentGuest={currentGuest} />
                    </div>
                )}
                <TopNav displayHomeLink additionalClassName='admin-nav' navStyle={{background: '#108fa0!important'}}/>
                <div className='gla_page' id='guests-container'>
                    <MemoryRouter>
                        <div className='admin-space'>
                            <div className='admin-sidebar'>
                                <Switch>
                                    <ul className='admin-links'>
                                        <NavLink to='/list' activeClassName='admin-link-active'>
                                            <li>
                                                    LISTE DES INVITÉS
                                            </li>
                                        </NavLink>
                                        <NavLink to='/guestlist' activeClassName='admin-link-active'>
                                            <li>
                                                    AJOUTER DES NOUVELLES
                                            </li>
                                        </NavLink>
                                        <NavLink to='/guestlist' activeClassName='admin-link-active'>
                                            <li>
                                                    POSTER DES PHOTOS/VIDEOS
                                            </li>
                                        </NavLink>
                                    </ul>
                                </Switch>
                            </div>
                            <div className='admin-data-panel'>
                                <Route path='/list' render={() => (<GuestList renderGuestInfo={this.renderGuestInfo}/>)} />
                                <Route exact path='/' component={WelcomeAdmin} />
                            </div>
                        </div>
                    </MemoryRouter>
                </div>
            </React.Fragment>
        );
    }
}

AdminWorkSpace.contextType = FirebaseContext;