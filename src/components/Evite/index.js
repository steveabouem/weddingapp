import React from 'react';
import {Container} from '../Sections';
import { Formik, Field } from 'formik';
import { FirebaseContext } from '../Context';

export default class Evite extends React.Component {
    constructor() {
        super();

        this.state = {
            isGuestVerified: false,
            isSubmissionFailed: false,
            isSubmitting: false,
            userInfo: null
        };

        this.verifyUser = this.verifyUser.bind(this);
    }

    verifyUser(values) {
        this.setState({isSubmitting: true});
        this.context.verifyGuest(values)
        .then(({data}) => {
            if(data.userInfo) {
                this.setState({isGuestVerified: true, isSubmitting: false, userInfo: data.userInfo});
            } else {
                this.setState({isSubmitting: false, isSubmissionFailed: true});
            }
        })
        .catch( error => {
            this.setState({isSubmitting: false, isSubmissionFailed: true});
        });
    }

    render() {
        const {isGuestVerified, isSubmissionFailed, isSubmitting, userInfo} = this.state;
        return (
            <div className='gla_page' id='confirmed-evite'>
                <Container additionalClass='evite-inner'>
                    { isGuestVerified ? (
                        <div className='verified-redirect'>
                             {/* <div background="black" height="400px" width="auto">
                                    <video width="320" height="240" controls>
                                        Invitation video
                                        <source src="https://storage.cloud.google.com/video-invite/invitation-video.mp4" type="video/mp4"/>
                                    </video>
                                </div> */}
                            <span>
                                {userInfo && userInfo.firstName ? 'Merci ' + userInfo.firstName : ''}
                                {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                                {userInfo && userInfo.referer ? userInfo.referer : ''}
                            </span>
                            <a href="https://storage.googleapis.com/video-invite/invitation-video.mp4">VOIR LE FAIRE PART</a>
                        </div>
                    ) : isSubmissionFailed ? (
                        <div style={{width: '80%', margin:'auto', borderBottom: '2px solid'}}>
                            <h4>Erreur</h4>
                            <p>
                                Malheureusement le code fourni est Invalide:(
                                Assurez-vous d'avoir inséré le code exactement tel quel
                                (copier-coller recommandé).<br/>
                            </p>
                        </div>
                    ) : isSubmitting ? (
                        <div className='material-icons loading'>redeem</div>
                    ) : (
                        <div className='invite-code'>
                            <span>Bienvenue! veuillez entrer le code exact fourni par email</span>
                            <Formik
                                onSubmit={values => this.verifyUser(values)}
                                initialValues={{passCode: null}}
                            >
                                {({submitForm}) => (
                                    <React.Fragment>
                                        <Field name='passCode' placeholder='Code fourni par email...' />
                                        <div className='submit-button' onClick={submitForm}>SOUMETTRE</div>
                                    </React.Fragment>
                                )}
                            </Formik>
                        </div>
                    )}
                </Container>
            </div>
        );
    }   
}

Evite.contextType = FirebaseContext;