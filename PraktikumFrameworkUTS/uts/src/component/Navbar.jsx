import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import './style.css';
import ListKeranjang from "../container/listKeranjang";
import ListProduct from "../container/listProduct";

class Navbar extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1 className="navbar-brand fw-bold fs-1">Gemini Iron Shop</h1>
                    <ul className="header">
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/listProduct">
                                List Product
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/listProduct">
                                <ListProduct />
                            </Route>
                            <Route path="/cart">
                                <ListKeranjang />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Navbar;