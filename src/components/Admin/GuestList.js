import React from 'react';
import {Container} from '../Sections';
import {FirebaseContext} from '../Context';
import RSVPForm from '../Main/RSVPForm';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

export class GuestList extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: {},
            isFormModalOpen: false,
            isTableModeActive: false
        };
        
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleTable = this.toggleTable.bind(this);
        this.guestRef = React.createRef();
    }

    toggleForm() {
        this.setState({isFormModalOpen: !this.state.isFormModalOpen});
    }

    toggleTable() {
        this.setState({isTableModeActive: !this.state.isTableModeActive});
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
        const { guestList, guestsLoaded} = this.context;
        const {isFormModalOpen, isTableModeActive} = this.state;

        return !guestsLoaded ? (
            <div className='material-icons loading'>view_list</div>
        ) : (
            <React.Fragment>
                <Container additionalClass='text-center' id='guest-list-wrap'>
                    <span 
                        className='material-icons add-guest-button default'
                        onClick={this.toggleForm}
                        data-for='add-guest-admin'
                        data-tip='add-guest-admin'
                        data-place='left'
                    >
                        add
                    </span>
                    <span 
                        className='material-icons add-guest-button default'
                        onClick={this.toggleTable}
                        style={{top: '10%'}}
                        data-for='switch-table'
                        data-tip='switch-table'
                        data-place='left'

                    >
                        {isTableModeActive ? 'apps' : 'dvr'}
                    </span>
                    <ReactTooltip id='switch-table'>{isTableModeActive ? 'Voir cartes' : 'Voir tableau'}</ReactTooltip>
                    <ReactTooltip id='add-guest-admin'>Ajouter un(e) invité(e)</ReactTooltip>
                    <div className='list'>
                        <div className='list-inner'>
                            <h1>STATISTIQUES INVITÉS</h1>
                            <span className='list-headers'>
                                {isTableModeActive ? (
                                    <table className="">
                                        <tr className="title-row">
                                            <th>Prénom</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Tel</th>
                                            <th>Date d'enregistrement</th>
                                        </tr>
                                        {guestList && guestList.length > 0 && guestList.map( (guest, i) => (
                                            <tr className="guest-row" key={'guest-row-' + i} onClick={() =>this.props.renderGuestInfo(guest.uid)}>
                                                <td>{guest.firstName}</td>
                                                <td>{guest.lastName}</td>
                                                <td>{guest.email}</td>
                                                <td>{guest.number}</td>
                                                <td>{moment(guest.registered_on).format('DD MM YYYY, h:mm:ss a')}</td>
                                            </tr>
                                        ))}
                                    </table>
                                ) : (
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
                                )}
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