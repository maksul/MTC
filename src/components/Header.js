import siteHeader from '../images/siteheader.jpg';
import '../styles/Header.css';

function Header() {

    return (
        <header className="header">
            <div className="content-max-width">
                <img src={siteHeader} alt="site header" />
            </div>
        </header>
    );
}

export default Header;