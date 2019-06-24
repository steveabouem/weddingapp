import React from 'react';
import {Container} from '../Sections';
import TopNav from '../Menus/TopNav';

export default class GuestList extends React.Component {
    constructor() {
        super();

        this.state = {
            list: [],
            selected: {}
        };

        this.listItemRef = React.createRef();
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {

    }

    handleSelect(e) {
        // this.listItemRef.current.style (...)
    }

    get confirmedGuests() {
        let filteredList = this.state.list.filter( guest => (guest.confirmed));
        return filteredList;
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    render() {
        const {list, selected} = this.state;
        return(
            <div className='gla_page'>
                <TopNav />
                <Container id='guest-list-page' hasScrollicon>
                    <div className='guest-stats'>
                        <span>Total</span>
                        <span>{list.length}</span>
                        <span>confirmed</span>
                        <span>{this.confirmedGuests}</span>
                        <span>Total</span>
                    </div>
                    <ul className='list'>
                        {
                            [{name: 'test', number: 'testNum'}, {name: 'test', number: 'testNum'}].map( guest => {
                                return (
                                    <li 
                                        onClick={this.handleSelect} 
                                        ref={this.listItemRef} className={'guest-details' + (selected.name === guest.name ? ' active' : '')}
                                    >
                                        Name: {guest.name}
                                        Contact: {guest.number}
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