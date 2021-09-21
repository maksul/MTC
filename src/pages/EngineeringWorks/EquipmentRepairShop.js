import WithSidebar from '../../layouts/WithSidebar';
import MainLayout from './../../layouts/MainLayout';

function EquipmentRepairShop() {

    return (
        <MainLayout>
            <WithSidebar>
                <div className="postBody">
                    <h1>Equipment Repair Shop</h1>
                    <p>The shop is equipped with machines, tools and installations that can</p>

                    <ul>
                        <li>Repair/ reconditioning of all types of Electric motors and generators both AC/DC</li>
                        <li>Repair of Power distribution Transformers up to 1. 8 M VA capacity.</li>
                        <li>Repair /reconditioning of electrical control panels.</li>
                        <li>Repair of oil circuit breakers of different capacities.</li>
                        <li>
                            Repair of Pumps, filters and valves.</li>
                        <li>Dynamic Balancing of Rotors and Shafts.</li>
                        <li>Static balancing of Rotors / Shafts</li>
                        <li>Purification and Reclamation of used Transformer oil.</li>
                        <li>
                            Bending of pipes up to 160mm diameter.</li>
                    </ul>

                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default EquipmentRepairShop;