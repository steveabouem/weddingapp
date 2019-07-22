import React from 'react';
import FlipClock from 'x-react-flipclock';

export const Countdown =() => (
    <div className='bottom-section-wrap'>
        <div className='gif-container'>
            <div className=' animated-div countdown-gif' />
        </div>
        <div className='flipclock-wrap'>
            <FlipClock 
                type = "countdown"
                count_to = "2019/12/28 00:00:00"
                style={{width: '80%'}}
                units={[
                    {
                        sep: '/',
                        type: 'months',
                        title: 'Mois',
                    },
                    {
                        sep: '/',
                        type: 'days',
                        title: 'Jours',
                    },
                    {
                        sep: ':',
                        type: 'hours',
                        title: 'Heures',
                    },
                    {
                        sep: ':',
                        type: 'seconds',
                        title: 'Secondes',
                    },
                ]}
            />
        </div>
        {/* </span> */}
    </div>
);