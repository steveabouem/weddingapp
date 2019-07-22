import React from 'react';

export default class TopNav extends React.Component {
    render() {
        return (
            <header>
                <nav className='gla_light_nav gla_transp_nav'>
                    <div className='container'>
                        <div className='gla_logo_container clearfix'>
                        </div>
                        <div className='gla_default_menu'>
                            <ul>
                                {this.props.displayHomeLink &&
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