import * as authService from '../../../../services/authService';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import Message from '../../../Errors/Message';
import { Context } from '../../Context';

const Register = () => {
    const history = useHistory();
    
    const [usernameMsg, setUsernameMsg] = useState('');
    const [userEmailMsg, setUserEmailMsg] = useState('');
    const [userPassMsg, setUserPassMsg] = useState('');
    const [userRePassMsg, setUserRePassMsg] = useState('');

    const [state, dispatch] = useContext(Context);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let pass = true;
        if (e.target.username.value.length < 5) {
            pass = false;
            setUsernameMsg('Username should be at least 5 characters');
            setTimeout(() => setUsernameMsg(''), 1500);
        }
        if (e.target.email.value.length < 5) {
            pass = false;
            setUserEmailMsg('Email should be at least 5 characters');
            setTimeout(() => setUserEmailMsg(''), 1500);
        }
        if (e.target.password.value.length < 5) {
            pass = false;
            setUserPassMsg('Password should be at least 5 characters');
            setTimeout(() => setUserPassMsg(''), 1500);
        }
        if (e.target.rePassword.value.length < 5) {
            pass = false;
            setUserRePassMsg('Repeat password should be at least 5 characters');
            setTimeout(() => setUserRePassMsg(''), 1500);
        }
        if (e.target.password.value !== e.target.rePassword.value) {
            pass = false;
            e.target.password.value = '';
            e.target.rePassword.value = ''
            setUserRePassMsg('Password and Repeat Password are different!');
            setTimeout(() => setUserRePassMsg(''), 1500);
        }
        if (pass) {
            authService.register({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                rePassword: e.target.rePassword.value
            })
                .then(x => {
                    e.target.reset();
                   dispatch({ type: 'user', payload: x.username });
                    dispatch({ type: 'userId', payload: x.userId });
                    dispatch({ type: 'email', payload: x.email });
                    dispatch({ type: 'info', payload: x.message });
                    history.push('/')
                })
                .catch(x => {
                    !x.username ? dispatch({ type: 'user', payload: null }) : dispatch({ type: 'user', payload: x.username });
                    dispatch({ type: 'err', payload: x.message });
                });
        }    
    }

    return (
        <section class="register">
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <legend>Register</legend>
                    <p className="field">
                        <label htmlFor="username">Username</label>
                        <span className="input">
                            <input type="text" name="username" id="username" placeholder="Username" />
                            <span className="actions"></span>
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                    <Message msg={usernameMsg} />
                    <p className="field">
                        <label htmlFor="email">Email</label>
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="Email" />
                            <span className="actions"></span>
                            <i className="fas fa-user"></i>
                        </span>
                    </p>
                    <Message msg={userEmailMsg} />
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                            <span className="actions"></span>
                            <i className="fas fa-key"></i>
                        </span>
                    </p>
                    <Message msg={userPassMsg} />
                    <p className="field">
                        <label htmlFor="rePassword">Repeat Password</label>
                        <span className="input">
                            <input type="password" name="rePassword" id="rePassword" placeholder="Repeat password" />
                            <span className="actions"></span>
                            <i className="fas fa-key"></i>
                        </span>
                    </p>
                    <Message msg={userRePassMsg} />
                    <div className="buttons">
                        <input className="button submit" type="submit" value="Register" />
                        <input className="button submit" type="button" value="Back" onClick={() => history.push('/')} />
                    </div>
                </fieldset>
            </form>
            <style jsx>{`
            .register{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .button {
                display: block;
                padding: 0.6rem 1rem;
                border-radius: 0.4rem;
                text-decoration: none;
                font-weight: bold;
                background: #4b61a1;
                color: rgb(255, 255, 255);
                border: none;
                font-size: 1rem;
                margin-top: 2rem;
                outline: none;
            }
            form {
                max-width: 30rem;
                flex-grow: 1;
            }
            form, form fieldset, form legend, form label, form input {
                display: block;
            }
            form fieldset, form legend {
                border: 1px solid #666;
                background: #F9F9F9;
                border-radius: 0.3rem;
                box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.1);
            }
            form fieldset {
                padding: 2.5em 2em 2em 2em;
                position: relative;
            }
            form legend {
                width: 30%;
                padding: 0.5rem 1rem;
                left: -1px;
                top: -1.4rem;
                position: absolute;
            }
            form label {
                font-weight: bold;
                margin: .5rem;
            }
            .field .input {
                display: flex;
                position: relative;
                align-items: center;
            }
            .field .input:after {
                display: block;
                content: '';
            }
            .field .input input {
                border: none;
                flex: 1 1 auto;
                padding: 0.8rem;
                outline: none;
                background: transparent;
                z-index: 2;
                order: 2;
            }
            .field .input .fas {
                z-index: 2;
                position: relative;
                padding: 0 0 0 0.8rem;
                font-size: 0.9em;
                order: 1;
            }
            .field .input input+.actions {
                display: block;
                background: #FFF;
                border: 1px solid #CCC;
                border-radius: 0.3rem;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }
            .field .input input:focus+.actions {
                border-color: #090;
            }
            .field .input input:focus+.actions+.fas {
                color: #090;
            }
            .err-msg {
                margin-top: 15px;
            }
            .buttons {
            display: flex;
            justify-content: space-around;
        }
        `}</style>
        </section>
    )
};
export default Register;