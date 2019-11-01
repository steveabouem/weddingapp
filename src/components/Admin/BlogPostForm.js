import React from 'react';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container} from '../Sections';
import {FirebaseContext} from '../Context';
import moment from 'moment';
import {EditableBlogPost} from './EditableBlogPost';
import ReactTooltip from 'react-tooltip';

export class BlogPostForm extends React.Component {
    constructor() {
        super();

        this.state = {
            postsList: null,
            isLoading: true, 
            isModalOpen: false,
            content: null,
            isSubmitting: false
        };

        this.confirmPost = this.confirmPost.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteBlogPost = this.deleteBlogPost.bind(this);
    }

    confirmPost(content) {
        this.setState({isModalOpen: true, content: {...content, created: moment().format('DD MMM YYYY (HH:mm:ss)')}});
    }

    sendPost() {
        this.setState({isSubmitting: true, isModalOpen: true});
        this.context.createBlogPost(this.state.content, this.setState({isSubmitting: false, isModalOpen: false}));
    }

    deleteBlogPost(id) {
        this.setState({isSubmitting: true});
        this.context.deleteBlogPost(id, this.setState({isSubmitting: false}));
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    toggleForm() {
        this.setState({isFormOpen: !this.state.isFormOpen});
    }
    
    componentDidMount() {
        this.context.loadBlogPosts(this.setState({isLoading: false}));
    }

    render() {
        const {isLoading, isModalOpen, isSubmitting, isFormOpen} = this.state,
        {toggleSidebar} = this.props,
        {blogPosts} = this.context,
        validation = Yup.object().shape({
            title: Yup.string()
                .min(2, 'Le titre doit avoir au moins 2 lettres'),
            content: Yup.string()
                .min(15, 'Besoin de plus ce contenu!')
                .required('ne peut être vide!'),
        });

        return isLoading ? (
            <div className='material-icons loading'>subject</div>
        ) : isSubmitting ? ( 
            <div className='material-icons loading'>schedule</div>
        ) : (
            <Formik
                initialValues={{title: '', content: ''}}
                validationSchema={validation}
                onSubmit={isSubmitting ? null : values => this.confirmPost(values)}
            >
                {({errors, touched, submitForm, values}) => (
                    <React.Fragment>
                        {isModalOpen && (
                            <div  className="blogpost-modal">
                                {!isSubmitting ? (
                                    <ul>
                                        <li><h2>Créer un nouvel article?</h2></li>
                                        <li>
                                            {values.title ? <span>Titre: {values.title}</span> : ''}
                                        </li>
                                        <li className='modal-buttons'>
                                            <span onClick={this.toggleModal}>ANNULER</span>
                                            <span onClick={this.sendPost}>ENVOYER</span>
                                        </li>
                                    </ul>
                                ) : (
                                    <div className='material-icons loading'>library_books</div>
                                )}
                            </div>
                        )}
                        <Container additionalClass='text-center' id='guest-list-wrap'>
                            <span 
                                className='material-icons add-guest-button default'
                                onClick={this.toggleForm}
                                style={{top: '5%'}}
                                data-for='switch-table'
                                data-tip='switch-table'
                                data-place='left'

                            >
                                autorenew
                            </span>
                            <span 
                                className='material-icons add-guest-button default'
                                onClick={toggleSidebar}
                                style={{top: '10%'}}
                                data-for='toggle-sidebar'
                                data-tip='toggle-sidebar'
                                data-place='left'

                            >
                                settings
                            </span>
                            <ReactTooltip id='toggle-sidebar'>Menu</ReactTooltip>
                            <ReactTooltip id='switch-table'>{isFormOpen ? 'Voir articles du blog' : 'Rédiger un article'}</ReactTooltip>
                            <div className="list">
                                <div className='list-inner'>
                                    <h1 style={{margin: '0'}}>{!isFormOpen ? 'ARTICLES POSTÉS' : 'CRÉÉR UN ARTICLE'}</h1>
                                    {isFormOpen ? (
                                        <React.Fragment>
                                            <div className='field-wrap'>
                                                <label for="post title">Titre</label>
                                                <Field 
                                                    name="title" 
                                                    render={({form}) => (
                                                        <React.Fragment>
                                                            {errors.title && touched.title &&
                                                                <div className='form-error'>{errors.title}</div>
                                                            }
                                                            <input onChange={e => form.setFieldValue('title', e.target.value)} />
                                                        </React.Fragment>
                                                    )}
                                                />
                                            </div>
                                            <div className='field-wrap'>
                                                <Field 
                                                    name="content" 
                                                    render={({form}) => (
                                                        <React.Fragment>
                                                            {errors.content && touched.content &&
                                                                <div className='form-error'>{errors.content}</div>
                                                            }
                                                            <textarea onChange={e => form.setFieldValue('content', e.target.value)} />
                                                        </React.Fragment>
                                                    )}
                                                />
                                            </div>
                                            <div className='submit-button' onClick={submitForm}>CRÉER</div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {blogPosts && blogPosts.length > 0 ?  blogPosts.map(post => (
                                                <EditableBlogPost post={post} deleteBlogPost={this.deleteBlogPost}/>
                                            )) :(
                                                <div>Aucun article pour l'instant</div>
                                            )}
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </Container>
                    </React.Fragment>
                )}
            </Formik>
        );
    }
}

BlogPostForm.contextType = FirebaseContext;