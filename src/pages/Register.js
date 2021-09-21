import '../styles/Login.css';
import LoginLayout from './../layouts/LoginLayout';
import {Link, useHistory} from 'react-router-dom';
import {useState, useRef} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux';
import {register} from './../reduxstore/actions/authActions';
import Swal from 'sweetalert2';

const Register = (props) => {

    const [username,
        setUsername] = useState('');
    const [password,
        setPassword] = useState('');
    const [retypePassword,
        setRetypePassword] = useState('');
    const [accessName,
        setAccessName] = useState('');
    const [accessKey,
        setAccessKey] = useState('');
    const [,
        forceUpdate] = useState();

    let history = useHistory();

    if (props.isLoginFailed) {
        Swal.fire({icon: 'error', title: 'Registration failed!', text: ''})
    }

    //instantiate the validator as a singleton
    const simpleValidator = useRef(new SimpleReactValidator({
        element: (message, className) => <div className={'formErrorMsg'}>{message}</div>,
        validators: {
            samePassword: {
                message: 'Both passwords must be equal.',
                rule: (val, params, validator) => val === params[0],
                required: true
            }
        }
    }));

    const handleRegistrationFormSubmit = e => {
        e.preventDefault();

        if (simpleValidator.current.allValid()) {
            //all input is valid create admin user object

            // create an attempted user
            const attemptedUser = {
                username,
                password,
                retypePassword,
                accessName,
                accessKey
            }

            props.register(attemptedUser);

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
            case 'retype-password':
                setRetypePassword(() => e.target.value);
                break;
            case 'access-name':
                setAccessName(() => e.target.value);
                break;
            case 'access-key':
                setAccessKey(() => e.target.value);
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
                        id="registration-form"
                        className="login-form"
                        onSubmit={handleRegistrationFormSubmit}>
                        <div className="login-form-header">
                            <h1>Register</h1>
                            <div>
                                <span>Do you have an account? &nbsp;&nbsp;<Link to="/login-adm">Login</Link>
                                </span>
                            </div>
                        </div>
                        <div className="login-form-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
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
                            <div className="form-group">
                                <label htmlFor="password">Retype Password</label>
                                <input
                                    type="password"
                                    name="retype-password"
                                    id="retype-password"
                                    className="form-control"
                                    placeholder="Retype Password"
                                    value={retypePassword}
                                    required={true}
                                    onChange={handleInputChange}/> {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('password', retypePassword, `required|between:4,25|samePassword:${password}`)
}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Access Name</label>
                                <input
                                    type="text"
                                    name="access-name"
                                    id="access-name"
                                    className="form-control"
                                    placeholder="Enter Access Name"
                                    value={accessName}
                                    required={true}
                                    onChange={handleInputChange}/>{/* simple validation */
                                simpleValidator
                                    .current
                                    .message('access name', accessName, 'required|alpha_num|between:4,25')
}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Access Key</label>
                                <input
                                    type="password"
                                    name="access-key"
                                    id="access-key"
                                    className="form-control"
                                    placeholder="Enter Access Key"
                                    value={accessKey}
                                    required={true}
                                    onChange={handleInputChange}/> {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('access key', accessKey, 'required|alpha_num|between:4,25')
}
                            </div>
                            <div className="submit-wrapper">
                                <button type="submit" className="login-form-submit">Register</button>
                            </div>

                        </div>
                    </form>}
        </LoginLayout>
    )
}

const mapStateToProps = (state, ownProps) => ({isAuthenticated: state.auth.isAuthenticated, isUserLoaded: state.auth.isUserLoaded, isLoginFailed: state.auth.isLoginFailed})

export default connect(mapStateToProps, {register})(Register);
