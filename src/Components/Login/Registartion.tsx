import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/Registration.module.css"
import { getUserRegFormFromState } from "../../Selectors/Selectors";
import * as yup from 'yup'
import { createUserByEmailAndPassword } from "../../Redux/AuthReducer";



export const Registration: React.FC = React.memo((props) => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const [showPassword,setShowPassword] = useState(false)
    const hidePassword = () => {
        if(showPassword){
            setShowPassword(false)
        }else{
            setShowPassword(true)
        }
    }
    const validationShema = yup.object().shape({
        userName: yup.string().typeError("Username must be string").max(30).min(5).required(),
        email: yup.string().typeError("Email must be an string").min(6).max(30).required("This Field is Required")
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                "Incorrect email format"),
        password: yup.string().typeError("Password should be a string").required("This field is reqired").min(6).max(30)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!~@#$%^&*?])/,
                "Incorect password format"),
        repeatPassword: yup.string().required("This field is required").oneOf([yup.ref("password")],"Passwords dint match").typeError("Should be a string").min(6).max(30)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!~@#$%^&*?])/)
    })
    const newUserRegForm = useSelector(getUserRegFormFromState)



    const setSubmit = (values: { userName: string, email: string, password: string, repeatPassword: string }) => {
        dispatch(createUserByEmailAndPassword(values.email,values.password,values.userName))

    }

    return (
        <section className={styles.regWrapper}>
            <section className={styles.container}>
                <h1>Registration</h1>
                <hr />
                <Formik
                    enableReinitialize={true} //<= If true Form will reinitialize after reciving new initial value from state 
                    //FORM INITIAL VALUES
                    initialValues={{
                        userName: "",
                        email: "",
                        password: "",
                        repeatPassword: ""
                    }}
                    validateOnBlur={true}
                    onSubmit={setSubmit}
                    validationSchema={validationShema}
                >

                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                        return (
                            <div className={styles.registrationForm}>
                                <input 
                                autoComplete="off"
                                placeholder="Name" type="text" name="userName" onChange={handleChange} onBlur={handleBlur} value={values.userName}></input>
                                <br />
                                <span className={styles.spanError}>{touched.userName ?  errors.userName : null}</span>
                                <br />

                                <input autoComplete="off" type="text" name="email" onChange={handleChange} placeholder={"Email"}
                                 onBlur={handleBlur} value={values.email} />
                                <br />
                                <span className={styles.spanError}>{touched.email ?  errors.email : null}</span>
                                <br />
                                <input autoComplete="off" id={styles.passwordInput} type={showPassword ? "text" :"password"} name="password" 
                                 onChange={handleChange} placeholder={"Password"} onBlur={handleBlur} value={values.password} />
                                <div className={styles.showContainer} onClick={hidePassword}>
                                    <span>Show</span>
                                </div>
                                <span className={styles.spanError}>{touched.password ? errors.password : null}</span> 
                                <br />
                                <input autoComplete="off" placeholder="Repeat password" type={showPassword ? "text" : "password"} 
                                name="repeatPassword" onChange={handleChange} onBlur={handleBlur} value={values.repeatPassword}></input>
                                <br />
                                <span className={styles.spanError}>{touched.repeatPassword ? errors.repeatPassword : null}</span>
                              
                                <br />
                                <button type="submit"
                                //@ts-ignore 
                                onClick={handleSubmit} disabled={!dirty || !isValid} className={!dirty || !isValid ? styles.disabledButton : null}>Create Account</button>
                            </div>
                        )
                    }}

                </Formik>

            </section>
        </section>

    )


})