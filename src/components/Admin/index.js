import React from 'react';
import {MemoryRouter, Switch, Route, NavLink} from 'react-router-dom';
import {FirebaseContext} from '../Context';
import {TopNav} from '../Menus/TopNav';
import {WelcomeAdmin} from './Welcome';
import {BlogPostForm} from './BlogPostForm';
import {PostMedia} from './PostMedia';
import {GuestList} from './GuestList';
import {Modal} from './Modal';

export class AdminWorkSpace extends React.Component {
    constructor() {
        super(); 

        this.state = {
            isGuestModalOpen: false,
            enlargeModal: false,
            isExpanded: true
        };

        this.renderGuestInfo = this.renderGuestInfo.bind(this);
        this.toggleModal= this.toggleModal.bind(this);
        this.shouldEnlargeModal= this.shouldEnlargeModal.bind(this);
        this.toggleSidebar= this.toggleSidebar.bind(this);
    }

    renderGuestInfo(uid) {
        let currentGuest = this.context.guestList.filter(guest => guest.uid === uid);
        
        this.setState({isGuestModalOpen: true, currentGuest});
    }

    toggleModal() {
        this.setState({isGuestModalOpen: !this.state.isGuestModalOpen});
    }
    
    
    toggleSidebar() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    async shouldEnlargeModal(bool) {
        this.setState({enlargeModal: bool});
    }


    render() {
        const {isGuestModalOpen, currentGuest, enlargeModal, isExpanded} = this.state;

        return (
            <React.Fragment>
                {isGuestModalOpen && (
                    <div className={'admin-modal' + (enlargeModal ? ' enlarged' : '')}>
                        <div 
                            className='material-icons close' 
                            onClick={this.toggleModal}
                        >
                            close
                        </div>
                        <Modal 
                            currentGuest={currentGuest}
                            isOpen={isGuestModalOpen} 
                            toggleModal={this.toggleModal}
                            shouldEnlargeModal={this.shouldEnlargeModal} 
                        />
                    </div>
                )}
                <TopNav displayHomeLink additionalClassName='admin-nav' navStyle={{background: '#108fa0!important'}}/>
                <div className='gla_page' id='guests-container'>
                    <MemoryRouter>
                        <div className='admin-space'>
                            <div className={'admin-sidebar' + (isExpanded ? '-expanded' : '')}>
                                <Switch>
                                    <ul className='admin-links'>
                                        <NavLink to='/invites' activeClassName='admin-link-active'>
                                            <li onClick={this.toggleSidebar}>
                                                <span>
                                                    LISTE DES INVITÉS
                                                </span>
                                            </li>
                                        </NavLink>
                                        <NavLink to='/articles' activeClassName='admin-link-active'>
                                            <li  onClick={this.toggleSidebar}>
                                                <span>
                                                    AJOUTER DES NOUVELLES
                                                </span>
                                            </li>
                                        </NavLink>
                                        {/* <NavLink to='/media' activeClassName='admin-link-active'>
                                            <li  onClick={this.toggleSidebar}>
                                                <span>
                                                    POSTER DES PHOTOS/VIDEOS
                                                </span>
                                            </li>
                                        </NavLink> */}
                                    </ul>
                                </Switch>
                            </div>
                            <div className='admin-data-panel'>
                                <Route exact path='/' component={WelcomeAdmin} />
                                <Route path='/invites' render={() => (<GuestList renderGuestInfo={this.renderGuestInfo} toggleModal={this.toggleModal} toggleSidebar={this.toggleSidebar}/>)} />
                                <Route exact path='/articles' render={()=> <BlogPostForm toggleSidebar={this.toggleSidebar} />} />
                            </div>
                        </div>
                    </MemoryRouter>
                </div>
            </React.Fragment>
        );
    }
}

AdminWorkSpace.contextType = FirebaseContext;