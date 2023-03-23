import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import { followTooglethunk, getUserPageByID, userPageActions } from "../../Redux/UserPageReducer";
import { UserPostsList } from "../Posts/UsersPostsList";
import { UserStatus } from "../UserStatus/Status";
import styles from "../../Styles/UserPage.module.css"
import { Avatar } from "./Avatar";
import { Firestore_instance } from "../../DAL/Firestore_config";
import pic from "../../Media/imageGallery.png"
import saved from "../../Media/saved.png"



export const UserPage: React.FC = React.memo(() => {
    const navigate = useNavigate()
    //Get userPageID from query string
    const userPageUrl = useLocation().pathname.split("=")[1]
    //Count of user posts 
    const publicatiponsCount = useSelector((state: Global_state_type) => {
        return state.userPosts.posts.length
    })
    //Fetch the actual user page by ID from query string
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getUserPageByID(userPageUrl))
        Firestore_instance.getPostsByUserID(userPageUrl)
    }, [userPageUrl])

    const currentUserID = useSelector((state: Global_state_type) => {
        return state.app.currentUserID
    })

    const actualUserPage = useSelector((state: Global_state_type) => {
        return state.userPage
    })
    //Status update handler aloowed only on current user page
    const setNewStatus = (userID: string, status: string) => {
        dispatch(userPageActions.setStatus(status))
    }
    //Follow button handler render only when user page is not actualUser
    const followToogle = () => {

        if (actualUserPage.followers?.includes(currentUserID)) {
            dispatch(followTooglethunk(currentUserID, actualUserPage.userID))
            dispatch(userPageActions.unfollow(currentUserID))
        } else {
            dispatch(followTooglethunk(currentUserID, actualUserPage.userID))
            dispatch(userPageActions.follow(currentUserID))
        }
    }

 
    return (
        <div className={styles.userPageContainr}>
            <section className={styles.userPageWrapper} >
                <Avatar avatarIMG={actualUserPage.avatar} userID={actualUserPage.userID} fullName={actualUserPage.fullName} size={"large"} />
                <br />

                <h1 className={styles.fullName}>{actualUserPage.fullName}</h1>


                <div className={styles.info}>
                    {userPageUrl === currentUserID ? <UserStatus status={actualUserPage.status} userID={userPageUrl}
                        setNewStatus={setNewStatus} /> : <p className={styles.status}>{actualUserPage.status}</p>}
                    <div className={styles.publications}>
                        <span>{publicatiponsCount}</span>
                        <br></br>
                        <span >{"Posts"}</span>
                    </div>
                    <NavLink to={"./followers"}>
                        <div className={styles.Follower}>
                            <span>{actualUserPage.followers?.length}</span>
                            <br></br>
                            <span >{"Follower"}</span>
                        </div>
                    </NavLink>
                    <NavLink to={"./Followed"}>
                        <div className={styles.Followed}>
                            <span>{actualUserPage.subscribes?.length}</span>
                            <br></br>
                            <span >{"Followed"}</span>
                        </div>
                    </NavLink>

                </div>
                {userPageUrl !== currentUserID ? <button className={styles.btn} onClick={followToogle}>{Object.values(actualUserPage.followers as Array<string>).includes(currentUserID) ? "Unfollow" : "Follow"}</button> : null}
         

            </section>
            <UserPostsList />
        </div>

    )
})

