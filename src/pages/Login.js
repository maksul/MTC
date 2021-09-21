import '../styles/Login.css';
import LoginLayout from './../layouts/LoginLayout';
import {connect} from 'react-redux';
import {login} from '../reduxstore/actions/authActions';
import SimpleReactValidator from 'simple-react-validator';
import {Link, useHistory} from 'react-router-dom';
import {useState, useRef} from 'react';
import Swal from 'sweetalert2';

const Login = (props) => {
    const [username,
        setUsername] = useState('');
    const [password,
        setPassword] = useState('');
    const [,
        forceUpdate] = useState();

    let history = useHistory();

    if (props.isLoginFailed) {
        Swal.fire({icon: 'error', title: 'Login failed!', text: ''})
    }

    //instantiate the validator as a singleton
    const simpleValidator = useRef(new SimpleReactValidator({
        element: (message, className) => <div className={'formErrorMsg'}>{message}</div>
    }));

    const handleLoginFormSubmit = e => {
        e.preventDefault();

        if (simpleValidator.current.allValid()) {
            //all input is valid create admin user object

            // create a user object
            const attemptedUser = {
                username,
                password
            };

            props.login(attemptedUser);

        } else {
            //input not valid, so show error
            simpleValidator
                .current
                .showMessages(); //show all errors if exist
            forceUpdate(1); //force update component to display error
        }
    }

    const handleInputChange = e => {
        switch (e.target.name) {
            case 'username':
                setUsername(() => e.target.value);
                break;
            case 'password':
                setPassword(() => e.target.value);
                break;
            default:
        }
    }

    return (
        <LoginLayout>
            {!props.isUserLoaded
                ? null
                : props.isAuthenticated
                    ? <div
                            style={{
                            textAlign: "center"
                        }}>
                            <h3>You are logged in.</h3>
                            <br/>
                            <small>
                                <i>Redirecting to profile page...</i>
                            </small>
                            <div>{history.push("/adm/profile")}</div>

                        </div>

                    : <form
                        method="post"
                        id="loginForm"
                        className="login-form"
                        onSubmit={handleLoginFormSubmit}>
                        <div className="login-form-header">
                            <h1>Login</h1>
                            <div>
                                <span>Do not have an account? &nbsp;&nbsp;<Link to="/register-adm">Register</Link>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    value={username}
                                    required={true}
                                    onChange={handleInputChange}/> {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('username', username, 'required|alpha_num|between:4,25')
}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={password}
                                    required={true}
                                    onChange={handleInputChange}/> {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('password', password, 'required|between:4,25')
}
                            </div>
                            <div className="submit-wrapper">
                                <button
                                    type={props.isAttemptingLogin
                                    ? "button"
                                    : "submit"}
                                    className="login-form-submit">{props.isAttemptingLogin
                                        ? "Attempting login..."
                                        : "Login"}</button>
                            </div>
                        </div>
                    </form>
}
        </LoginLayout>
    )
}

const mapStateToProps = state => ({isAttemptingLogin: state.auth.isAttemptingLogin, isLoginFailed: state.auth.isLoginFailed, isAuthenticated: state.auth.isAuthenticated, isUserLoaded: state.auth.isUserLoaded});

export default connect(mapStateToProps, {login})(Login);
