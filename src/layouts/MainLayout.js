
import Header from './../components/Header';
import Footer from './../components/Footer';
import Navbar from './../components/Navbar';

const MainLayout = (props) => {

    return(<div>
    <Header />
    <Navbar />
    <div className="content-max-width">
        { props.children }
    </div>
    <Footer />

    </div>);
}

export default MainLayout;