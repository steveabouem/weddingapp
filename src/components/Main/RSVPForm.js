import React from 'react';
import {FirebaseContext} from '../Context';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container} from '../Sections';

export default class RSVPForm extends React.Component {
    render() {
        const {submitRSVP} = this.context;
        const validation = Yup.object().shape({
            firstName: Yup.string()
                .min(2, 'Le prénom devrait avoir au moins deux(2) lettres:(')
                .required('Prière dìndiquer votre prénom siouplait!'),
            lastName: Yup.string()
                .min(2, 'Le nom de famille devrait avoir au moins deux(2) lettres:(')
                .required('Prière dìndiquer votre nom de famille siouplait!'),
            number: Yup.string()
                // .matches() CONFIRM IF LOCAL ONLY OR ALSO FOREIGN, also check if local celphones have a specific regex
                .required('Prière d\'insérer un numéro valide()'),
            email: Yup.string()
                .email('Prière d\'insérer une addresse email valide')
                .required('Une addresse email est nécessaire pour vous inscrire!'),
            code: Yup.string()
                .required('Vous devez obligatoirement fournir le code d\'invitation!')
        });
        
        return (
            <Container id='rsvp-wrap'>
                 <div className='gif-container' style={{top: '0', height: '150px'}}>
                    <div className='animated-div rsvp-form' />
                </div>
                <div className='form-wrap rsvp'>
                    <Formik 
                        initialValues = {{firstName: '', lastName: '', email: '', number: '', code: ''}}
                        validationSchema = {validation}
                        onSubmit={values => submitRSVP(values)}
                    >
                        {({errors, touched, submitForm}) => (
                            <React.Fragment>
                                <div className='field-wrap'>
                                    <label>Prénom</label>
                                    {errors.firstName && touched.firstName && <div className='form-error'>{errors.firstName}</div>}
                                    <Field name='firstName' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Nom de famille</label>
                                    {errors.lastName && touched.lastName && <div className='form-error'>{errors.lastName}</div>}
                                    <Field name='lastName' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Email</label>
                                    {errors.email && touched.email && <div className='form-error'>{errors.email}</div>}
                                    <Field name='email' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Cellulaire</label>
                                    {errors.number && touched.number && <div className='form-error'>{errors.number}</div>}
                                    <Field name='number' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Code secret</label>
                                    {errors.code && touched.code && <div className='form-error'>{errors.code}</div>}
                                    <Field name='code' />
                                </div>
                                <div className='submit-button' onClick={submitForm}>SOUMETTRE</div>
                            </React.Fragment>
                        )}
                    </Formik>
                </div>
            </Container>
        );
    }
}

RSVPForm.contextType = FirebaseContext;