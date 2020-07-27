import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Formik} from 'formik';
import {Redirect} from 'react-router-dom';
import * as Yup from 'yup';

const SignUp = () => {
    const [redirect, setRedirect] = useState(false);
    const {dispatch} = useContext(UserContext);
    return (
        <Formik
            initialValues={{
            username: '',
            chatroom: ''
        }}
            validationSchema={Yup.object({
            username: Yup
                .string()
                .required('Required'),
            chatroom: Yup
                .string()
                .required('Required')
        })}
            onSubmit={values => {
            dispatch({type: 'SIGN_UP', payload: values});
            setRedirect(true);
        }}>{formik => (
                <div className="form-wrapper">
                    <h1 className="title">Join the cat chat!</h1>
                    <form onSubmit={formik.handleSubmit} className="form clearfix">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="username"
                                {...formik.getFieldProps('username')}
                                placeholder="Username"
                                className="input"/> {formik.touched.username && formik.errors.username
                                ? <div className="error">{formik.errors.username}</div>
                                : null}
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="chatroom"
                                {...formik.getFieldProps('chatroom')}
                                placeholder="Chat room"
                                className="input"/> {formik.touched.chatroom && formik.errors.chatroom
                                ? <div className="error">{formik.errors.chatroom}</div>
                                : null}
                        </div>
                        <button type="submit" className="btn-submit">Join</button>
                        {redirect ? <Redirect to="/chat"/> : null}
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default SignUp;
