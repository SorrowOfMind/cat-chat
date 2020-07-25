import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const {dispatch} = useContext(UserContext)
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
            window.location = '/chat';
        }}>{formik => (
                <div className="form-wrapper">
                    <form onSubmit={formik.handleSubmit} className="form">
                            <input type="text" id="username" {...formik.getFieldProps('username')} placeholder="Username" className="input"/>
                            {formik.touched.username && formik.errors.username
                                ? <div className="error">{formik.errors.username}</div>
                                : null}
                            <input type="text" id="chatroom" {...formik.getFieldProps('chatroom')} placeholder="Chat room" className="input"/>
                            {formik.touched.chatroom && formik.errors.chatroom
                                ? <div className="error">{formik.errors.chatroom}</div>
                                : null}
                        <button type="submit" className="btn-submit btn waves-effect waves-light">Join
                        </button>
                    </form>
                    </div>
            )}
        </Formik>
    )
}

export default SignUp;
