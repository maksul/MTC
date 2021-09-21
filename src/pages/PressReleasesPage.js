import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import {useParams, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {config} from '../config/keys';
import AllPageRender from '../components/AllPagesRender';
import SEOHeader from '../components/SEOHeader';

function PressReleasesPage(props) {

    const {pageno} = useParams();

    const allPressReleasesPages = props.pages
        ? props
            .pages
            .filter(page => page.category === "press-release")
        : [];

    const numberOfPages = Math.ceil(allPressReleasesPages.length / config.numberOfPressReleasesPerPage);

    const currentPageNumber = Number(Number(pageno).toFixed(0));

    const limitStartingNumber = (currentPageNumber - 1) * config.numberOfPressReleasesPerPage;

    const limitEndingNumber = limitStartingNumber + config.numberOfPressReleasesPerPage;

    return (
        <MainLayout>
            <WithSidebar>
                <SEOHeader
                    title="Press Releases - Ajaokuta Steel Company Limited"
                    description="Find all press releases from Ajaokuta Steel Company Limited here"/>
                <h1>Press Releases Page</h1>
                <p>Find below Press Releases from Ajaokuta Steel Company:</p>
                {!props.isLoaded
                    ? <div>Loading</div>
                    : (!currentPageNumber || currentPageNumber > numberOfPages)
                        ? <div>PAGE DOES NOT EXIST</div>
                        : <div>
                            <AllPageRender
                                pages={allPressReleasesPages.slice(limitStartingNumber, limitEndingNumber)}
                                category="press-release"/>
                            <div>Page {`${currentPageNumber} of ${numberOfPages}`}</div>
                            {(allPressReleasesPages.length > config.numberOfPressReleasesPerPage)
                                ? <div className="pagination-wrapper">

                                        {(currentPageNumber === 2 && numberOfPages !== 2)
                                            ? <div className="pagination">
                                                    <span>
                                                        <Link to={`/press-releases`}>← Previous Page</Link>
                                                    </span>
                                                    <span>
                                                        <Link to={`/press-releases/page/${currentPageNumber + 1}`}>Next Page →</Link>
                                                    </span>
                                                </div>
                                            : (currentPageNumber === 2 && numberOfPages === 2)
                                                ? <div className="pagination">
                                                        <span>
                                                            <Link to={`/press-releases`}>← Previous Page</Link>
                                                        </span>
                                                    </div>

                                                : (currentPageNumber === 1)
                                                    ? <div className={`pagination pgn-flex-end`}>
                                                            <span>
                                                                <Link to={`/press-releases/page/${currentPageNumber + 1}`}>Next Page →</Link>
                                                            </span>
                                                        </div>

                                                    : (currentPageNumber === numberOfPages)
                                                        ? <div className="pagination">
                                                                <span>
                                                                    <Link to={`/press-releases/page/${currentPageNumber - 1}`}>← Previous Page</Link>
                                                                </span>
                                                            </div>

                                                        : <div className="pagination">
                                                            <span>
                                                                <Link to={`/press-releases/page/${currentPageNumber - 1}`}>← Previous Page</Link>
                                                            </span>
                                                            <span>
                                                                <Link to={`/press-releases/page/${currentPageNumber + 1}`}>Next Page →</Link>
                                                            </span>
                                                        </div>
}
                                    </div>
                                : null
}

                        </div>}
            </WithSidebar>
        </MainLayout>
    )
}

const mapStateToProps = (state, ownProps) => ({pages: state.page.pages, isLoaded: state.page.isLoaded});

export default connect(mapStateToProps, null)(PressReleasesPage);