import React from 'react';
import {Container} from '../Sections'
import {Field, Formik} from 'formik';
import {FirebaseContext} from '../Context';
import * as Yup from 'yup';

export default class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            code: null
        };

        this.submit = this.submit.bind(this);
        this.back = this.back.bind(this);
        this.go = this.go.bind(this);
    }

    submit({code}) {
        if(code) {
            this.context.loginAdmin(code, this.props)
        }
    }

    go(e) {
        const {code} = this.state;
        if (e.keyCode === 13 && code) {
            this.submit(code);
        }
    }

    back() {
        this.props.history.push('/')
    }

    componentDidMount() {
        document.addEventListener('keypress', this.go);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.go);
    }

    render() {
        const validation = Yup.object().shape({
            code: Yup.string()
                .required('Le code secret est nécessaire pour visualiser la page!')
        });

        return(
            <div className='gla_page' id='login-page'>
                <Container additionalClass='text-center' id='login-wrap'>
                    <div className='bottom-section-wrap'>
                        <h1> Espace Administrateur</h1>
                        <p>Cette page est réservée aux administreurs du site. Prière de cliquer sur RETOUR si vous n`êtes pas administrateur.</p>
                    </div>
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
                                        <Field name='code' autofocus/>
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

Login.contextType = FirebaseContext;