import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import SEOHeader from '../components/SEOHeader';

function Contact() {

    return (
        <MainLayout>
            <WithSidebar>
            <SEOHeader
                    title="Contact Us - Ajaokuta Steel Company Limited"
                    description="Here is the company's information."/>
                <div className="postBody">
                    <h1>Contact Us</h1>
                    <h3>Contact Information:</h3>

                    <h3>Engineering Works & Services:-</h3>

                    <p>Email: sulei_umar@yahoo.com; umarsulei@ajaokutasteel.com<br/>

                        Phone: +2348036048476; +2348053566929
                    </p>

                    <h3>Commerce Department:
                    </h3>
                    <p>+234834028856</p>

                    <h3>Public Affairs & Information:
                    </h3>
                    <p>+2438065328250<br/>
                        E-mail: saliuahmad50@gmail.com<br/>

                        OR<br/>

                        +2348036707200<br/>

                        +2348052174874<br/>

                        Email: frankjamgbadi@gmail.com</p>

                    <h3>Email Address:</h3>
                    <p>info@ajaokutasteel.com
                    </p>

                    <h3>Website:</h3>
                    <p>www.ajaokutasteel.com</p>

                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default Contact;