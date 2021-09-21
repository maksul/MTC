import MainLayout from './../layouts/MainLayout';
import '../styles/Home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import asclCarousel1 from '../images/ascl-carousel.jpg';
import asclCarousel2 from '../images/ascl-carousel-2.jpg';
import asclCarousel3 from '../images/ascl-carousel-3.jpg';
import asclCarousel4 from '../images/ascl-carousel-4.jpg';
import asclCarousel5 from '../images/ascl-carousel-5.jpg';
import asclCarousel6 from '../images/ascl-carousel-6.jpg';
import asclCarousel7 from '../images/ascl-carousel-7.jpg';
import industryTools1 from '../images/industry-tools-1.png';
import industryTools2 from '../images/industry-tools-2.png';
import industryTools3 from '../images/industry-tools-3.png';
import Metgate from '../images/metgate.png';
import { Link } from 'react-router-dom';
import SEOHeader from '../components/SEOHeader';


function Home() {
    return(
        <MainLayout>
        <SEOHeader title="Ajaokuta Steel Company Limited - Bedrock of Nigeria's Industrialization." />
        <Carousel 
            autoPlay={true} 
            emulateTouch={true} 
            infiniteLoop={true}
            showIndicators={true}
            showThumbs={false}
            showStatus={false}
        >
            <div>
                <img src={asclCarousel1} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={asclCarousel2} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={asclCarousel3} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={asclCarousel4} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={asclCarousel5} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={asclCarousel6} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={asclCarousel7} alt="Ascl Carousel" />
            </div>
            <div>
                <img src={Metgate} alt="Ascl Carousel" />
            </div>
            </Carousel>


            <div className="home-layout">
                <h1 className="wlc-text">Welcome to Ajaokuta Steel Company Limited</h1>
                <div className="home-about">
                    <div>
                        <h2>About Us</h2>
                    </div>
                    <div className="ha-right">
                        <p>Ajaokuta Steel Project is located on 24,000 hectares of sprawling green-field land-mass. The Steel Plant itself is built on 800-hectares of land. The chosen Technology for Steel Production is the time tested Blast-Furnace – Basic Oxygen Furnace route for Steel Production.</p>
                        <p>The Ajaokuta integrated steel complex was conceived and steadily developed with the vision of erecting a Metallurgical Process Plant cum Engineering Complex with other auxiliaries and facilities. The complex is meant to be used to generate important upstream and downstream industrial and economic activities that are critical to the diversification of our economy into an industrial one. Ajaokuta Steel Plant is therefore aptly tagged as the “Bedrock of Nigeria’s industrialization”.</p>
                        <p>
                            <Link to="/about" className="home-read-more">Read More</Link>
                        </p>
                    </div>

                </div>
                <div className="home-section-two">
                    <div className="hst-col-1">
                        <div>
                            <div className="hst-icon">
                                <img src={industryTools1} alt="#" />
                            </div>
                            <h3>Products</h3>
                            <p>
                            We endeavour to provide the highest quality products to our consumers at a cost-effective and competitive prices. Stringent quality control procedures ensure that any product which leaves our premises is nothing short of world-class quality.
                            </p>
                        </div>
                        <div>
                            <Link to="/products" className="home-read-more">Read More</Link>
                        </div>
                    </div>

                    <div className="hst-col-2">
                        <div>
                            <div className="hst-icon">
                                <img src={industryTools2} alt="#" />
                            </div>  
                            <h3>Facilities</h3>
                            <p>In each of our engineering workshops are wide range of machinery and equipment to carry out a variety of fabrication, repair and maintenance works, manufacture of intricate spare parts and reclamation of spares.</p>
                        </div>
                        <div>
                            <Link to="/company-overview" className="home-read-more">Read More</Link>
                        </div>
                    </div>

                    <div className="hst-col-3">
                        <div>
                            <div className="hst-icon">
                                <img src={industryTools3} alt="#" />
                            </div>
                            <h3>Our Clients</h3>
                            <p>At Ajaokuta Steel Company Limited, the Engineering Workshops have business relationship in the repair of equipment and manufacture of parts with our clients which in most cases are industries.</p>
                        </div>
                        <div>
                            <Link to="/clients" className="home-read-more">Read More</Link>
                        </div>
                    </div>

                </div>

            </div>
        </MainLayout>
    )
}

export default Home;