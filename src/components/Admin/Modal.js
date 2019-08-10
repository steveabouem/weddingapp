import React from 'react';
import { toast } from 'react-toastify';

export class Modal extends React.Component {
    constructor() {
        super();

        this.state = {
            currentGuest: null,
            isLoading: true
        };
    }

    componentDidMount() {
        let currentGuest = this.props.currentGuest;
        console.log(currentGuest);
        
        if(currentGuest && currentGuest[0]) {
            this.setState({currentGuest: currentGuest[0], isLoading: false});
        } 
    }

    render() {
        const {currentGuest, isLoading} = this.state;
        return isLoading ? (
                <div className='material-icons loading'>person_pin</div>
            )
            :
            (
            <ul>
                <li>{currentGuest.firstName}</li>
                <li>{currentGuest.number}</li>
                <li>{currentGuest.email}</li>
                {/* <li>{currentGuest.email}</li> */}
                
            </ul>
        );
    }
}