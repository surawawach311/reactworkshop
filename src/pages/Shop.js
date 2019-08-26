import React, { Component } from 'react'
import axios from 'axios'
import { addToCart } from '../redux/actions/cartAction';
import { connect } from 'react-redux';

class Shop extends Component {
    state = {
        shop: {},
        menus: [],
        location: {
            lat: 0,
            lgn: 0
        }
    }

    addToCart = (menu) => {
        const item = {
            id: menu._id,
            name: menu.name,
            price: menu.price.$numberDecimal,
            qty: 1

        }
        this.props.dispatch(addToCart(item, this.props.cart));
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
                                        <div className="col-md-12 card" key={menu._id}>
                                            <li className="media-body" >
                                                <h5 className="mt-0 mb-1">{menu.name}</h5>
                                                <p>ราคา: {menu.price.$numberDecimal} บาท</p>
                                                <div>
                                                    <button className="btn btn-success" onClick={() => { this.addToCart(menu) }}>Buy</button>
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
const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}
export default connect(mapStateToProps)(Shop);