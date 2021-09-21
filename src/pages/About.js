import MainLayout from './../layouts/MainLayout';
import WithSidebar from '../layouts/WithSidebar';
import SEOHeader from '../components/SEOHeader';
import '../styles/About.css';

function About() {

    return (
        <MainLayout>
            <WithSidebar>
                <SEOHeader title="About - Ajaokuta Steel Company Limited" />
                <div className="postBody">
                    <h1>About Us</h1>
                    <h3>WHO WE ARE</h3>
                    <p>Ajaokuta Steel Company is Nigeria’s leading steel company. Guided by a
                        philosophy to produce safe, sustainable steel, it is the leading supplier of
                        quality steel products in all the major economic sectors including construction,
                        packaging and wire drawing/nail making industry. ASCL operates in all the major
                        markets in Nigeria and employs about 3000 people.</p>

                    <p>Ajaokuta will take full advantage of the ECOWAS treaty and the Export
                        Expansion Scheme of the Federal Government of Nigeria to expand its market base
                        to the whole of the West African Sub-region and beyond.</p>

                    <h3>ASCL VISION STATEMENT</h3>
                    <p>Production of quality steel and steel products for the industrialization of
                        Nigeria while meeting all standards.</p>

                    <h3>ASCL MISSION STATEMENT</h3>
                    <p>To be a knowledge based organization that continuously achieves economic
                        value for stake holders by optimizing resources through operational excellence,
                        enabled by continuous innovation and driven by technology to meet customers’
                        satisfaction.</p>

                    <h2>Background of Organization:</h2>

                    <p>The Federal Government of Nigeria established the Nigerian Steel Development
                        Authority (NSDA) in 1971 through Decree No. 19 in order to advance the
                        development of the Nigerian Steel Industry. NSDA carried out detailed market
                        studies and investigations on local availability of raw materials. The
                        Preliminary Project Report (PPR) of 1974, the Detailed Project Report (DPR) of
                        1977 and the Global Contract (1979) for construction of steel plant at Ajaokuta
                        were all commissioned and executed during the NSDA period.</p>
                    <p>
                        The NSDA was thereafter dissolved through decree No. 60 on the 18th of September
                        1979. This decree also created Ajaokuta Steel Company Limited, ASCL being the
                        successor of NSDA.
                    </p>

                    <p>The Ajaokuta integrated steel complex was conceived and steadily developed
                        with the vision of erecting a Metallurgical Process Plant cum Engineering
                        Complex with other auxiliaries and facilities. The complex is meant to be used
                        to generate important upstream and downstream industrial and economic activities
                        that are critical to the diversification of our economy into an industrial one.
                        Ajaokuta Steel Plant is therefore aptly tagged as the “Bedrock of Nigeria’s
                        industrialization”.</p>

                    <p>The project was embarked upon as a strategic industry, a job creator and a
                        foreign exchange saver and earner. It was envisaged that the project would
                        generate a myriad of socio-economic benefits and increase the productive
                        capacity of the nation through its linkages to other industrial sectors. It
                        would provide materials for infrastructural development, technology acquisition,
                        human capacity building, income distribution, regional development and
                        employment generation. While the project would directly employ about 10,000
                        staff at the first phase of commissioning, the upstream and downstream
                        industries that will evolve all over the nation will engage not less than
                        500,000 employees.</p>

                    <p>The plant by 1994 was reckoned to be at 98% completion in terms of equipment
                        erected. Some completed units of the Plant operated at different times but had
                        to short down due to non-availability of fund.</p>

                </div>

            </WithSidebar>
        </MainLayout>
    )
}

export default About;