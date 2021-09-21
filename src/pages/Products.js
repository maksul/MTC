import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import SEOHeader from '../components/SEOHeader';

function Products() {

    return (
        <MainLayout>
            <WithSidebar>
                <SEOHeader
                    title="Products - Ajaokuta Steel Company Limited"
                    description="Checkout the different Products of the company"/>
                <div className="postBody">
                    <h1>Products</h1>

                    <table>
                        <thead>
                            <th colSpan="2">SINTER PRODUCTION PLANT</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>2,610,000 tonnes per annum</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">COKE-OVEN AND BY-PRODUCTS PLANT</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>Coke - 880,000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Tar - 48,000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Ammonium Sulphate (Fertilizer) - 12, 000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Coke Oven gas - 210,240,000m³</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Steam - 350,000 tonnes/year</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">BLAST FURNACE:</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>Liquid Metal - 1,350,000 tonnes /year</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Pig Casting Machine - 155,000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Blast Furnace Slag - 675,000 tonnes/year</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">STEEL MAKING SHOP</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>Liquid Steel - 1,300,000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Continous Casting Machine - 1,813,000 tonnes/year</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">FINISHING MILLS</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>- 1,290,000 tonnes/year</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">BILLET MILL</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Products</td>
                                <td>Billets - 100 x 100mm<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 150 x 150mm</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">MEDIUM SECTION AND STRUCTURAL MILL</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>500,000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td>Products</td>
                                <td>T beam - 80mm x 300mm<br/>
                                    Channels - 80mm x 300mm<br/>
                                    Equal Angles - 70 x 70mm<br/>
                                    -130mm x 130mm</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Un – equal Angles – 50 x 80mm<br/>
                                    100 x 160mm<br/></td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">LIGHT SECTION MILL</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>400, 000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td>Products</td>
                                <td>Plain and ribbed-Bars – 10mm to 30mm<br/>Squares - 10mm to 30mm<br/>
                                    Hexagon - 10 - 14mm,20mm -26mm<br/>
                                    Angles - 25 x 25mm to 50 x 50mm<br/>
                                    With thickness between (3mm and 6mm)</td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>Channels – 30mm to 45mm<br/>
                                    T. Sections - 30mm to 60mm</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th colSpan="2">WIRE ROD MILL</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>130,000 tonnes/year</td>
                            </tr>
                            <tr>
                                <td>Products</td>
                                <td>Wire rods - 5.5mm to 12.5mm<br/>
                                    Re-bars - 6.0mm to 12mm</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </WithSidebar>
        </MainLayout>
    )
}

export default Products;