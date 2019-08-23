import React, { Component } from 'react'

import { Formik, Form, Field } from "formik";
import axios from 'axios';

export default class Login extends Component {

    state = {

    }

    login = async (values) => {
        try {
            const apiUrl = 'https://surawach-mern-backend.herokuapp.com/api/user/login'
            const response = await axios.post(apiUrl, values);

            alert(response.data.message);
            this.props.history.replace({ pathname: '/' });
        } catch (error) {
            alert(error.response.data.error.message);
        }
    }

    logout = () => {

    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Formik
                    onSubmit={(values, { setSubmitting }) => {
                        this.login(values);
                        setSubmitting(false);

                    }}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                >
                    {

                        ({
                            handleSubmit,
                            handleChange,
                            isSubmitting
                        }) => (
                                <Form className="form-inline">


                                    <div className="form-group">
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            autoComplete="username"
                                            className="form-control mr-sm-2"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            className="form-control mr-sm-2"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-warning my-2 my-sm-0"
                                        disabled={isSubmitting}
                                    >
                                        Log In
                                                </button>


                                </Form>
                            )

                    }
                </Formik>
            </>
        )
    }
}