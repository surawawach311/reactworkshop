import React, { Component } from 'react'

import { Formik, Form, Field } from "formik";
import axios from 'axios';

export default class Login extends Component {

    state = {
        profile: null,
        isLogin: false
    }

    login = async (values) => {
        try {
            const apiUrl = 'https://surawach-mern-backend.herokuapp.com/api/user/login'
            const response = await axios.post(apiUrl, values);

            localStorage.setItem('token', JSON.stringify(response.data));
            //get profile
            const apiUrlGetMe = 'https://surawach-mern-backend.herokuapp.com/api/user/me'
            const responseMe = await axios.get(apiUrlGetMe, {
                headers: {
                    Authorization: 'Bearer ' + response.data.access_token
                }
            })
            localStorage.setItem('profile', JSON.stringify(responseMe.data));

            this.setState({
                profile: responseMe.data,
                isLogin: true
            })

        } catch (error) {
            console.log(error);
            this.setState({
                isLogin: false
            });
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.setState({ isLogin: false });
        // this.props.history.replace({ pathname: '/' });
    }

    componentDidMount() {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            this.setState({
                profile:profile,
                isLogin:true
            })
        }
    }

    render() {
        return (
            <>
                {
                    this.state.isLogin ? (
                        <span className="navbar-text text-white mr-sm-2">
                           <div> Welcome {this.state.profile.user.name} </div>
                            <button className="btn btn-danger my-2 my-sm-0" onClick={this.logout}>Log out</button>
                           
                        </span>
                    ) : (
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
                        )
                }
            </>
        )
    }
}