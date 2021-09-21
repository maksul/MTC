import {Fragment} from 'react';
import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import {useParams, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import {getReadTime} from '../helper';
import SEOHeader from '../components/SEOHeader';

function PressReleasesSingle(props) {

    const {slug} = useParams();

    const allPressReleasesPages = props.pages
        ? props
            .pages
            .filter(page => page.category === "press-release")
        : [];

    const exactPage = allPressReleasesPages.filter(page => page.slug === slug)[0];

    const exactPageIndex = allPressReleasesPages.indexOf(exactPage);

    const nextPage = allPressReleasesPages[exactPageIndex - 1]
        ? allPressReleasesPages[exactPageIndex - 1]
        : null;
    const previousPage = allPressReleasesPages[exactPageIndex + 1]
        ? allPressReleasesPages[exactPageIndex + 1]
        : null;

        // if (exactPage) {
        //     console.log('body', exactPage.body);
        //     console.log('replaced', exactPage.body.replace(/\W/gi, ''));
        // }
    /*
	function to return dangerous markup
	*/
    const createMarkup = (markup) => {
        return {__html: markup};
    }

    return (
        <MainLayout>
            <WithSidebar>
                {!props.isLoaded
                    ? <div>Loading</div>
                    : exactPage
                        ? <div>
                                <SEOHeader
                                    title={`${exactPage.title} : News - Ajaokuta Steel Company Limited`}
                                    description={`${exactPage.title} : News - Ajaokuta Steel Company Limited`}/>
                                <div className="page-header">
                                    <h5 className="breadcrumb">
                                        <small>
                                            <Link to="/">Home
                                            </Link>&nbsp;»&nbsp;
                                            <Link to="/press-releases">News
                                            </Link>&nbsp; » {exactPage.title}</small>
                                    </h5>
                                    <h2>{exactPage.title}</h2>
                                    <h5 className="page-meta">
                                        <span>
                                            <small>{moment(exactPage.created_at).format('MMM DD, YYYY')}</small>
                                        </span>
                                        &nbsp; |&nbsp;
                                        <span>
                                            <small>{getReadTime(exactPage.body)}</small>
                                        </span>
                                        &nbsp; |&nbsp;
                                        <span>
                                            <small>{exactPage.author_username}</small>
                                        </span>
                                    </h5>
                                    <div className="page-cover-wrap">
                                        <img className="page-cover" src={exactPage.cover_img} alt="Page Cover"/>
                                    </div>
                                </div>

                                <div className="page-body-container">
                                    <div
                                        className={`page-body true-page-body`}
                                        dangerouslySetInnerHTML={createMarkup(exactPage.body)}/>
                                </div>

                                <div className="page-pagination">
                                    <div className="pp-left">
                                        {previousPage && <Link to={`/press-releases/${previousPage.slug}`}>← {previousPage.title}</Link>}
                                    </div>
                                    <div className="pp-right">
                                        {nextPage && <Link to={`/press-releases/${nextPage.slug}`}>{nextPage.title}
                                            →</Link>}
                                    </div>
                                </div>

                            </div>
                        : <Fragment>
                            <SEOHeader
                                    title={`404 - Page not found`}
                                    description={`404 - Page not found`}
                                    nofollow={true}
                                    noindex={true}
                                    />
                            <div>404 - Page not found</div>
                        </Fragment>}
            </WithSidebar>
        </MainLayout>
    )
}

const mapStateToProps = (state, ownProps) => ({pages: state.page.pages, isLoaded: state.page.isLoaded});

export default connect(mapStateToProps, null)(PressReleasesSingle);