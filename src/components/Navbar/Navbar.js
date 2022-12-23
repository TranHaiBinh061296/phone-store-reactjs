import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <Link className="navbar-brand fw-bolder" to={"/phone-store-reactjs"}>
                    <i className="fa fa-phone  me-2 text-warning"></i>
                    Phone Store
                </Link>
            </div>
        </nav>
    )
}
export default Navbar;