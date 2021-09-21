import MainLayout from './../layouts/MainLayout';
import WithSidebar from './../layouts/WithSidebar';
import ASCLClient from './../images/asclclient.jpg';
import SEOHeader from '../components/SEOHeader';

function Clients() {

    return (
        <MainLayout>
            <WithSidebar>
            <SEOHeader
                    title="Our Clients - Ajaokuta Steel Company Limited"
                    description="List of out previous clients. Engineering Workshops has business relationship in the repair of equipment
                        and manufacture of parts with the following industries" coverimg={ASCLClient} />
                <div className="postBody">
                    <h1>Clients</h1>
                    <img src={ASCLClient} alt="Our Client"/>
                    <h3>LIST OF OUR PREVIOUS CLIENTS</h3>
                    <p>Engineering Workshops has business relationship in the repair of equipment
                        and manufacture of parts with the following industries:</p>
                    <ul>
                        <li>Kaduna Refining and Petro-Chemical Company.</li>
                        <li>Warri Refining and Petrochemical Company.</li>
                        <li>Port-Harcourt Refining Company.</li>
                        <li>Delta Steel Company.</li>
                        <li>Cement Company of Northern Nigeria Sokoto.</li>
                        <li>Obajana Cement Company.</li>
                        <li>First Aluminum Company , Port-Harcourt.</li>
                        <li>Zhong Yang Industry Nigeria Limited. Kogi State.</li>
                        <li>DICON ,Kaduna</li>
                        <li>Kogi State University, Ayangba.</li>
                        <li>National Iron Mining Company, Itakpe</li>
                        <li>Cadbury Nigeria Limited, Lagos.</li>
                        <li>West Afrrican Portland Cement Lagos</li>
                        <li>Nigeria Security Printing and Minting Company. Abuja.</li>
                        <li>BCC,Gboko Benue State</li>
                    </ul>
                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default Clients;