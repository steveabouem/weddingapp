import React from 'react';

export default class TopNav extends React.Component {
    render() {
        return (
            <header>
                <nav className='gla_light_nav gla_transp_nav'>
                    <div className='container'>
                        <div className='gla_logo_container clearfix'>
                            <img src='https://images.unsplash.com/photo-1516693848813-4bb04535863f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' alt='site-logo' />
                        </div>
                        <div className='gla_default_menu'>
                            <ul>
                                <li>
                                    <a href='/'>
                                        INFOS
                                    </a>
                                </li>
                                <li>
                                    <a href='/administrateur'>
                                        INVITÉS
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