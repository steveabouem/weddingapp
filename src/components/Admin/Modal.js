import React from 'react';
import moment from 'moment';
import {FirebaseContext} from '../Context';
import RSVPForm from '../Main/RSVPForm';

export class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentGuest: null,
            isLoading: true,
            isFormActive: false,
            isOpen: props.isOpen,
            displayWarning: false
        };

        this.toggleForm = this.toggleForm.bind(this);
        this.toggleWarning = this.toggleWarning.bind(this);
    }

    async toggleForm() {
        await this.setState({isFormActive: !this.state.isFormActive});
        this.props.shouldEnlargeModal(this.state.isFormActive);
    }
    
    toggleWarning() {
        this.setState({displayWarning: !this.state.displayWarning});
    }

    componentDidMount() {
        let currentGuest = this.props.currentGuest;
        
        if(currentGuest && currentGuest[0]) {
            this.setState({currentGuest: currentGuest[0], isLoading: false});
        } 
    }

    render() {
        const {currentGuest, isLoading, isFormActive, displayWarning} = this.state;
        const {removeGuest} = this.context;
        const {toggleModal} = this.props;
        return isLoading ? (
            <div className='material-icons loading'>person_pin</div>
        ) : (
            <ul>
                {isFormActive ? (
                    <RSVPForm closeAction={this.toggleForm} referer={currentGuest} callback={this.toggleForm} />
                )
                    :
                (
                    <div className='enlarge-modal'>
                        <li>
                            <h5>Prénom</h5>
                            <span>{currentGuest.firstName}</span>
                        </li>
                        <li>
                            <h5>Nom</h5>
                            <span>{currentGuest.lastName}</span>
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
                            <span>
                                {currentGuest.registered_on ?
                                    moment(currentGuest.registered_on).format('DD MM YYYY, h:mm:ss a')
                                    :
                                    'N/A'
                                }
                            </span>
                        </li>
                        <li className='modal-buttons'>
                            <span>MODIFIER</span>
                            <span onClick={this.toggleWarning}>SUPPRIMER</span>
                            <span onClick={this.toggleForm}>AJOUTER +1</span>
                        </li>
                        {displayWarning && (
                            <li className='modal-buttons warning'>
                                Cette opération est totalement irréversible!
                                <span id='delete-guest' onClick={() =>{removeGuest(currentGuest.uid, toggleModal);}}>ÉFFACES DISDONC</span>
                                <span onClick={this.toggleWarning}>ANNULER</span>
                            </li>
                        )}
                    </div>
                )}
            </ul>
        );
    }
}

Modal.contextType = FirebaseContext;