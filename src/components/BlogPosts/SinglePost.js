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
            sortedComments: null
        }

        this.toggleLike = this.toggleLike.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.sortComments = this.sortComments.bind(this);
    }

    toggleLike() {
        const update = {target:'likes', content: moment()};
        if(!this.state.hasBeenLiked) {
            this.context.editBlogPost(this.props.postId, update, this.setState({hasBeenLiked: true}));
        }
    }

    toggleForm() {
        this.setState({displayCommentForm: !this.state.displayCommentForm});
    }

    submitComment(content) {
        content.created = moment().format('L, LT');
        this.setState({isSubmitting: true});
        this.context.createPostComment(this.props.postId, content, this.setState({isSubmitting: false}));
    }

    sortComments() {
        if(this.context.postComments && this.props.postId) {
            let sorted = this.context.postComments.filter(comment => comment.postId === this.props.postId);
            this.setState({sortedComments: sorted});
        }
    }
    
    componentDidMount() {
        this.sortComments();
    }

    componentDidUpdate(prevpProps, prevState) {
        // if(prevState.sortedComments && this.state.sortedComments && prevState.sortedComments !== this.state.sortedComments) {
        //     this.sortComments();
        // }
    }

    render() {
        const {post , postId} = this.props;
        const {hasBeenLiked, displayCommentForm, isSubmitting, sortedComments} = this.state;
        return (
            <div className='post-container' key={'blogpost-' + postId}>
                <div className='post-container-left'>
                    <div className='post-title'>
                        <h5>{post.title || ''}</h5>
                    </div>
                    <p>{post.content}</p>
                    <div className='post-bottom'>
                        <div className='post-bottom-left'>
                            <a 
                                className='material-icons' data-tip={'comment-tip-' + postId}
                                data-for={'comment-tip-' + postId} onClick={this.toggleForm}
                            >
                                comment
                            </a>
                            <ReactTooltip id={'comment-tip-' + postId} effect='float'>Commenter</ReactTooltip>
                        </div>
                        <div className='post-bottom-right'>
                            <a 
                                onClick={this.toggleLike} className='material-icons'
                                data-tip={'like-tip-' + postId} data-for={'like-tip-' + postId}
                                style={{color: hasBeenLiked ? '#ffb487' : 'initial'}}
                            >
                                {hasBeenLiked ? 'favorite' : 'favorite_border'}
                            </a>
                            <ReactTooltip id={'like-tip-' + postId} effect='float'>{hasBeenLiked ? "J'ai like :)" : 'Je like :)'}</ReactTooltip>
                        </div>
                        
                    </div>
                    {displayCommentForm && (
                        <React.Fragment>
                            {isSubmitting ? (
                                <div className='material-icons loading'>comment</div>
                            ) : (
                                <Formik
                                    onSubmit={values => this.submitComment(values)}
                                    initialValues={{content: ''}}
                                    >
                                    {({submitForm}) => (
                                        <React.Fragment>
                                            <Field name='content' className={'post-comment-field ' + isSubmitting ? 'disabled': ''}/>
                                            <div className='submit-button' onClick={submitForm}>Envoyer</div>
                                        </React.Fragment>
                                    )}
                                </Formik>
                            )}
                        </React.Fragment>
                    )}
                </div>
                <div className='post-container-right'>
                    <span>
                        <h5><div className='material-icons'>event_available</div> Date de publication</h5>
                    </span>
                    <ul className='comment-container'>
                        {post.created ||  ''}
                    </ul>
                    <span>
                        <h5><div className='material-icons'>event_available</div>Commentaires</h5>
                    </span>
                    <ul className='comment-container'>
                        {sortedComments ? (
                            <React.Fragment>
                                {sortedComments.map((comment, i) => (
                                    <React.Fragment key={'comment-list-' + i}>
                                        <li>{comment.content || ''}</li>
                                        <li>{comment.created ? 'Rédigé le ' + comment.created : ''}</li>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ) : (
                            'Aucun commentaire pour cet article'
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

SinglePost.contextType = FirebaseContext;
