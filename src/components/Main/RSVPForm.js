import React from 'react';
import {FirebaseContext} from '../Context';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container} from '../Sections';

export default class RSVPForm extends React.Component {
    constructor() {
        super();

        this.renderErrorMsg = this.renderErrorMsg.bind(this);
    }

    renderErrorMsg(errorsList, touched) {
        let total = Object.keys(errorsList).length;
        if(total > 0) {
            return <div className='form-error'>{total} champs vides ou invalides dans le formulaire. Notez que tous les champs sont obligatoires</div>
        }
    }

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
                        initialValues = {{firstName: '', lastName: '', email: '', number: '', code: '', uid: ''}}
                        validationSchema = {validation}
                        onSubmit={values => submitRSVP(values)}
                    >
                        {({errors, touched, submitForm}) => (
                            <React.Fragment>
                                <div className='field-wrap'>
                                    <label>Prénom</label>
                                    <Field name='firstName' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Nom de famille</label>
                                    <Field name='lastName' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Email</label>
                                    <Field name='email' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Cellulaire</label>
                                    <Field name='number' />
                                </div>
                                <div className='field-wrap'>
                                    <label>Code secret</label>
                                    <Field name='code' />
                                </div>
                                {this.renderErrorMsg(errors, touched)}
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