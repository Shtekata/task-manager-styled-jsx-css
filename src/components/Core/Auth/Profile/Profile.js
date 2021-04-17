import { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import * as authService from '../../../../services/authService';
import profilePicture from '../../../../img/profile.png';
import { Form, Formik, useField } from 'formik';
import * as y from 'yup';
import Message from "../../../Errors/Message/Message";
import { useHistory } from "react-router";

const CustomTextInput = ({...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='custom-text-input'>
            <input {...field} {...props} />
            {meta.touched && meta.error ? <Message msg={meta.error} /> : null}
        </div>
    );
};

const CustomSelectInput = ({ ...props }) => {
    const [field, meta] = useField(props, 'checkbox');
    return (
        <Fragment>
            <select {...field} {...props} />
            {meta.touched && meta.error ? <Message msg={meta.error} /> : null}
        </Fragment>
    );
};

const CustomCheckboxInput = ({children, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='custom-text-input'>
            <label className='checkbox'>
                <input {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? <Message msg={meta.error} /> : null}
        </div>
    );
};

const Profile = () => {

    const [state, dispatch] = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();

    useEffect(() => {
        authService.getUser(state.userId || localStorage.getItem('userId'))
            .then(x => {
                dispatch({ type: 'photoUrl', payload: x.user.photoUrl });
                dispatch({ type: 'alternateEmail', payload: x.user.alternateEmail });
                dispatch({ type: 'phoneNumber', payload: x.user.phoneNumber });
                dispatch({ type: 'address', payload: x.user.address });
            })
            .catch(x => {
                !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                dispatch({ type: 'err', payload: x.message });
            });
    }, [editMode]);

    const onEditClickHandler = () => {
        setEditMode(true);
    };

    const onCancelClickHandler = () => {
        setEditMode(false);
    }

    return (
        <Fragment>
            <Formik
                initialValues={{
                    photoUrl: state.photoUrl,
                    username: state.user,
                    email: state.email,
                    alternateEmail: state.alternateEmail,
                    phoneNumber: state.phoneNumber?.slice(4,state.phoneNumber.lenght)||'',
                    address: state.address,
                    selectPhoneCode: '+349',
                    ok: false
                }}
                validationSchema={y.object({
                    photoUrl: y.string().min(5, 'Must be at least 5 characters').max(200, 'Must be 200 characters or less'),
                    username: y.string().min(5, 'Must be at least 5 characters').max(20, 'Must be 20 characters or less').required('Required'),
                    email: y.string().email('Invalid email').required('Required'),
                    alternateEmail: y.string().email('Invalid email'),
                    phoneNumber: y.number('Must fill only numbers').positive().integer().min(100000000,'Must be at lest 9 numbers'),
                    address: y.string().min(5, 'Must be at least 5 characters').max(500, 'Must be 500 characters or less'),
                    selectPhoneCode: y.string().oneOf(['+349', '+359', '+369', '+379', '+389'], 'Invalid phone code'),
                    okCheck: y.boolean().required('Required').oneOf([true],'OK?')
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const data = {};
                    data.username = values.username;
                    data.email = values.email;
                    data.alternateEmail = values.alternateEmail;
                    data.photoUrl = values.photoUrl;
                    data.address = values.address;
                    data.phoneNumber = values.phoneNumber ? values.selectPhoneCode + values.phoneNumber : '';
                    authService.updateUser({ _id: state.userId, x: data }).then(x => {
                        resetForm();
                        setSubmitting(false);
                        dispatch({ type: 'user', payload: x.username });
                        dispatch({ type: 'email', payload: x.email });
                        dispatch({ type: 'photoUrl', payload: x.user.photoUrl });
                        dispatch({ type: 'alternateEmail', payload: x.user.alternateEmail });
                        dispatch({ type: 'phoneNumber', payload: x.user.phoneNumber });
                        dispatch({ type: 'address', payload: x.user.address });
                        setEditMode(false);
                        history.push('/');
                    })
                        .catch(x => {
                            !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                            if(x.message==='Username is already in use!'||x.message==='Email is already in use!')dispatch({ type: 'info', payload: x.message });
                            else dispatch({ type: 'err', payload: x.message });
                        });
                }}
            >
                {props => (
                    <Form>
                        <div className="page">
                            <div className="profile">
                                {state.photoUrl
                                    ? <img src={state.photoUrl} alt="userWithUsernameAndTel" />
                                    : <img src={profilePicture} alt="default userWithUsernameAndTel" />
                                }
                                <h3>User Profile:</h3>
                                {editMode ?
                                    <div className="flex">
                                        <label htmlFor='photoUrl'>Photo URL: </label>
                                        <CustomTextInput type="text" className='grow' name="photoUrl" id="photoUrl"  placeholder='Photo Url' />
                                    </div>
                                    : null}
                                <div className="flex">
                                    {editMode ? <label htmlFor='username'>Username: </label> : <p>Username: </p>}
                                    {state.user ? editMode
                                        ? <CustomTextInput type='text' className='grow' name='username' id='username' placeholder='Username' />
                                        : state.user
                                            ? <p>{state.user}</p>
                                            : <p className="fill">please fill in your details...</p>
                                        : ''}
                                </div>
                                <div className="flex">
                                    {editMode ? <label htmlFor='email'>Email: </label> : <p>Email: </p>}
                                    {state.user ? editMode
                                        ? <CustomTextInput type='text' className='grow' name='email' id='email'  placeholder='Email' />
                                        : state.email
                                            ? <p>{state.email}</p>
                                            : <p className="fill">please fill in your details...</p>
                                        : ''}
                                </div>
                                <div className="flex">
                                    {editMode ? <label htmlFor='alternateEmail'>Alternate Email: </label> : <p>Alternate Email: </p>}
                                    {state.user ? editMode
                                        ? <CustomTextInput type='text' className='grow' name='alternateEmail' id='alternateEmail'  placeholder='Alternate Email' />
                                        : state.alternateEmail
                                            ? <p>{state.alternateEmail}</p>
                                            : <p className="fill">please fill in your details...</p>
                                        : ''}
                                </div>
                                <div className="flex">
                                    {editMode ? <label htmlFor='phoneNumber'>Phone: </label> : <p>Phone: </p>}
                                    {state.user ? editMode
                                        ? <div className='grow flex'>
                                            <CustomSelectInput className='selectPhoneCode' name="selectPhoneCode" id="selectPhoneCode" class="selectPhoneCode">
                                                <option value="+349">+349</option>
                                                <option value="+359">+359</option>
                                                <option value="+369">+369</option>
                                                <option value="+379">+379</option>
                                                <option value="+389">+389</option>
                                            </CustomSelectInput>
                                            <CustomTextInput type='text' className='grow' className='grow phoneNumber' name='phoneNumber' id='phoneNumber'  placeholder='888 88 88 88' />
                                        </div>
                                        : state.phoneNumber
                                            ? <p>{state.phoneNumber}</p>
                                            : <p className="fill">+359 please fill in your details...</p>
                                        : ''}
                                </div>
                                <div className="flex">
                                    {editMode ? <label htmlFor='address'>Address: </label> : <p>Address: </p>}
                                    {state.user ? editMode
                                        ? <CustomTextInput type='text' className='grow' name='address' id='address'  placeholder='Bulgaria, Sofia ...' />
                                        : state.address
                                            ? <p>{state.address}</p>
                                            : <p className="fill">please fill in your details...</p>
                                        : ''}
                                </div>
                                <div className="flex">
                                    {editMode
                                        ? <CustomCheckboxInput type='checkbox' name='okCheck'>I accept the terms and conditions</CustomCheckboxInput>
                                        : ''}
                                </div>
                                <div className="profile-buttons">
                                    {editMode ?
                                        <button className="edit-button" type='submit'>{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
                                        : <button className="edit-button" onClick={onEditClickHandler}>Edit</button>}
                                    {editMode ? <button className="edit-button" onClick={onCancelClickHandler}>Cancel</button> : null}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <style jsx>{`
            .page {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 80vh;
            }
            .profile {
              padding: 1.5rem;
              border: .3rem solid rgb(255, 0, 36);
              border-radius: 35%;
              color: brown;
              background-color: hsla(0, 0%, 94.1%, .8);
              box-shadow: 0 0 1em 0 #000;
              display: flex;
              flex-direction: column;
              margin: 1rem;
            }
            .profile h3 {
                text-decoration: underline;
                margin: .5rem;
            }
            .profile img {
                width: 7em;
                height: 7em;
                margin: 0 auto;
                display: block;
                border-radius: 50%;
            }
            .grow {
                flex-grow: 1;
            }
            .flex>input.phoneNumber {
                margin-right: 0;
            }
            .flex {
                display: flex;
                align-items: center;
            }
            .flex p:first-child {
                text-align: right;
                margin: .5em;
            }
            .flex p:last-child {
                text-align: left;
                margin: .5em;
                font-weight: bold;
                flex-grow: 1;
            }
            .profile button {
                color: #FF0024;
                border: none;
                border-radius: 12%;
                padding: .5em;
                outline: none;
                margin: .5rem 0.5rem 0 0.5rem;
                background-color: #20526E;
                font-size: 1.2em;
                font-weight: bold;
                align-self: center;
                width: 6rem;
                cursor: pointer;
            }
            .flex>input, .flex>div {
                text-align: left;
                margin: .5em;
            }
            .red-button {
                background-color: red;
            }
            .green-button {
                background-color: green;
            }
            input, select {
                padding: 0.5em;
            }
            .input-error {
                border-left: 3px solid red;
            }
            .error {
                color: red;
            }
            .fill {
                opacity: 0.5;
            }
            .err-msg {
                margin-top: 0.3rem;  
            }
            .custom-text-input {
                display: flex;
                flex-direction: column;
                width: 100%;
            }
            .checkbox {
                display: flex;
                justify-content: space-evenly;
            }
            `}</style>
        </Fragment>
    )
};
export default Profile;