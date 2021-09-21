import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import {connect} from 'react-redux';
import AllProfilesRender from '../components/AllProfilesRender';
import '../styles/ManagementProfile.css';
import SEOHeader from '../components/SEOHeader';

function MangementProfile(props) {

    const allProfiless = props.mgmtProfiles;

    return (
        <MainLayout>
            <WithSidebar>
                <SEOHeader title="Management Profile - Ajaokuta Steel Company Limited" description="Find profile of top management staff of Ajaokuta Steel Company Limited" />
                <h1>Management Profile</h1>
                <p>Find profile of top management staff below:</p>
                {!props.isLoaded
                    ? <div>Loading</div>
                    : <div>
                        <AllProfilesRender profiles={allProfiless}/>
                    </div>}
            </WithSidebar>
        </MainLayout>
    )
}

const mapStateToProps = (state, ownProps) => ({mgmtProfiles: state.mgmtProfile.mgmtProfiles, isLoaded: state.page.isLoaded});

export default connect(mapStateToProps, null)(MangementProfile);