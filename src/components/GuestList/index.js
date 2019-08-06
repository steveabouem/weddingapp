import React from 'react';
import {Container} from '../Sections';
import TopNav from '../Menus/TopNav';
import {FirebaseContext} from '../Context';

export default class GuestList extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: {}
        };

        this.listItemRef = React.createRef();
    }

    async componentDidMount() {
        await this.context.loadGuestList();
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    get confirmedGuests() {
        let filteredList = [];
        if(this.context.guestList) {
            filteredList = this.context.guestList.filter( guest => (
                guest.confirmed
            ));
        }	
        return filteredList.length
    }

    render() {
        const {addNewGuest, removeGuest, selectGuest, guestSelected, guestList} = this.context;

        return(
            <div className='gla_page' id='guests-container'>
                <TopNav displayHomeLink additionalClassName='admin-nav' navStyle={{background: '#108fa0!important'}}/>
                <Container additionalClass='text-center' id='guest-list-wrap'>
                    <div className='guest-stats'>
                        <span>Total</span>
                        <span>{guestList && guestList.length}</span>
                        <span>confirmed</span>
                        <span>{this.confirmedGuests}</span>
                        <span>Total</span>
                    </div>
                    <ul className='list'>
                        {
                            guestList && guestList.length > 0 && guestList.map( guest => {
                                return (
                                    <li 
                                        onClick={() => selectGuest(guest)} 
                                        ref={this.listItemRef} className={'guest-details' + (guestSelected && guestSelected.name === guest.name ? ' active' : '')}
                                    >
                                        <span><b>Nom:</b> {guest.lastName}</span>
                                        <span><b>Prénom:</b> {guest.firstName}</span>
                                        <span><b>Cel:</b> {guest.number}</span>
                                        <span><b>Confirmé:</b> {guest.confirmed ? 'Oui' : 'Non'}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Container>
            </div>
        );
    }

}

GuestList.contextType = FirebaseContext;