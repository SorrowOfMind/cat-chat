import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

const SignUp = () => {
    const [username,
        setUsername] = useState('');
    const [chatroom,
        setChatroom] = useState('');

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
            console.log(values);
        }}>{formik => (
                <div className="form-wrapper">
                    <form onSubmit={formik.handleSubmit}>
                        <input type="text" id="username" {...formik.getFieldProps('username')}/>
                        {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
                        <input type="text" id="chatroom" {...formik.getFieldProps('chatroom')}/>
                        {formik.touched.chatroom && formik.errors.chatroom ? <div>{formik.errors.chatroom}</div> : null}
                        <button type="submit" className="btn-submit">Join</button>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default SignUp;
