import React from 'react';
import FlipClock from 'x-react-flipclock';
import {BottomSection} from '../Main/BottomSection';

export const Countdown = () => (
    <BottomSection>
        <div className='gif-container'>
            <div className=' animated-div countdown-gif' />
        </div>
        <div className='flipclock-wrap'>
            <FlipClock 
                type = "countdown"
                count_to = "2019/12/28 19:00:00"
                style={{width: '80%'}}
                units={[
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
                        type: 'minutes',
                        title: 'Minutes',
                    },
                    {
                        sep: ':',
                        type: 'seconds',
                        title: 'Secondes',
                    },
                ]}
            />
        </div>
    </BottomSection>
);