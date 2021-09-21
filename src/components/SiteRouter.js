import Home from '../pages/Home';
import About from '../pages/About';
import Clients from '../pages/Clients';
import CompanyOverview from '../pages/CompanyOverview';
import ConsultancyServices from '../pages/ConsultancyServices';
import Contact from '../pages/Contact';
import EngineeringWorksComplex from '../pages/EngineeringWorksComplex';
import FAQs from '../pages/FAQs';
import Gallery from '../pages/Gallery';
import GalleryPage from '../pages/GalleryPage';
import ManagementProfile from '../pages/ManagementProfile';
import ManagementProfileSingle from './../pages/ManagementProfileSingle';
import News from '../pages/News';
import NewsPage from '../pages/NewsPage';
import NewsSingle from '../pages/NewsSingle';
import PressReleases from '../pages/PressReleases';
import PressReleasesSingle from './../pages/PressReleasesSingle';
import PressReleasesPage from './../pages/PressReleasesPage';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MTC from '../pages/MTC';
import AdminProfile from './../pages/admin/AdminProfile';
import ManageAccess from '../pages/admin/ManageAccess';
import ManageFileUpload from '../pages/admin/ManageFileUpload';
import ManageGallery from '../pages/admin/ManageGallery';
import ManagePage from '../pages/admin/ManagePage';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import {loadUser} from './../reduxstore/actions/authActions';
import {connect} from 'react-redux';
import {useEffect, Fragment} from 'react';
import {loadFirebase} from './../reduxstore/actions/firebaseActions';
import {getAssets} from './../reduxstore/actions/assetActions';
import {getPages} from './../reduxstore/actions/pageActions';
import ScrollToTop from './ScrollToTop';
import EquipmentRepairShop from './../pages/EngineeringWorks/EquipmentRepairShop';
import ForgeAndFabricationShop from './../pages/EngineeringWorks/ForgeAndFabricationShop';
import FoundaryAndPatternMakingShop from './../pages/EngineeringWorks/FoundaryAndPatternMakingShop';
import MachineAndToolsShop from './../pages/EngineeringWorks/MachineAndToolsShop';
import RubberizingAndVulcanizingShop from './../pages/EngineeringWorks/RubberizingAndVulcanizingShop';
import ManageFaq from './../pages/admin/ManageFaq';
import ManageMgmtProfile from './../pages/admin/ManageMgmtProfile';
import {getGalleries} from './../reduxstore/actions/galleryActions';
import {getMgmtProfiles} from './../reduxstore/actions/mgmtProfileActions';
import {getAccesses} from './../reduxstore/actions/accessActions';
import {getFaqs} from './../reduxstore/actions/faqActions';

export const AdmRedirect = () => {
    useHistory().push("/adm/profile");
    return (
        <Fragment></Fragment>
    );
}

const SiteRouter = (props) => {

    useEffect(() => {
        props.loadUser();
        props.getAssets();
        props.getPages();
        props.getGalleries();
        props.getMgmtProfiles();
        props.getFaqs();
        props.getAccesses();

        // load firebase after 3s of component mount
        setTimeout(() => props.firebaseApp === null
            ? props.loadFirebase()
            : null, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            {/* cause page to scroll to top on route change */}
            <ScrollToTop/>
            <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/adm">
                        <AdmRedirect/>
                    </Route>
                    <Route exact path="/adm/profile">
                        <AdminProfile/>
                    </Route>
                    <Route exact path="/adm/manage-access">
                        <ManageAccess/>
                    </Route>
                    <Route exact path="/adm/manage-file-upload">
                        <ManageFileUpload/>
                    </Route>
                    <Route exact path="/adm/manage-gallery">
                        <ManageGallery/>
                    </Route>
                    <Route exact path="/adm/manage-page">
                        <ManagePage/>
                    </Route>
                    <Route exact path="/adm/manage-mgmt-profile">
                        <ManageMgmtProfile/>
                    </Route>
                    <Route exact path="/adm/manage-faq">
                        <ManageFaq/>
                    </Route>
                    <Route exact path="/register-adm">
                        <Register/>
                    </Route>
                    <Route exact path="/login-adm">
                        <Login/>
                    </Route>
                    <Route exact path="/clients">
                        <Clients/>
                    </Route>
                    <Route exact path="/company-overview">
                        <CompanyOverview/>
                    </Route>
                    <Route exact path="/consultancy-services">
                        <ConsultancyServices/>
                    </Route>
                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                    <Route exact path="/MTC">
                        <MTC/>
                    </Route>
                    <Route exact path="/engineering-works-complex">
                        <EngineeringWorksComplex/>
                    </Route>
                    <Route exact path="/engineering-works-complex/equipment-repair-shop">
                        <EquipmentRepairShop/>
                    </Route>
                    <Route exact path="/engineering-works-complex/forge-and-fabrication-shop">
                        <ForgeAndFabricationShop/>
                    </Route>
                    <Route exact path="/engineering-works-complex/foundary-and-pattern-making-shop">
                        <FoundaryAndPatternMakingShop/>
                    </Route>
                    <Route exact path="/engineering-works-complex/machine-and-tools-shop">
                        <MachineAndToolsShop/>
                    </Route>
                    <Route exact path="/engineering-works-complex/rubberizing-and-vulcanizing-shop">
                        <RubberizingAndVulcanizingShop/>
                    </Route>
                    <Route exact path="/faqs">
                        <FAQs/>
                    </Route>
                    <Route exact path="/gallery">
                        <Gallery/>
                    </Route>
                    <Route exact path="/gallery/page/:pageno">
                        <GalleryPage/>
                    </Route>
                    <Route exact path="/management-profile">
                        <ManagementProfile/>
                    </Route>
                    <Route exact path="/management-profile/:slug">
                        <ManagementProfileSingle/>
                    </Route>
                    <Route exact path="/news">
                        <News/>
                    </Route>
                    <Route exact path="/news/:slug">
                        <NewsSingle/>
                    </Route>
                    <Route exact path="/news/page/:pageno">
                        <NewsPage/>
                    </Route>
                    <Route exact path="/press-releases">
                        <PressReleases/>
                    </Route>
                    <Route exact path="/press-releases/:slug">
                        <PressReleasesSingle/>
                    </Route>
                    <Route exact path="/press-releases/page/:pageno">
                        <PressReleasesPage/>
                    </Route>
                    <Route exact path="/products">
                        <Products/>
                    </Route>
                    <Route exact path="/about">
                        <About/>
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route>
                        <div>
                            404
                        </div>
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}

const mapStateToProps = (state, ownProps) => ({firebaseApp: state.fire.firebaseApp})

export default connect(mapStateToProps, {
    loadUser,
    loadFirebase,
    getAssets,
    getPages,
    getGalleries,
    getMgmtProfiles,
    getAccesses,
    getFaqs
})(SiteRouter);
