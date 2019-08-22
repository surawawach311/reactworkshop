//rcc
import React, { Component } from 'react'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const menus = <FontAwesomeIcon icon={faList} />

export default class Home extends Component {
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    state = {
        shops: [],
        loading: true
    }
    async getData() {
        try {
            const response = await axios.get('https://surawach-mern-backend.herokuapp.com/api/shop', {
                cancelToken: this.source.token
            });
            this.setState({
                shops: response.data.data,
                loading: false
            });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('home cancelled');
            } else {
                console.log(error);
            }
        }
    }
    componentDidMount() {
        this.getData();
    }
    componentWillUnmount() {
        this.source.cancel();
    }
    render() {
        return (
            <>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Hello, world!</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            {
                                this.state.loading === true && (
                                    <>
                                        <Spinner animation="grow" variant="primary" />
                                        <Spinner animation="grow" variant="secondary" />
                                        <Spinner animation="grow" variant="success" />
                                        <Spinner animation="grow" variant="danger" />
                                        <Spinner animation="grow" variant="warning" />
                                        <Spinner animation="grow" variant="info" />
                                        <Spinner animation="grow" variant="light" />
                                        <Spinner animation="grow" variant="dark" />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {/* Example row of columns */}
                    <div className="row">

                        {
                            this.state.shops.map((shop) => {
                                return (
                                    <div className="col-md-4" key={shop.id}>
                                        <div className="card mb-3">
                                            <img src={shop.photo} className="card-img-top"
                                                height="225" alt={shop.name} />
                                            <div className="card-body">
                                                <h3 className="card-title">
                                                    {shop.name}
                                                    <Link className="btn btn-info"
                                                        to={
                                                            { pathname: '/shop/' + shop.id }
                                                        }>Menu {menus}
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <hr />
                </div>
            </>
        )
    }
}
