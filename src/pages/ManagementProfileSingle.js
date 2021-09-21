import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import {useParams, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SEOHeader from './../components/SEOHeader';

function ManagementProfileSingle(props) {

    const {slug} = useParams();

    const allProfiles = props.mgmtProfiles;

    const exactProfile = allProfiles.filter(profile => profile.slug === slug)[0];

    return (
        <MainLayout>
            <WithSidebar>
            <SEOHeader title="Management Profile - Ajaokuta Steel Company Limited" description="Find profile of top management staff of Ajaokuta Steel Company Limited" />
                {!props.isLoaded
                    ? <div>Loading</div>
                    : exactProfile
                        ? <div>
                                <div className="page-header">
                                    <h5 className="breadcrumb">
                                        <small>
                                            <Link to="/">Home
                                            </Link>&nbsp;»&nbsp;
                                            <Link to="/management-profile">Management Profile
                                            </Link>&nbsp; » {exactProfile.position}</small>
                                    </h5>

                                    <div className="proc">
                                        <div className="proc-left">
                                            <h3>Positions</h3>
                                            <ul>
                                                {allProfiles.map(profile => <li key={profile._id} className={`${exactProfile.slug === profile.slug && 'active-list'}`}><Link to={`/management-profile/${profile.slug}`}>{exactProfile.slug === profile.slug && <i className="neu neu-chevron-right"></i>}{profile.position}</Link></li>)}
                                            </ul>
                                        </div>
                                        <div className="proc-right">
                                            <h3>{exactProfile.position}</h3>
                                            <div className="">
                                                <img className="" src={exactProfile.photo} alt={exactProfile.name}/>
                                            </div>
                                            <div className="proc-about">
                                                <div>{exactProfile.about}</div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                

                            </div>
                        : <div>404 - Page not found</div>}
            </WithSidebar>
        </MainLayout>
    )
}

const mapStateToProps = (state, ownProps) => ({mgmtProfiles: state.mgmtProfile.mgmtProfiles, isLoaded: state.page.isLoaded});

export default connect(mapStateToProps, null)(ManagementProfileSingle);