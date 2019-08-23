import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { async } from 'q';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    password: Yup.string().min(3, 'Must be 3 charecter').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});
export default class Register extends Component {

    register = async (values) => {
        try {
            const apiUrl = 'https://surawach-mern-backend.herokuapp.com/api/user/register'
            const response = await axios.post(apiUrl, values);

            alert(response.data.message);
            this.props.history.replace({ pathname: '/' });
        } catch (error) {
            alert(error.response.data.error.message);
        }
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-16 mx-auto">
                            <h2 className="display-5">Register</h2>
                            <Formik
                                initialValues={{ name: '', email: '', password: '' }}
                                // validate={values => {
                                //     let errors = {};
                                //     if (!values.email) {
                                //         errors.email = 'Required';
                                //     } else if (
                                //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                //     ) {
                                //         errors.email = 'Invalid email address';
                                //     }
                                //     return errors;
                                // }}
                                validationSchema={RegisterSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    this.register(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting, touched, errors }) => (
                                    <Form className="form-group" noValidate>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <Field className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} type="text" name="name" />
                                            <ErrorMessage className="invalid-feedback" name="name" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <Field className={`form-control ${touched.name && errors.email ? 'is-invalid' : ''}`} type="email" name="email" />
                                            <ErrorMessage className="invalid-feedback" name="email" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <Field className={`form-control ${touched.name && errors.password ? 'is-invalid' : ''}`} type="password" name="password" />
                                            <ErrorMessage className="invalid-feedback" name="password" component="div" />
                                        </div>
                                        <button className="form-control btn-primary" type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
