import {useState} from 'react';
import {connect} from 'react-redux';
import {addGallery, resetGalleryCreated, updateGallery, resetGalleryUpdated, deleteGallery, resetGalleryDeleted} from './../../reduxstore/actions/galleryActions';
import WithAdminAuth from '../../layouts/WithAdminAuth';
import AssetView from './../../components/AssetView';
import Swal from 'sweetalert2';
import Select from 'react-select';
import moment from 'moment';
import '../../styles/AdminManageGallery.css';

const ManageGallery = (props) => {
    const [galleryCaption,
        setGalleryCaption] = useState('');
    const [galleryImage,
        setGalleryImage] = useState('');
    const [isCreating,
        setIsCreating] = useState(false);
    const [isEditing,
        setIsEditing] = useState(false);
    const [isDeleting,
        setIsDeleting] = useState(false);
    const [shouldEditGallery,
        setShouldEditGallery] = useState(false);
    const [selectedGallery,
        setSelectedGallery] = useState(null);
    const [selectedGalleryInfo,
        setSelectedGalleryInfo] = useState({});

    if (props.isGalleryCreated) {
        Swal
            .fire({title: "", text: `Gallery successfully created.`, icon: "success"})
            .then(res => {
                setGalleryCaption('');
                setGalleryImage('');
                setIsCreating(false);
            });
        props.resetGalleryCreated();
    }

    if (props.isGalleryUpdated) {
        Swal
            .fire({title: "", text: `Gallery successfully updated.`, icon: "success"})
            .then(res => {;
                setShouldEditGallery(false);
                setGalleryCaption('');
                setGalleryImage('');
                setSelectedGallery(null);
                setIsEditing(false);
            });
        props.resetGalleryUpdated();
    }

    if (props.isGalleryDeleted) {
        Swal
            .fire({title: "", text: `Gallery successfully updated.`, icon: "success"})
            .then(res => {;
                setSelectedGallery(null);
                setIsDeleting(false);
            });
        props.resetGalleryDeleted();
    }

    const handleAddGalleryInput = e => {
        const {name, value} = e.target;
        switch (name) {
            case 'gallery-caption':
                setGalleryCaption(value);
                break;
            case 'gallery-image':
                setGalleryImage(value);
                break;
            default:
        }
    }

    const handleAddGalleryBtn = () => {
        setIsCreating(true);
        if (!galleryCaption || !galleryImage) {
            setIsCreating(false);
            Swal.fire({title: "", text: `The "Caption" and "Image" fields must be provided.`, icon: "error"});
        } else {
            Swal
                .fire({title: 'Do you want to add?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Add`, denyButtonText: `Don't add`})
                .then((result) => {
                    if (result.isConfirmed) {
                        const newGallery = {
                            caption: galleryCaption,
                            cover_img: galleryImage
                        };
                        props.addGallery(newGallery);
                    } else if (result.isDenied) {
                        setIsCreating(false);
                        setGalleryCaption('');
                        setGalleryImage('');
                        Swal.fire('Gallery not added', '', 'info')
                    } else {
                        setIsCreating(false);
                    }
                })
        }
    }

    const handleEditGalleryBtn = () => {
        if (!galleryCaption || !galleryImage) {
            setIsCreating(false);
            Swal.fire({title: "", text: `The "Caption" and "Image" fields must be provided.`, icon: "error"});
        } else {
            setIsEditing(true);
            Swal
                .fire({title: 'Do you want to edit?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Edit`, denyButtonText: `Don't edit`})
                .then((result) => {
                    if (result.isConfirmed) {
                        const updatedGallery = {
                            caption: galleryCaption,
                            cover_img: galleryImage
                        };
                        props.updateGallery(selectedGalleryInfo._id, updatedGallery);
                    } else if (result.isDenied) {
                        setIsEditing(false);
                        setGalleryCaption('');
                        setGalleryImage('');
                        Swal.fire('Gallery not edited', '', 'info')
                    } else {
                        setIsEditing(false);
                    }
                })
        }
    }

    const handleGalleryCancelBtn = () => {
        setGalleryCaption('');
        setGalleryImage('');
        setShouldEditGallery(false);
        setSelectedGallery(null);
    }

    const handleGalleryEdit = e => {
        if (!selectedGallery) {
            // no gallery is selected
            Swal.fire({title: "No gallery item selected.", text: `Please select a gallery item.`, icon: "error"})
        } else {
            // gallery is selected
            const fullSelectedGallery = props
                .galleries
                .filter(x => x._id === selectedGallery.value)[0];
            setSelectedGalleryInfo(fullSelectedGallery);
            setShouldEditGallery(true);
            setGalleryCaption(fullSelectedGallery.caption);
            setGalleryImage(fullSelectedGallery.cover_img);
        }
    }

    const handleGalleryDelete = () => {
        setIsDeleting(true);
        if (!selectedGallery) {
            // no page is selected
            setIsDeleting(false);
            Swal.fire({title: "No gallery item selected.", text: `Please select a gallery item.`, icon: "error"});
        } else {
            // page is selected
            Swal
                .fire({title: 'Do you want to delete?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Delete`, denyButtonText: `Don't delete`})
                .then((result) => {
                    if (result.isConfirmed) {
                        props.deleteGallery(selectedGallery.value);
                    } else if (result.isDenied) {
                        setIsDeleting(false);
                        setSelectedGallery(null);
                        Swal.fire('Gallery Not Deleted', '', 'info')
                    }
                })
        }

    }

    const handleGallerySelectInputChange = option => {
        setSelectedGallery(option
            ? option
            : null);
    }

    return (
        <WithAdminAuth>
            {props.isAuthenticated && <div className="ap-main-section">
                <div className="ap-box">
                    <h2>Manage Gallery</h2>
                </div>
                <div className="ap-box">
                    <AssetView/>
                </div>
                {!shouldEditGallery && <div className="ap-box">
                    <h3>Add to Gallery</h3>

                    <div className="add-to-gallery-form">
                        <div>
                            <label htmlFor="gallery-caption">Caption</label>
                            <input
                                type="text"
                                name="gallery-caption"
                                id="gallery-caption"
                                value={galleryCaption}
                                onChange={handleAddGalleryInput}/>
                        </div>

                        <div>
                            <label htmlFor="gallery-image">Image&nbsp;<small>(Link)</small>
                            </label>
                            <input
                                type="text"
                                name="gallery-image"
                                id="gallery-image"
                                value={galleryImage}
                                onChange={handleAddGalleryInput}/>
                        </div>
                        <div
                            style={{
                            marginTop: "1.5rem"
                        }}>
                            <button
                                className="primary-btn"
                                disabled={isCreating}
                                onClick={handleAddGalleryBtn}>{isCreating
                                    ? 'Add...'
                                    : 'Add'}&nbsp;to Gallery</button>
                        </div>
                    </div>

                </div>}

                <div className="ap-box">
                    <h3>Edit or Delete from Gallery</h3>
                    <p>Select the gallery item you want to edit or delete.</p>
                    {(props.isLoaded && !shouldEditGallery) && <div className="edit-page-container">
                        <div className="page-select-wrapper">
                            <Select
                                className="asset-form-select"
                                defaultValue={selectedGallery}
                                value={selectedGallery}
                                options={props
                                .galleries
                                .map(({caption, _id, created_at}) => ({
                                    value: _id,
                                    label: `${caption} (${moment(created_at).format('MMM DD, YYYY')})`,
                                    caption
                                }))}
                                onChange={handleGallerySelectInputChange}
                                isClearable={true}
                                isSearchable={true}
                                placeholder={`Select a gallery item...`}
                                styles={{
                                menu: (provided, state) => ({backgroundColor: "var(--primary-color-light)", border: "1px solid var(--primary-color"}),
                                option: (styles, {isSelected}) => {
                                    return {
                                        ...styles,
                                        backgroundColor: isSelected
                                            ? 'var(--secondary-color) !important'
                                            : null
                                    }
                                }
                            }}/>
                        </div>
                        <div className="edit-page-action-btns">
                            <button className="page-edit-btn page-btn" onClick={handleGalleryEdit}>Edit</button>
                            <button
                                className="page-delete-btn page-btn"
                                disabled={isDeleting}
                                onClick={handleGalleryDelete}>{isDeleting
                                    ? 'Deleting...'
                                    : 'Delete'}</button>
                        </div>
                    </div>
}

                    {shouldEditGallery && <h4>Edit "{selectedGalleryInfo.caption}".</h4>}

                    {shouldEditGallery && <div className="add-to-gallery-form">
                        <div>
                            <label htmlFor="gallery-caption">Caption</label>
                            <input
                                type="text"
                                name="gallery-caption"
                                id="gallery-caption"
                                value={galleryCaption}
                                onChange={handleAddGalleryInput}/>
                        </div>

                        <div>
                            <label htmlFor="gallery-image">Image&nbsp;<small>(Link)</small>
                            </label>
                            <input
                                type="text"
                                name="gallery-image"
                                id="gallery-image"
                                value={galleryImage}
                                onChange={handleAddGalleryInput}/>
                        </div>
                        <div
                            style={{
                            marginTop: "1.5rem"
                        }}>
                            <button
                                className="primary-btn"
                                disabled={isEditing}
                                onClick={handleEditGalleryBtn}>{isEditing
                                    ? 'Editing...'
                                    : 'Edit'}&nbsp;Gallery</button>
                            <button className="page-cancel-btn page-btn" onClick={handleGalleryCancelBtn}>Cancel</button>
                        </div>
                    </div>}
                </div>

            </div>}
        </WithAdminAuth>
    )
}

const mapStateToProps = state => ({galleries: state.gallery.galleries, isAuthenticated: state.auth.isAuthenticated, isGalleryCreated: state.gallery.isGalleryCreated, isGalleryUpdated: state.gallery.isGalleryUpdated, isGalleryDeleted: state.gallery.isGalleryDeleted, isLoaded: state.gallery.isLoaded});

export default connect(mapStateToProps, {addGallery, resetGalleryCreated, deleteGallery, resetGalleryDeleted, updateGallery, resetGalleryUpdated})(ManageGallery);
