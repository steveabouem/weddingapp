import React from 'react';
import {Container} from '../Sections';
import {FirebaseContext} from '../Context';

export class GuestList extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: {}
        };
        this.guestRef = React.createRef();
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

    async componentDidMount() {
        await this.context.loadGuestList();
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }


    render() {
        const {addNewGuest, selectGuest, guestSelected, guestList} = this.context;

        return(
            <React.Fragment>
                <Container additionalClass='text-center' id='guest-list-wrap'>
                    <div className='list'>
                        <div className='list-inner'>
                            <h2>STATISTIQUES INVITÉS</h2>
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
                            </span>
                        </div>
                    </div>
                </Container>
            </React.Fragment>
        );
    }

}

GuestList.contextType = FirebaseContext;