import React from 'react';
import {Container} from '../Sections';
import {FirebaseContext} from '../Context';
import RSVPForm from '../Main/RSVPForm';
// ADD SELF CANCEL FEATURE FOR GUESTS


export class GuestList extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: {},
            isFormModalOpen: false
        };
        
        this.toggleForm = this.toggleForm.bind(this);
        this.guestRef = React.createRef();
    }

    toggleForm() {
        this.setState({isFormModalOpen: !this.state.isFormModalOpen});
    }

    get confirmedGuests() {
        let filteredList = [];
        if(this.context.guestList) {
            filteredList = this.context.guestList.filter( guest => (
                guest.confirmed
            ));
        }	
        return filteredList.length;
    }

    async componentDidMount() {
        await this.context.loadGuestList();
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }


    render() {
        const {editGuest, guestList, guestsLoaded} = this.context;
        const {isFormModalOpen} = this.state;

        return !guestsLoaded ? (
                <div className='material-icons loading'>view_list</div>
            )
            :
            (
            <React.Fragment>
                <Container additionalClass='text-center' id='guest-list-wrap'>
                    <span className='material-icons add-guest-button default' onClick={this.toggleForm}>add</span>
                    <div className='list'>
                        <div className='list-inner'>
                            <h1>STATISTIQUES INVITÉS</h1>
                            <span className='list-headers'>
                                {
                                    guestList && guestList.length > 0 && guestList.map( guest => {
                                        return (
                                            <div 
                                                className='guest-info' ref={this.guestRef}
                                                onClick={() => {this.props.renderGuestInfo(guest.uid)}}
                                                key={guest.uid}
                                            >
                                                <ul>
                                                    <li>{guest.lastName}</li>
                                                </ul>
                                            </div>
                                        );
                                    })
                                }
                                {guestList && !guestList[0] && (
                                    <React.Fragment>
                                        <p>
                                            Liste vide! <br/>
                                            Vous pouvez manuellement ajourter des invités <span className='add-guest-button' onClick={this.toggleForm}>ici</span>
                                        </p>
                                    </React.Fragment>
                                )}
                            </span>
                        </div>
                    </div>
                </Container>
                {isFormModalOpen && (
                    <div className='admin-modal'>
                            <RSVPForm hasCodeField={false} closeAction={this.toggleForm}/>
                    </div>
                )}
            </React.Fragment>
        );
    }

}

GuestList.contextType = FirebaseContext;