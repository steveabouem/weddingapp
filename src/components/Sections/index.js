import React from 'react';

export const Container = ({children, id, hasScrollicon, handleClick, additionalClass}) => (
    <div className={'container ' + (additionalClass ? additionalClass : '')}  id={id}>
        {hasScrollicon && 
            <React.Fragment>
                <div
                    onClick={() => handleClick()}
                    className='gla_slider gla_image_bck  gla_wht_txt gla_fixed' 
                    data-image='images/wedding/andy_jeska/10099882125_4afe7c6786_k_mb.jpg' 
                    data-stellar-background-ratio='0.8'
                    style={{
                        backgroundImage: 'url(&quot;images/wedding/andy_jeska/10099882125_4afe7c6786_k_mb.jpg&quot;)',
                        backgroundAttachment: 'fixed', backgroundPosition:' 50% 0px'
                    }}
                >
                    <div className='gla_over' data-color='#9abab6' data-opacity='0.2' style={{backgroundColor:' rgb(154, 186, 182)', opacity: '0.2'}}/>
                    <div className='container'>
                        <div className='gla_slide_txt gla_slide_center_bottom text-center'>
                            <p>
                                <img 
                                    src='images/animations/ourwedding_wh.gif' 
                                    data-top-bottom='@src:images/animations/ourwedding_wh.gif' 
                                    alt='' height='150' className='skrollable skrollable-before'
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <a className='gla_scroll_down gla_go' href='#gla_content'>
                    <b></b>
                    <span className='material-icons'>arrow_downward</span>
                </a>
            </React.Fragment>
        }
        {children}
    </div>
);