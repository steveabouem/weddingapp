import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Main from '../Main';
import {AdminWorkSpace} from '../Admin';
import Login from '../Admin/Login';
import {BlogPosts} from '../BlogPosts';
import {AdminContext, FirebaseContext} from '../Context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import audio1 from '../../assets/audio/mad_over_you.mp3'
import audio2 from '../../assets/audio/why_i_love_you.mp3'
import Evite from '../Evite';

export default class WorkSpace extends React.Component {
    constructor() {
        super();
        //init taost
        toast.configure()

        // remember music modal selection
        this.toggleMusicModal = bool => {
            this.setState({isMusicModalOpen: bool});
        }

        // api calls
        this.loginAdmin = (entry, props) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/loginAdmin', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data:{entry}}
            )
            .then( ({data}) => {
                if(data.code !== 400) {
                    props.history.push('/invites');
                } else {
                    toast.error('Mot de passe invalide', {position: 'bottom-right'});
                }
            })
            .catch( () => {
                toast.error('Erreur inconue, contactez l\'administrateur.', {position: 'bottom-right'});
            });
        };
        
        this.loadGuestList = () => {
            axios.get('https://us-central1-our-wedding-55849.cloudfunctions.net/loadGuestList', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }
            )
            .then( res => {
                this.setState({
                    guestList: res.data.response,
                    guestsLoaded: true
                });
            })
            .catch( error => {
                console.log(error);
            });
        };

        this.createBlogPost = (entry, callBack) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/createBlogPost', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data:{entry}}
            )
            .then( ({data}) => {
                this.setState({blogPosts: data.blogPosts});
                toast.success('Article créé avec succès!', {position: 'bottom-right'});
                if(callBack) {
                    callBack();
                }
            }).catch( () => {
                toast.warn('Erreur lors de la transaction, veuillez essayer de nouveau', {position: 'bottom-right'});
            })
        };

        this.loadBlogPosts = callBack => {
            axios.get('https://us-central1-our-wedding-55849.cloudfunctions.net/loadBlogPosts', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }
            ).then( r => {
                this.setState({
                    blogPosts: r.data.blogPosts
                });
                if(callBack) {
                    callBack();
                }
            }).catch( () => {
                toast.warn('Erreur de chargement, veuillez essayer de nouveau', {position: 'bottom-right'});
            });
        };

        this.deleteBlogPost = (id, callBack) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/deleteBlogPost', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data:{id}}
            ).then( ({data}) => {
                this.setState({blogPosts: data.blogPosts});
                if(callBack) {
                    callBack();
                }
            }).catch( () => {
                toast.warn('Erreur lors de la transaction, veuillez essayer de nouveau', {position: 'bottom-right'});
            });
        };

        this.createPostComment = (postId, comment, callBack) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/createPostComment', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data:{comment, postId}}
            ).then(()=> {
                toast.info('Commentaire envoyé!', {position:'bottom-right'});
                if(callBack) {
                    callBack();
                }
            }).catch( () => {
                toast.warn('Erreur lors de la transaction, veuillez essayer de nouveau', {position: 'bottom-right'});
            });
        };

        this.loadPostComments = (callback) => {
            axios.get('https://us-central1-our-wedding-55849.cloudfunctions.net/loadPostComments', 
                {headers: 
                {Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                    'content-type': 'application/json' }
                }
            )
            .then(({data}) => {
                console.log(data);
                
                this.setState({postComments: data.commentsList});
                toast.info('Commentaires prets', {position: 'bottom-right'});
                if(callback) {
                    callback();
                }
            }).catch((e) => {
                console.log(e);
                
                toast.warn('Erreur lors de la transaction, veuillez essayer de nouveau', {position: 'bottom-right'});
            });
        };

        this.editBlogPost = (id, update, callBack) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/editPost', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                    'content-type': 'application/json' }
                },
                {data: {id, update}}
            )
            .then(() => {
                if(callBack) {
                    callBack();
                }
            }).catch( () => {
                toast.warn('Erreur lors de la transaction, veuillez essayer de nouveau', {position: 'bottom-right'});
            });
        };

        this.submitRSVP = (userInfo, referer, callBack) => {
            userInfo.registered_on = moment();
            userInfo.referer = referer;
            
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/submitRSVP', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {userInfo}}
            )
            .then( ({data}) => {
                if(data.code === 400) {
                    toast.error(data.error, {
                        position: 'bottom-right'
                    });
                } else {
                    if(callBack) {
                        callBack();
                    }
                    toast.info('Votre soumission a été envoyée!', {
                        position: 'bottom-right'
                    });
                }
            })
            .catch( () => {
                toast.error('Une erreur s\'est produite lors de la soumission. SVP contactez l\'administrateur!', {
                    position: 'bottom-right'
                });
            });
        };

        this.editGuest = (uid, updates) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/editGuest', 
            {headers: 
            { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
            'content-type': 'application/json' }
            }, 
            {data: {uid, updates}}
        )
            .then( response => {
                toast.success('Information mise à jour!', {
                    position: 'bottom-right'
                });
            })
            .catch( error => {
                toast.error('Une erreur sèest produite lors de la soumission. SVP contactez l\'administrateur!', {
                    position: 'bottom-right'
                });
            })
        };

        this.confirmGuest = (uid) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/confirmGuest', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {uid}}
            )
                .then( response => {
                    console.log(response);
                })
                .catch( error => {
                    console.log(error);
                });
        };

        this.removeGuest = (uid, callBack) => {
            axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/removeGuest', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {uid}}
            )
                .then( ({data}) => {
                    toast.info('Invitation annulée', {position: 'bottom-right'});
                    callBack();
                    this.setState({guestList: data.list})
                })
                .catch( e => {
                    console.log({e});
                    
                    toast.error('Une erreur est survenue, aviser Steve', {position: 'bottom-right'});
                });
        };

        this.verifyGuest = values => {
            return (
                axios.post('https://us-central1-our-wedding-55849.cloudfunctions.net/verifyGuest', 
                {headers: 
                { Authorization: `Bearer AIzaSyC7YvDDpudkrY7gvbxgLYUqu4nIwSSiijo`,
                'content-type': 'application/json' }
                }, 
                {data: {verify: values}})
            );
        };

        this.state = {
            hasAdminPrivileges: false,
            rsvpValues: null,
            guestList: null,
            guestsLoaded: false,
            isMusicModalOpen: true,
            commentsList: null,
            playlist: [
                {
                    artistName: 'Runtown',
                    title: 'Mad over you',
                    mp3: audio1
                },
                {
                    artistName: 'Major',
                    title: 'Why I love you',
                    mp3: audio2
                }
            ],
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.guestList && this.state.guestList && prevState.guestList.length !== this.state.guestList.length) {
            this.loadGuestList();
        }
        if(prevState.blogPosts && this.state.blogPosts && prevState.blogPosts.length !== this.state.blogPosts.length) {
            this.loadBlogPosts();
        } 
        if(prevState.postComments && this.state.postComments && prevState.postComments !== this.state.postComments) {
            this.loadPostComments(null);
        }
    }

    render() {
        return (
            <FirebaseContext.Provider value={{
                // properties
               ...this.state,
                // mutators
                toggleMusicModal: this.toggleMusicModal,
                addNewGuest: this.addNewGuest,
                editGuest: this.editGuest,
                removeGuest: this.removeGuest,
                submitRSVP: this.submitRSVP,
                loginAdmin: this.loginAdmin,
                loadGuestList: this.loadGuestList,
                createBlogPost: this.createBlogPost,
                loadBlogPosts: this.loadBlogPosts,
                editBlogPost: this.editBlogPost,
                loadPostComments: this.loadPostComments,
                deleteBlogPost: this.deleteBlogPost,
                createPostComment: this.createPostComment,
                verifyGuest: this.verifyGuest
            }}>
                <Router>
                    <Switch>
                        <Route exact path = '/' component={Main}/>
                        <Route path = '/administrateur' component={Login}/>
                        <Route path = '/invites' component={AdminWorkSpace}/>
                        <Route path = '/blog' component={BlogPosts}/>
                        <Route path = '/invitation' component={Evite}/>
                        {/* <Route path = '/livre-dor' component={Testimonials}/> */}
                    </Switch>
                </Router>
            </FirebaseContext.Provider>
        );
    }
}

WorkSpace.contextType = AdminContext;