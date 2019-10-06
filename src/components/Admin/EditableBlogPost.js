import React from 'react';
import { FirebaseContext } from '../Context';

export class EditableBlogPost extends React.Component {
    constructor() {
        super();

        this.state = {
            isConfirmModalOpen: false
        };

        this.confirmDeletion = this.confirmDeletion.bind(this);
    }

    confirmDeletion() {
        this.setState({isConfirmModalOpen: true});
    }


    render() {
        const {post} = this.props;
        const {isConfirmModalOpen} = this.state;
        return post ? (
            <div className='post-summary'>
                {isConfirmModalOpen && (
                    <div  className="blogpost-modal inner">
                        <ul>
                            <li><h2>Effacer cet article?</h2></li>
                            <li className='modal-buttons'>
                                <span onClick={() => this.setState({isConfirmModalOpen: false})}>NON</span>
                                <span onClick={() => this.props.deleteBlogPost(post.id)}>OUI</span>
                            </li>
                        </ul>
                    </div>
                )}
                <span className='post-summary-buttons'>
                    <a className='material-icons' onClick={this.confirmDeletion}>clear</a>
                    <a className='material-icons' onClick={this.confirmDeletion}>create</a>
                </span>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <span>{post.created} {post.likes ? (post.likes.length + "J'aime") : ''}</span>
            </div>
        ) : (
            <div/>
        );
    }
}

EditableBlogPost.contextType = FirebaseContext;