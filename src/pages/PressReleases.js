import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import {connect} from 'react-redux';
import {config} from '../config/keys';
import AllPageRender from '../components/AllPagesRender';
import {Link} from 'react-router-dom';
import SEOHeader from './../components/SEOHeader';

function News(props) {

    const allPressReleasesPages = props.pages
        ? props
            .pages
            .filter(page => page.category === "press-release")
        : [];

    const numberOfPages = Math.ceil(allPressReleasesPages.length / config.numberOfNewsPerPage);

    const currentPageNumber = 1;

    const limitStartingNumber = (currentPageNumber - 1) * config.numberOfNewsPerPage;

    const limitEndingNumber = limitStartingNumber + config.numberOfNewsPerPage;

    return (
        <MainLayout>
            <WithSidebar>
                <SEOHeader
                    title="Press Releases - Ajaokuta Steel Company Limited"
                    description="Find all press releases from Ajaokuta Steel Company Limited here"/>
                <h1>Press Releases</h1>
                <p>Find below press releases from Ajaokuta Steel Company:</p>
                {!props.isLoaded
                    ? <div>Loading</div>
                    : <div>
                        <AllPageRender
                            pages={allPressReleasesPages.slice(limitStartingNumber, limitEndingNumber)}
                            category="press-release"/>
                        <div>Page {`${currentPageNumber} of ${numberOfPages}`}</div>
                        {(allPressReleasesPages.length > config.numberOfNewsPerPage)
                            ? <div className="pagination-wrapper">
                                    <div className={`pagination pgn-flex-end`}>
                                        <span>
                                            <Link to={`/press-releases/page/${currentPageNumber + 1}`}>Next Page →</Link>
                                        </span>
                                    </div>
                                </div>
                            : null
}

                    </div>}
            </WithSidebar>
        </MainLayout>
    )
}

const mapStateToProps = (state, ownProps) => ({pages: state.page.pages, isLoaded: state.page.isLoaded});

export default connect(mapStateToProps, null)(News);