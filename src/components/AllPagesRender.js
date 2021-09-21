import {Link} from 'react-router-dom';
import NoImage from '../images/image-not-found.png';
// import moment from 'moment';

const AllPagesRender = ({pages, category}) => {
    const pgCatLinkHead = category === "news"
        ? "news"
        : category === "press-release"
            ? "press-releases"
            : "";

    function handleImgError(e) {
        const {id} = this;
        e.target.src = NoImage;
        e.onerror = null;
        const skel = document.querySelector(`.skeleton-loader-${id}`);
        if (skel) {
            skel.style.display = "none";
        }

    }

    function handleImgLoad() {
        const {id} = this;
        const skel = document.querySelector(`.skeleton-loader-${id}`);
        if (skel) {
            skel.style.display = "none";
        }
    }

    if (pages.length === 0) {
        return (
            <b>No Posts.</b>
        )
    } else {
        return (
            <div>{pages.map((page, idx) => (
                    <Link to={`/${pgCatLinkHead}/${page.slug}`}>

                        <article key={page._id} className="page-box">
                            <div className="page-box-left">
                                <div
                                    className={`skeleton-loader skeleton-loader-${page
                                    ._id
                                    .slice(-4)}`}></div>
                                <Link to={`/${pgCatLinkHead}/${page.slug}`}>
                                    <div className="pb-img-wrapper">
                                        <img
                                            src={page.cover_img}
                                            alt=""
                                            onLoad={handleImgLoad.bind({
                                            id: page
                                                ._id
                                                .slice(-4)
                                        })}
                                            onError={handleImgError.bind({
                                            id: page
                                                ._id
                                                .slice(-4)
                                        })}/>
                                    </div>
                                </Link>
                            </div>
                            <div className='page-box-right'>
                                <Link to={`/${pgCatLinkHead}/${page.slug}`}>{page.title}</Link>
                            </div>

                        </article>
                    </Link>
                ))
}</div>
        )
    }
}

export default AllPagesRender;
