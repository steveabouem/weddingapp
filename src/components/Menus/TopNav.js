import React from 'react';

export class TopNav extends React.Component {
    constructor() {
        super();

        this.scrollToForm = this.scrollToForm.bind(this);
        this.scrollToSlideShow = this.scrollToSlideShow.bind(this);
    }

    scrollToForm() {
        if (document.getElementById('rsvp-wrap')) {
            document.getElementById('rsvp-wrap').scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToSlideShow() {
        if (document.getElementById('slide-container-ref')) {
            document.getElementById('slide-container-ref').scrollIntoView({ behavior: 'smooth' });
        }
    }

    render() {
        const { additionalClassName, navStyle, displayHomeLink } = this.props;
        return (
            <header>
                <nav className={'gla_light_nav gla_transp_nav ' + (additionalClassName || '')} style={navStyle}>
                    <div className='container'>
                        <div className='gla_logo_container clearfix'>
                        </div>
                        {/* <div className='nav-tagline'>
                            <span>Grace-Line & Jacques-Arnaud</span>
                            <br/>
                            <span>Date et heure</span>
                        </div> */}
                        <div className='gla_default_menu'>
                            <ul>
                                {displayHomeLink &&
                                    <li>
                                        <a href='/'>
                                            SITE
                                        </a>
                                    </li>
                                }
                                {!displayHomeLink && (
                                    <React.Fragment>
                                        <li>
                                            <a
                                                onClick={this.scrollToForm}
                                                style={{ cursor: 'pointer' }}
                                                >
                                                RSVP
                                            </a>
                                        </li>
                                        {/* <li>
                                            <a
                                                onClick={this.scrollToSlideShow}
                                                style={{ cursor: 'pointer' }}
                                                >
                                                GALLERIE
                                        </a>
                                        </li> */}
                                    </React.Fragment>
                                )}
                                <li>
                                    <a href='/blog'>
                                        BLOG
                                    </a>
                                </li>
                                {/* <li>
                                    <a href='/temoignages'>
                                        TEMOIGNAGES
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

}