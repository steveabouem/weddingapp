import React from 'react';
import { FirebaseContext } from '../Context';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { Formik, Field } from 'formik';

export class SinglePost extends React.Component {
    constructor() {
        super();

        this.state = {
            hasBeenLiked: false,
            displayCommentForm: false,
        }

        this.toggleLike = this.toggleLike.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    toggleLike() {
        const update = {target:'likes', content: moment()};
        if(!this.state.hasBeenLiked) {
            this.context.editBlogPost(this.props.i, update, this.setState({hasBeenLiked: true}));
        }
    }

    toggleForm() {
        this.setState({displayCommentForm: !this.state.displayCommentForm});
    }

    submitComment(content) {
        this.setState({isSubmitting: true});
        this.context.createPostComment(this.props.i, content, this.setState({isSubmitting: false}));
    }

    componentDidMount() {
        this.context.loadPostComments(this.props.i);
    }

    render() {
        const {post , i} = this.props;
        const {hasBeenLiked, displayCommentForm, isSubmitting} = this.state;
        return (
            <div className='post-container' key={'blogpost-' + i}>
                <div className='post-container-left'>
                    <div className='post-title'>
                        <h5>{post.title || ''}</h5>
                    </div>
                    <p>{post.content}</p>
                    <div className='post-bottom'>
                        {/* <div className='post-bottom-left'>
                            <a 
                                className='material-icons' data-tip={'comment-tip-' + i}
                                data-for={'comment-tip-' + i} onClick={this.toggleForm}
                            >
                                comment
                            </a>
                            <ReactTooltip id={'comment-tip-' + i} effect='float'>Commenter</ReactTooltip>
                        </div> */}
                        <div className='post-bottom-right'>
                            <a 
                                onClick={this.toggleLike} className='material-icons'
                                data-tip={'like-tip-' + i} data-for={'like-tip-' + i}
                                style={{color: hasBeenLiked ? '#ffb487' : 'initial'}}
                            >
                                {hasBeenLiked ? 'favorite' : 'favorite_border'}
                            </a>
                            <ReactTooltip id={'like-tip-' + i} effect='float'>{hasBeenLiked ? "J'ai like :)" : 'Je like :)'}</ReactTooltip>
                        </div>
                        
                    </div>
                    {displayCommentForm && (
                        <Formik
                            onSubmit={values => this.postComment(values)}
                            initialValues={{comment: ''}}
                        >
                            {({submitForm}) => (
                                <React.Fragment>
                                    <Field name='comment' className={'post-comment-field ' + isSubmitting ? 'disabled': ''}/>
                                    <div className='submit-button' onClick={submitForm}>Envoyer</div>
                                </React.Fragment>
                            )}
                        </Formik>
                    )}
                </div>
                <div className='post-container-right'>
                    <h5>Date de publication</h5>
                    {post.created ||  ''}
                    <h5>Commentaires</h5>
                    {}
                </div>
            </div>
        );
    }
}

SinglePost.contextType = FirebaseContext;
