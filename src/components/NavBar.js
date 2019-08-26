//rafc stateless
import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { connect } from 'react-redux';
// const iconMenu = <FontAwesomeIcon icon={clipboard-list} />
const element = <FontAwesomeIcon icon={faCoffee} />

class NavBar extends Component {
    render() {
        return (

            <Navbar bg="success" variant='dark' expand="lg">
                <Navbar.Brand href="#home"> สั่งทุกอย่าง Online {element}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" exact={true} activeClassName="active" to="/">
                            Home

                </NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/about">
                            About
                </NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/cart">
                            Cart <span className="badge badge-light">{this.props.total}</span>
                        </NavLink>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavLink className="nav-link" activeClassName="active" to="/register">
                            Register
                </NavLink>

                    </Nav>
                    <Login />
                </Navbar.Collapse>
            </Navbar>
        )
    }


}
const mapStateToProps = (state) => {
    return {
        total: state.cartReducer.total
    }
}
export default connect(mapStateToProps)(NavBar)
