import React, { Dispatch, useState } from "react";
import { Formik } from "formik";
import { Global_state_type } from "../../Redux/Store";
import { connect, useDispatch } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { loginInWithEmailAndPassword, signInWithGooglePopUp } from "../../Redux/AuthReducer";
import styles from "../../Styles/Login.module.css"
//ts-ignore@
import * as yup from 'yup'


export const NewLogin: React.FC = React.memo(() => {
    const dispatch: any = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)
    const onShowPasswordHandler = () => {
        if (hidePassword) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    }
    const validationShema = yup.object().shape({
        email: yup.string().typeError("Email must be an string").min(6).max(30).required("This Field is Required")
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                "Incorrect email format"),
        password: yup.string().typeError("Password should be a string").required("This field is reqired").min(6).max(30)
            .matches(/^(?=.*[a-z])(?=.*[A_Z])(?=.*[0-9])(?=.*[!~@#$%^&*?])/,
                "Incorect password format")
    })
    //Login by email & password
    const Submit = (values: { email: string, password: string }) => {
        console.log(values)
    }

    //PopUp login
    const signInWithGoggle = () => {
        dispatch(signInWithGooglePopUp())
    }
    return (
        <section className={styles.loginPageContainer}>
            <div className={styles.picture}>
            </div>
            <section className={styles.formDivContainer}>
                <div className={styles.wrapper}>
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        enableReinitialize={true}
                        validateOnBlur={true}
                        onSubmit={Submit}
                        validationSchema={validationShema}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                            return (


                                <section className={styles.LoginByEmailAndPassword}>
                                    <h1>Login</h1>
                                    <input type="text" name="email" onChange={handleChange} placeholder={"Email"} onBlur={handleBlur} value={values.email} />
                                    <br />
                                    <span className={styles.spanError}>{errors.email}</span>
                                    <br />
                                    <input id={styles.passwordInput} type={hidePassword ? "password" : "text"} name="password" onChange={handleChange} placeholder={"Password"} onBlur={handleBlur} value={values.password} />
                                    <div className={styles.showContainer} onClick={onShowPasswordHandler}>
                                        <span>Show</span>
                                    </div>
                                    <br />
                                    <span className={styles.spanError}>{errors.password}</span>
                                    <button id={styles.loginButton} type="submit" disabled={!touched && !dirty}
                                        //@ts-ignore
                                        onClick={handleSubmit} >Login</button>
                                </section>


                            )
                        }}
                    </Formik>
                    <br />

                    <span>OR</span>
                    <br />
                    <NavLink to="/registration">Create account</NavLink>


                    <section className={styles.Sign_in_with_google}>
                        <br />

                        <button className={styles.loginButtonGoogle} type="button" onClick={signInWithGoggle} >Sign in with Google</button>
                        {/* <img src={goole_pic} alt="#" className={styles.googleButtonImg} /> */}
                    </section>
                </div>

            </section>
        </section>
    )
})


const MapStateToProps = (state: Global_state_type) => {
    return {
        isAuth: state.auth.is_auth,
        authToken: state.auth.auth_token,
        onError: state.auth.onError,
        isFetch: state.app.is_fetch
    }
};
const MapDispatchToProps = (dispatch: any) => {
    return {
        signIn: signInWithGooglePopUp
    }
}
export const Login_container = connect(MapStateToProps, MapDispatchToProps)(NewLogin);