import React from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import logo from "./website logo.jpg"; // Adjust path to your logo image
import { useAuth } from "../hooks/useAuth";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logoContainer}>
                    <Link to="/" className={classes.logo}>
                        <img src={logo} alt="Website Logo" className={classes.logoImage} />
                    </Link>
                    <Link to="/college-predictor" className={classes.collegePredictor}>
                        College Predictor
                    </Link>
                </div>
                <nav>
                    <ul>
                        {user ? (
                            <li className={classes.menu_container}>
                                <Link to="/profile">{user.name}</Link>
                                <div className={classes.menu}>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/about">About Us</Link>
                                    <Link to="/bookmarks">Bookmarks</Link>
                                    <a onClick={logout}>Logout</a>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className={classes.credit}>
                <p>Developed by Roshan zameer</p>
            </div>
        </header>
    );
}
