import WithSidebar from '../layouts/WithSidebar';
import MainLayout from './../layouts/MainLayout';
import {useParams, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {config} from '../config/keys';
import AllGalleriesRender from '../components/AllGalleriesRender';

function GalleryPage(props) {

    const {pageno} = useParams();

    const allGalleries = props.galleries;

    const numberOfPages = Math.ceil(allGalleries.length / config.numberOfGalleryPerPage);

    const currentPageNumber = Number(Number(pageno).toFixed(0));

    const limitStartingNumber = (currentPageNumber - 1) * config.numberOfGalleryPerPage;

    const limitEndingNumber = limitStartingNumber + config.numberOfGalleryPerPage;


    return (
        <MainLayout>
            <WithSidebar>
                <h1>Gallery Page</h1>
                <p>Find below photos from Ajaokuta Steel Company. Click on any photo to view properly.</p>
                {!props.isLoaded
                    ? <div>Loading</div>
                    : (!currentPageNumber || currentPageNumber > numberOfPages)
                        ? <div>PAGE DOES NOT EXIST</div>
                        : <div>
                            <AllGalleriesRender
                                galleries={allGalleries.slice(limitStartingNumber, limitEndingNumber)}/>
                            <div className="page-count">Page {`${currentPageNumber} of ${numberOfPages}`}</div>
                            {(allGalleries.length > config.numberOfGalleryPerPage)
                                ? <div className="pagination-wrapper">

                                        {(currentPageNumber === 2 && numberOfPages !== 2)
                                            ? <div className="pagination">
                                                    <span>
                                                        <Link to={`/gallery`}>← Previous Page</Link>
                                                    </span>
                                                    <span>
                                                        <Link to={`/gallery/page/${currentPageNumber + 1}`}>Next Page →</Link>
                                                    </span>
                                                </div>
                                            : (currentPageNumber === 2 && numberOfPages === 2)
                                                ? <div className="pagination">
                                                        <span>
                                                            <Link to={`/gallery`}>← Previous Page</Link>
                                                        </span>
                                                    </div>

                                                : (currentPageNumber === 1)
                                                    ? <div className={`pagination pgn-flex-end`}>
                                                            <span>
                                                                <Link to={`/gallery/page/${currentPageNumber + 1}`}>Next Page →</Link>
                                                            </span>
                                                        </div>

                                                    : (currentPageNumber === numberOfPages)
                                                        ? <div className="pagination">
                                                                <span>
                                                                    <Link to={`/gallery/page/${currentPageNumber - 1}`}>← Previous Page</Link>
                                                                </span>
                                                            </div>

                                                        : <div className="pagination">
                                                            <span>
                                                                <Link to={`/gallery/page/${currentPageNumber - 1}`}>← Previous Page</Link>
                                                            </span>
                                                            <span>
                                                                <Link to={`/gallery/page/${currentPageNumber + 1}`}>Next Page →</Link>
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

const mapStateToProps = (state, ownProps) => ({galleries: state.gallery.galleries, isLoaded: state.gallery.isLoaded});

export default connect(mapStateToProps, null)(GalleryPage);