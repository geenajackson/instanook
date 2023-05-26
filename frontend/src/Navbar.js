import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink as Navlink
} from 'reactstrap';

import UserContext from "./UserContext";

//put multiple NavLinks in an array inside of the conditional

function NavBar() {
    const user = useContext(UserContext);
    return (
        <div>
            <Navbar color="light">
                <NavbarBrand>
                    <NavLink exact to="/">
                        Instanook
                    </NavLink>
                </NavbarBrand>
                <Nav>
                    <NavItem>
                        <Navlink>
                            <NavLink exact to="/listings">
                                Listings
                            </NavLink>
                        </Navlink>
                    </NavItem>

                    {user ?
                        [<NavItem>
                            <Navlink>
                                <NavLink exact to="/items">
                                    Create New Listing
                                </NavLink>
                            </Navlink>
                        </NavItem>,
                        <NavItem>
                            <Navlink>
                                <NavLink key="profile" exact to="/profile">
                                    Profile
                                </NavLink>
                            </Navlink>
                        </NavItem>,
                        <NavItem>
                            <Navlink>
                                <NavLink key="cart" exact to="/cart">
                                    Cart
                                </NavLink>
                            </Navlink>
                        </NavItem>,
                        <NavItem>
                            <Navlink>
                                <NavLink key="logout" exact to="/logout">Logout</NavLink>
                            </Navlink>
                        </NavItem>] :
                        [<NavItem>
                            <Navlink>
                                <NavLink key="login" exact to="/login">
                                    Login
                                </NavLink>
                            </Navlink>
                        </NavItem>,
                        <NavItem>
                            <Navlink>
                                <NavLink key="signup" exact to="/signup">
                                    Sign Up
                                </NavLink>
                            </Navlink>
                        </NavItem>]
                    }
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;