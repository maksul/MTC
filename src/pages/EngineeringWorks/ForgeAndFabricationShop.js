import WithSidebar from '../../layouts/WithSidebar';
import MainLayout from './../../layouts/MainLayout';

function ForgeAndFabricationShop() {

    return (
        <MainLayout>
            <WithSidebar>
                <div className="postBody">
                    <h1>Forge And Fabrication Shop</h1>

                    <p>The shop is equipped with machines, equipment and installation necessary to
                        produce Steel Forgings of light and heavy parts up to 500Kg, Fabricate light,
                        heavy parts and Steel structures up to 10 Metric Tons etc. The shop’s forging
                        and fabricating capacities are 2,000 MTonns and 2,200 MTonns per annum
                        respectively.</p>

                    <p>The Shop is design to handle</p>

                    <ul>
                        <li>Plate Bending of maximum thickness of 40mm.</li>
                        <li>Plate/ round/strip of between 25-65mm thick plate/ rounds.</li>
                        <li>
                            Annealing and normalizing.</li>
                    </ul>

                    <p>The core equipment of the shop is as follows:</p>
                    <ul>
                        <li>2 Ton forging hammer with a forging manipulator</li>
                        <li>4-Roller plate bending machine.</li>
                        <li>Different types of welding equipment.</li>
                        <li>
                            Heat Treatment furnaces of various hearth areas.</li>
                    </ul>

                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default ForgeAndFabricationShop;