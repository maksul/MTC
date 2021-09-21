import asclLogo from '../images/ascl-logo.png';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

    return (
        <header className="footer">
            <div className="content-max-width">
                <div className="footer-container">
                    <div className="fc-col-1">
                        <div className="footer-company-logo-name">
                            <div><img src={asclLogo} alt="#" /></div>

                        </div>


                        <p>Ajaokuta Steel Company is Nigeria’s leading steel company. Guided by a philosophy to produce safe, sustainable steel, it is the leading supplier of quality steel products in all the major economic sectors including construction, packaging and wire drawing/nail making industry.</p>
                    </div> 
                    <div className="fc-col-2">
                        <h3>Company Links</h3>
                        <ul className="company-links-list">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/management-profile">Management Profile</Link></li>
                            <li><Link to="/company-overview">Company Overview</Link></li>
                            <li><Link to="/engineering-works-complex">Engineering Works Complex</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/consultancy-services">Consultancy Sevices</Link></li>
                            <li><Link to="/clients">Our Clients</Link></li>
                            <li><Link to="/news">News</Link></li>
                            <li><Link to="/press-releases">Press Releases</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/faqs">FAQs</Link></li>
                        </ul>
                    </div> 
                    <div className="fc-col-3">
                        <h3>Contact Info</h3>
                        <ul className="contact-info-list">
                            <li><span>Address:</span> <span>Ajaokuta, Kogi State.</span></li>
                            <li><span>Phone:</span> <span>+2348036048476; +2348053566929 </span></li>
                            <li><span>Email:</span> <span>saliuahmad50@gmail.com</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-stripe"></div>
            <div className="footer-last-section">
                <div className="content-max-width">
                    <small>© 2021 Ajaokuta Steel Company Limited. All Rights Reserved</small>
                </div>
            </div>
        </header>
    );
}

export default Footer;