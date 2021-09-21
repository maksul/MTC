import {SRLWrapper} from 'simple-react-lightbox';
import NoImage from '../images/image-not-found.png';
import '../styles/Gallery.css';
// import moment from 'moment';

const AllGalleriesRender = ({galleries}) => {

    const galleryOptions = {
        settings: {
            overlayColor: "rgba(1, 104, 103, 0.85)",
            autoplaySpeed: 3000,
            transitionSpeed: 1200
        },
        buttons: {
            showDownloadButton: false
        }
    }

    function handleImgError(e) {
        const {id} = this;
        const skel = document.querySelector(`.skeleton-loader-${id}`);
        e.target.src = NoImage;
        e.onerror = null;
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

    if (galleries.length === 0) {
        return (
            <b>No Gallery.</b>
        )
    } else {
        return (
            <SRLWrapper options={galleryOptions}>
                <ul className="gallery-wrapper">{galleries.map((gallery, idx) => (
                        <li key={gallery._id} className="gallery-box">
                            <div
                                className={`skeleton-loader gallery-skeleton skeleton-loader-${gallery
                                ._id
                                .slice(-3)}`}></div>
                            <img
                                src={gallery.cover_img}
                                alt={gallery.caption || 'Not Available'}
                                onLoad={handleImgLoad.bind({
                                id: gallery
                                    ._id
                                    .slice(-4)
                            })}
                                onError={handleImgError.bind({
                                id: gallery
                                    ._id
                                    .slice(-4)
                            })}/>
                        </li>
                    ))
}
                </ul>
            </SRLWrapper>
        )
    }
}

export default AllGalleriesRender;
