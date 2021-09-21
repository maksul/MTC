import {Fragment, useState} from 'react';
import Select from 'react-select';
import moment from 'moment';
import {connect} from 'react-redux';
import {convertByteInString} from '../helper';
import Swal from 'sweetalert2';
import {deleteAsset} from '../reduxstore/actions/assetActions';

const DeleteAsset = (props) => {
    const [selectedAsset,
        setSelectedAsset] = useState(null);
    const [isDeleting,
        setIsDeleting] = useState(false);

    const {assetType} = props;

    const handleAssetSelectInputChange = option => {
        setSelectedAsset(option
            ? option
            : null);
    }

    const handleAssetDelete = () => {
        // setIsDeleting(true);
        if (!selectedAsset) {
            // no page is selected
            setIsDeleting(false);
            Swal.fire({title: `No ${assetType.toLowerCase()} selected.`, text: `Please select a ${assetType.toLowerCase()}.`, icon: "error"});
        } else {
            // page is selected
            Swal
                .fire({title: 'Do you want to delete?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Delete`, denyButtonText: `Don't delete`})
                .then((result) => {
                    if (result.isConfirmed) {
                        setIsDeleting(true);
                        // props.deleteFaq(selectedFaq.value);
                        const storageRef = props
                            .firebaseStorage
                            .ref(selectedAsset.value);
                        storageRef
                            .delete()
                            .then(() => {
                                props.deleteAsset(selectedAsset.fileInfo._id);
                                Swal.fire({title: "", text: `"${selectedAsset.value}" has been uploaded successfully.`, icon: "success", buttons: false});
                                setSelectedAsset(null);
                                setIsDeleting(false);
                            })
                            .catch(error => {
                                Swal.fire({title: "Opps", text: `"Something went wrong. Try again.`, icon: "error", buttons: false});
                                console.log('ASSET DELETE ERROR: ', error);
                                setSelectedAsset(null);
                                setIsDeleting(false);
                            })
                    } else if (result.isDenied) {
                        setIsDeleting(false);
                        setSelectedAsset(null);
                        Swal.fire('Asset Not Deleted', '', 'info')
                    }
                })
        }
    }

    return (
        <Fragment>
            <div className="edit-page-container">
                <div className="page-select-wrapper">
                    <Select
                        className="asset-form-select"
                        defaultValue={selectedAsset}
                        value={selectedAsset}
                        options={props
                        .assets
                        .filter(x => x.category === assetType.toLowerCase())
                        .map(({
                            _id,
                            name,
                            url,
                            file_assetType,
                            size,
                            category,
                            created_at
                        }) => ({
                            value: name,
                            label: `${name} [Size: ${convertByteInString(size)}] (${moment(created_at).format('MMM DD, YYYY')})`,
                            fileInfo: {
                                _id,
                                name,
                                url,
                                file_assetType,
                                size,
                                category,
                                created_at
                            }
                        }))}
                        onChange={handleAssetSelectInputChange}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={`Select a ${assetType}...`}
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
                    <button
                        className="page-delete-btn page-btn"
                        disabled={isDeleting}
                        onClick={handleAssetDelete}>{isDeleting
                            ? 'Deleting...'
                            : 'Delete'}</button>
                </div>
            </div>

        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({assets: state.asset.assets, isLoaded: state.asset.isLoaded, firebaseStorage: state.fire.firebaseStorage});

export default connect(mapStateToProps, {deleteAsset})(DeleteAsset);
