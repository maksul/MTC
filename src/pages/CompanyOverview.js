import MainLayout from './../layouts/MainLayout';
import WithSidebar from './../layouts/WithSidebar';
import ASCLOverview from './../images/asclcompanyoverview.jpg';
import SEOHeader from '../components/SEOHeader';

function CompanyOverview() {

    return (
        <MainLayout>
            <WithSidebar>
                <SEOHeader
                    title="Company Overview - Ajaokuta Steel Company Limited"
                    description="Ajaokuta Steel Company is located on 24,000 hectares of sprawling green-field
                        land-mass. The Steel Plant itself is built on 800-hectares of land." coverimg={ASCLOverview} />
                <div className="postBody">
                    <h1>Company Overview</h1>

                    <img src={ASCLOverview} alt="Company Overview"/>

                    <p>Ajaokuta Steel Company is located on 24,000 hectares of sprawling green-field
                        land-mass. The Steel Plant itself is built on 800-hectares of land. The chosen
                        Technology for Steel Production is the time tested Blast-Furnace – Basic Oxygen
                        Furnace route for Steel Production.</p>

                    <p>The Ajaokuta Steel Plant’s major units are as follows.</p>

                    <h3>OVERVIEW</h3>

                    <ul>
                        <li>Integrated Steel Plant based on BF- BOF Route</li>
                        <li>Installed capacity – 1.3 Million Tonnes PA</li>
                        <li>Provision to increase Capacity to 2.6 Million Tonnes and further to 5.2
                            Million Tonnes PA</li>
                        <li>Rolling commenced November ’04</li>
                        <li>Rolling Entire Range</li>
                        <li>Wire rod 5.5 mm- 12 mm</li>
                        <li>Rebars 8 mm – 30 mm</li>
                    </ul>

                    <h3>PLANT FACILITIES</h3>

                    <ul>
                        <li>Coke Batteries - 0.88 MTPA capacity</li>
                        <li>Sinter Plant - 2.6 MTPA of fluxed sinter</li>
                        <li>Blast Furnace - 1.3 MTPA of hot metal.</li>
                        <li>Two Basic Oxygen Furnaces – (130 tons each) 1.3 MTPA.</li>
                        <li>Three continuous bloom casters of four strands each.</li>
                        <li>Billet Mill - 795,000 TPA</li>
                        <li>Wire Rod Mill (WRM) - 130,000 TPA</li>
                        <li>Light Section Mill (LSM) - 400,000 TPA</li>
                        <li>Medium Section and Structural Mills (MSSM) - 560,000 TPA</li>
                        <li>Thermal Power Plant can produce a total of 110 MW from 2 generators of 55MW
                            each.</li>
                    </ul>

                    <p>Among the auxiliary plants are the</p>
                    <ul>
                        <li>Lime Production Plant,</li>
                        <li>Alumino Silicate Refactory Plant and</li>
                        <li>Tar bonded Dolomite Plant.</li>
                    </ul>

                    <p>These major units are serviced by an array of water treatment and
                        recirculation facilities and extensive gas facilities. A captive Power Plant of
                        capacity 110mw is to provide an alternative source of power to the Steel Plant.</p>

                    <h3>Engineering Complex:</h3>

                    <p>Engineering Complex as one of the auxiliary units adequately equipped with
                        machines and equipment for the manufacture of spare parts and fixtures of
                        various specifications.</p>

                    <h3>CAPABILITY</h3>

                    <h4>Billets</h4>
                    <ul>
                        <li>100 x 100 mm</li>
                    </ul>

                    <h4>WRM</h4>
                    <ul>
                        <li>Wire rods of size between 5.5 mm to 12.5 mm.</li>
                        <li>Re bars of size between 6.0 mm to 12 mm.</li>
                    </ul>

                    <h4>LSM</h4>
                    <ul>
                        <li>
                            <span>Plain and re bars</span>
                            <span>10 mm to 30 mm</span>
                        </li>
                        <li>
                            <span>Squares</span>
                            <span>10 mm to 30 mm.</span>
                        </li>
                        <li>
                            <span>Hexagons</span>
                            <span>10 – 14 mm , 20 and 26.</span>
                        </li>
                        <li>
                            <span>Angles</span>
                            <span>25x25 mm to 50x50 mm in thickness between 3 mm to 6mm.</span>
                        </li>
                        <li>
                            <span>Channels</span>
                            <span>30 mm to 45 mm.</span>
                        </li>
                        <li>
                            <span>T – sections</span>
                            <span>30 mm to 60 mm.</span>
                        </li>
                        <li>
                            <span>Strips</span>
                            <span>6-12 ( t ) x 12 - 70 ( w )mm</span>
                        </li>
                    </ul>

                    <h4>MSSM</h4>
                    <ul>
                        <li>
                            <span>I beams</span>
                            <span>80 mm to 300 mm.</span>
                        </li>
                        <li>
                            <span>Channels</span>
                            <span>80 mm to 300 mm.</span>
                        </li>
                        <li>
                            <span>Equal angles</span>
                            <span>70 x 70 mm up to130x130 mm.</span>
                        </li>
                        <li>
                            <span>Un equal angles.</span>
                            <span>50x80 mm and 100 x 160 mm.</span>
                        </li>
                        <li>
                            <span>Flats</span>
                            <span>70 mm to 150 mm width x 10 to 20 mm in thickness.</span>
                        </li>
                    </ul>

                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default CompanyOverview;