import React from 'react';

var moment = require('moment');

export default class Countdown extends React.Component {
    constructor() {
        super();
        this.state = {
            timestamp: moment(),
            count: ''
        };

        this.renderCountdown = this.renderCountdown.bind(this);
    }

    renderCountdown() {
        let {timestamp} = this.state,
        values = [
            {type: 'days', value: timestamp.diff('2019, 12, 28 12:30', 'days')},
            {type: 'hours', value: timestamp.diff('2019, 12, 28 12:30', 'hours')},
            {type: 'minutes', value: timestamp.diff('2019, 12, 28 12:30', 'minutes')},
            {type: 'seconds', value: timestamp.diff('2019, 12, 28 12:30', 'seconds')}
        ];

        return (
            <span className='countdown-row countdown-show3'>
                {values.map( unit => (
                    <span className='countdown-section'>
                        <span className='countdown-amount'>
                            {unit.value}
                        </span>
                        <span className='countdown-period'>
                            {unit.type}
                        </span>
                    </span>
                ))}
            </span>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({timestamp: moment()});
          }, 1000);
    }
    
    componentDidUpdate() {
        setTimeout(() => {
            this.setState({timestamp: moment()});
          }, 1000);
    }

    render() {
        return (
            <div className='gla_countdown is-countdown'>
                <div className='gif-container'>
                    <div className=' animated-div countdown-gif' />
                </div>
                <h2>Le 28 Décembre 2019</h2>
                {this.renderCountdown()}
            </div>
        );
    }
}