import React from "react";
import {  NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";

//IMPORTING INTERFACE ICONS
import style from "../../Styles/Navbar.module.css";
import profile from "../../Media/Profile.png";
import home from "../../Media/Home.png"
import upload from "../../Media/Upload.png";
import logout_img from "../../Media/Logout.png";
import search from "../../Media/search.png";
import { postActions } from "../../Redux/PostReducer";
import { logOutThunk } from "../../Redux/AuthReducer";





export const Navbar: React.FC = React.memo((props) => {
    const dispatch: any = useDispatch()

    let isAuth = useSelector((state: Global_state_type) => {
        return state.auth.is_auth
    })
    let currentUserUrl = useSelector((state: Global_state_type) => {
        return state.account.userID
    })
    const logOut = () => {
        dispatch(logOutThunk())
    }
    const newPostHandler = () => {
        dispatch(postActions.setIsOnnewPost(true))
    }
    return (
        <footer className={style.navbarContainer}>


            <section className={style.navigation}>

                <ul className={style.navigation_list}>
                    <li>
                        <NavLink to={`/search`}>
                            <img src={search} alt="#" />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={`/profile/id=${currentUserUrl}`}>
                            <img src={profile} alt="#" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/news">
                            <img src={home} alt="" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="newPost">
                            <img src={upload} alt="#" />
                        </NavLink>

                    </li>
                    {isAuth ? 
                    <li>
                        <img src={logout_img} alt="" onClick={logOut} />
                    </li> : null }
                </ul>
            </section>
        </footer>

    )
});