import React from 'react';

export class TopNav extends React.Component {
    render() {
        const {additionalClassName, navStyle, displayHomeLink} = this.props;
        return (
            <header>
                <nav className={'gla_light_nav gla_transp_nav ' + additionalClassName} style={navStyle}>
                    <div className='container'>
                        <div className='gla_logo_container clearfix'>
                        </div>
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
                                    <a href='/administrateur' className='material-icons'>
                                        settings
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

}