import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-12">
                            <h2 className="alert alert-danger">404 Pages Not Found :(</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
