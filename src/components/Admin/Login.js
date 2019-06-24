import React from 'react';
import {Container} from '../Sections'
import {Field, Formik} from 'formik';
import * as Yup from 'yup';

export default class Login extends React.Component {
    constructor() {
        super();

        this.state = {

        };

        this.submit = this.submit.bind(this);
        this.back = this.back.bind(this);
    }

    submit(values) {
        this.props.history.push('/invites');
    }

    back() {
        this.props.history.push('/')
    }

    render() {
        const validation = Yup.object().shape({
            code: Yup.string()
                .matches(/^\d*$/, 'Code invalide, chiffres seulement!')
                .required('Le code secret est nécessaire pour visualiser la page!')
        });

        return(
            <div className='gla_page'>
                <Container id='login-wrap'>
                    <div className='form-wrap login'>
                        <Formik 
                            validationSchema = {validation}
                            onSubmit={values => this.submit(values)}
                        >
                            {({errors, touched, submitForm}) => (
                                <React.Fragment>
                                    <div className='field-wrap'>
                                        <label>Code secret</label>
                                        {errors.code && touched.code && <div className='form-error'>{errors.code}</div>}
                                        <Field name='code' />
                                    </div>
                                    <div className='submit-button' onClick={submitForm}>SOUMETTRE</div>
                                    <div className='submit-button' onClick={this.back}>RETOUR</div>
                                </React.Fragment>
                            )}
                        </Formik>
                    </div>
                </Container>
            </div>
        );
    }
}