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

    componentDidMount() {
        this.context.loadGuestList();
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
        // const {list, selected} = this.state;
        const {addNewGuest, removeGuest, selectGuest, guestSelected, guestList} = this.context;

        return(
            <div className='gla_page' id='guests-container'>
                <TopNav displayHomeLink/>
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
                            guestList &&  guestList.map( guest => {
                                return (
                                    <li 
                                        onClick={() => selectGuest(guest)} 
                                        ref={this.listItemRef} className={'guest-details' + (guestSelected && guestSelected.name === guest.name ? ' active' : '')}
                                    >
                                        Nom: {guest.name}
                                        Cel: {guest.number}
                                        Confirmé: {guest.confirmed ? 'Oui' : 'Non'}
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