
import Header from './../components/Header';
import Navbar from './../components/Navbar';
import AdminPortalFooter from './../components/AdminPortalFooter';

const AdminPortalLayout = (props) => {

    return(<div>
    <Header />
    <Navbar />
    <div className="content-max-width">
        { props.children }
    </div>
    <AdminPortalFooter />

    </div>);
}

export default AdminPortalLayout;