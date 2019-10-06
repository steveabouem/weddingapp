import React from 'react';
import {FirebaseContext} from '../Context';
import {SinglePost} from './SinglePost';
import {TopNav} from '../Menus/TopNav';

export class BlogPosts extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        this.context.loadBlogPosts(this.setState({isLoading: false}));
    }

    render() {
        const {blogPosts} = this.context;
        return this.state.isLoading ? (
            <div className='material-icons loading'>menu_book</div>
        ) : (
            <div className='gla-page blog-page'>
                <TopNav displayHomeLink/>
                <div className='container' id='blog-page'>
                    <h1>LE BLOG</h1>
                    {blogPosts && blogPosts.length > 0 ? blogPosts.map(post => (
                        <SinglePost post={post} i={post.id} />
                    )) : (
                        <div>Aucun Article pour l'instant</div>
                    )}
                </div>
            </div>
        );
    }
}

BlogPosts.contextType = FirebaseContext;