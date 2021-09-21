import {connect} from 'react-redux';
import {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import AdminPortalLayout from './AdminPortalLayout';
import AdminPortalWithSidebar from './AdminPortalWithSidebar';

const AdminProfile = (props) => {

    let history = useHistory();

    return (
        <Fragment>
            {!props.isUserLoaded
                ? <div>Loading...</div>
                : !props.isAuthenticated
                    ? <div>
                            <h3>You are NOT logged in.</h3>
                            <br/>
                            <small>
                                <i>Redirecting to login page...</i>
                            </small>
                            <div>{history.push("/login-adm")}</div>

                        </div>
                    : <AdminPortalLayout>
                        <AdminPortalWithSidebar>
                            { props.children }
                        </AdminPortalWithSidebar>
                    </AdminPortalLayout>
}
        </Fragment>
    )
}

const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, isUserLoaded: state.auth.isUserLoaded});

export default connect(mapStateToProps, null)(AdminProfile);
