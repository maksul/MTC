import {connect} from 'react-redux';
import {logout} from './../../reduxstore/actions/authActions';
import WithAdminAuth from '../../layouts/WithAdminAuth';

const AdminProfile = (props) => {
    return (
        <WithAdminAuth>
            {props.isAuthenticated && <div className="ap-main-section">
                <div className="ap-main-section-header ap-box">
                    <h2>ASCL C-PANEL (@{props.user.username && props.user.username})</h2>
                </div>
                <div className="ap-box">

                    <h3>Welcome @{props.user.username && props.user.username}! to the administrative portal.</h3>

                    <p>You are an admin of Ajaokuta Steel Company Ltd Website. You have access to
                        manage its contents. Use the links provided in the sidebar to administer your
                        account and this portal</p>
                    <button
                        style={{
                        borderRadius: "0.4rem",
                        background: "var(--primary-color)",
                        color: 'white',
                        padding: "1rem"
                    }}
                        onClick={() => props.logout()}>Logout</button>
                </div>
            </div>}
        </WithAdminAuth>
    )
}

const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps, {logout})(AdminProfile);
