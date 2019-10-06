import React from 'react';

export class TopNav extends React.Component {
    render() {
        const {additionalClassName, navStyle, displayHomeLink} = this.props;
        return (
            <header>
                <nav className={'gla_light_nav gla_transp_nav ' + (additionalClassName || '') } style={navStyle}>
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