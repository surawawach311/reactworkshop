import React, { Component } from 'react'
import axios from 'axios'
export default class Shop extends Component {
    state = {
        shop: {},
        menus: [],
        location: {
            lat: 0,
            lgn: 0
        }
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const response = await axios.get('https://surawach-mern-backend.herokuapp.com/api/shop/' + id)
        this.setState({
            shop: response.data.data,
            menus: response.data.data.menus,
            location: response.data.data.location
        });
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-12">
                            <h2>{this.state.shop.name}</h2>
                            <ul className="list-unstyled">
                                {this.state.menus.map((menu) => {
                                    return (
                                        <div className="col-md-12 card">
                                            <li className="media-body" key={menu._id}>
                                                <h5 className="mt-0 mb-1">{menu.name}</h5>
                                                <p>ราคา: {menu.price.$numberDecimal} บาท</p>
                                                <div>
                                                    <button className="btn btn-success">Buy</button>
                                                </div>
                                            </li>
                                        </div>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
