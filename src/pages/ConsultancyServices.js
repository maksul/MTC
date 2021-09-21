import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import SEOHeader from '../components/SEOHeader';

function ConsultancyServices() {

    return (
        <MainLayout>
            <WithSidebar>
            <SEOHeader
                    title="Consultancy Services - Ajaokuta Steel Company Limited"
                    description="We also offer consultancy services in the following areas: Design and drawing, Product development, General Engineering, Rubber product development etc."/>
                <div className="postBody">
                    <h1>Consultancy Services</h1>
                    <p>We also offer consultancy services in the following areas:</p>

                    <ul>
                        <li>Design and drawing.</li>
                        <li>Product development.</li>
                        <li>General Engineering.</li>
                        <li>Rubber product development.</li>
                        <li>Plant refurbishing and Turn around Maintenance.</li>
                    </ul>

                </div>
            </WithSidebar>

        </MainLayout>
    )
}

export default ConsultancyServices;