import WithSidebar from '../../layouts/WithSidebar';
import MainLayout from './../../layouts/MainLayout';

function MachineAndToolsShop() {

    return (
        <MainLayout>
            <WithSidebar>
                <div className="postBody">
                    <h1>Machine AndTools Shop</h1>

                    <p>The shops is equipped with machines, tools and installation necessary to
                        Manufacture mechanical parts and perform machining and repair works on various
                        sizes of work pieces up to 9,000 Metric Tonns per annum of manufactured parts,
                        and I,050 Metric Tonns of Reclaimed spares.</p>

                    <p>Also available are different types of equipment for heat treatment to suit
                        our customer’s need. The shop also handles maintenance job orders involving
                        disassembly, repair and assembly.</p>

                    <p>The unique capabilities of the shop are with respect to specialized jobs/ job
                        sizes viz.</p>

                    <ul>
                        <li>
                            Turning. 800mm diameter x 12meters long</li>
                        <li>Turning. 3,200mm diameter x 3 meters long</li>
                        <li>Milling. Table size 400mm x 1600mm.</li>
                        <li>Planing. Table size 1,400x 6,000mm</li>
                        <li>Horizontal Boring. Machining area 2,500 x 2,000mm</li>
                        <li>
                            Gear cutting. Up to Module 30</li>
                        <li>Heat treatment of component. Up to a mass of charge of 30Metric Tonns.</li>
                        <li>Horizontal press. Up to 600 Metic Tonns capacity.</li>
                    </ul>

                    <p>
                        In addition is the quality control section and a supporting Design and Planning
                        section having well trained Engineers and Auto Card Draftsmen.</p>
                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default MachineAndToolsShop;