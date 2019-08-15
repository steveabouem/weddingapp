import React from 'react';
import moment from 'moment';
import {FirebaseContext} from '../Context';

export class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentGuest: null,
            isLoading: true,
            isOpen: props.isOpen
        };
    }

    componentDidMount() {
        let currentGuest = this.props.currentGuest;
        
        if(currentGuest && currentGuest[0]) {
            this.setState({currentGuest: currentGuest[0], isLoading: false});
        } 
    }

    render() {
        const {currentGuest, isLoading} = this.state;
        const {removeGuest} = this.context;
        return isLoading ? (
                <div className='material-icons loading'>person_pin</div>
            )
            :
            (
            <ul>
                <li>
                    <h5>Prénom</h5>
                    <span>{currentGuest.firstName}</span>
                </li>
                <li>
                    <h5>Nom</h5>
                    <span>{currentGuest.number}</span>
                </li>
                <li>
                    <h5>Email</h5>
                    <span>{currentGuest.email}</span>
                </li>
                <li>
                    <h5>Tel</h5>
                    <span>{currentGuest.number}</span>
                </li>
                <li>
                    <h5>Date d'enregistrement</h5>
                    <span>{moment(currentGuest.registered_on).format('DD MM YYYY, h:mm:ss a')}</span>
                </li>
                <li className='modal-buttons'>
                    <span>MODIFIER</span>
                    <span onClick={() => removeGuest(currentGuest.uid)}>SUPPRIMER</span>
                    <span>AJOUTER +1</span>
                </li>
            </ul>
        );
    }
}

Modal.contextType = FirebaseContext;