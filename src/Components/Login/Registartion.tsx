import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/Registration.module.css"
import { getUserRegFormFromState } from "../../Selectors/Selectors";
import * as yup from 'yup'



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
            .matches(/^(?=.*[a-z])(?=.*[A_Z])(?=.*[0-9])(?=.*[!~@#$%^&*?])/,
                "Incorect password format"),
        repeatPassword: yup.string().required("This field is required").oneOf([yup.ref("password")]).typeError("Should be a string").min(6).max(30)
            .matches(/^(?=.*[a-z])(?=.*[A_Z])(?=.*[0-9])(?=.*[!~@#$%^&*?])/)
    })
    const newUserRegForm = useSelector(getUserRegFormFromState)

    let [onError, setOnError] = useState({ onError: false, errorMessage: null as unknown as string })

    const setSubmit = (values: { userName: string, email: string, password: string, repeatPassword: string }) => {

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
                                <input placeholder="Name" type="text" name="userName" onChange={handleChange} onBlur={handleBlur} value={values.userName}></input>
                                <br />
                                <span className={styles.spanError}>{errors.userName}</span>
                                <br />

                                <input type="text" name="Email" onChange={handleChange} placeholder={"Email"} onBlur={handleBlur} value={values.email} />
                                <br />
                                <span className={styles.spanError}>{errors.email}</span>
                                <br />
                                <input id={styles.passwordInput} type={showPassword ? "text" :"password"} name="password" 
                                 onChange={handleChange} placeholder={"Password"} onBlur={handleBlur} value={values.password} />
                                <div className={styles.showContainer} onClick={hidePassword}>
                                    <span>Show</span>
                                </div>
                                <span className={styles.spanError}>{errors.password}</span> 
                                <br />
                                <input placeholder="Repeat password" type={showPassword ? "text" : "password"} name="repeatPassword" onChange={handleChange} onBlur={handleBlur} value={values.repeatPassword}></input>
                                <br />
                                <span className={styles.spanError}>{errors.repeatPassword}</span>
                              
                                <br />
                                <button type="submit"
                                //@ts-ignore 
                                onClick={handleSubmit} disabled={!touched && !dirty}>Create Account</button>
                            </div>
                        )
                    }}

                </Formik>

            </section>
        </section>

    )


})