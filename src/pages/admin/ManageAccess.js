import {useState} from 'react';
import {connect} from 'react-redux';
import {addAccess, resetAccessCreated, deleteAccess, resetAccessDeleted} from './../../reduxstore/actions/accessActions';
import WithAdminAuth from '../../layouts/WithAdminAuth';
import Swal from 'sweetalert2';
import Select from 'react-select';
import moment from 'moment';

const ManageAccess = (props) => {
    const [accessName,
        setAccessName] = useState('');
    const [accessKey,
        setAccessKey] = useState('');
    const [isCreating,
        setIsCreating] = useState(false);
    const [isDeleting,
        setIsDeleting] = useState(false);
    const [selectedAccess,
        setSelectedAccess] = useState(null);

    if (props.isAccessCreated) {
        Swal
            .fire({title: "", text: `Access successfully created.`, icon: "success"})
            .then(res => {
                setAccessName('');
                setAccessKey('');
                setIsCreating(false);
            });
        props.resetAccessCreated();
    }

    if (props.isAccessDeleted) {
        Swal
            .fire({title: "", text: `Access successfully updated.`, icon: "success"})
            .then(res => {;
                setSelectedAccess(null);
                setIsDeleting(false);
            });
        props.resetAccessDeleted();
    }

    const handleAddAccessInput = e => {
        const {name, value} = e.target;
        switch (name) {
            case 'access-name':
                setAccessName(value);
                break;
            case 'access-key':
                setAccessKey(value);
                break;
            default:
        }
    }

    const handleAddAccessBtn = () => {
        setIsCreating(true);
        if (!accessName || !accessKey) {
            setIsCreating(false);
            Swal.fire({title: "", text: `The "Access Name" and "Access Key" fields must be provided.`, icon: "error"});
        } else {
            Swal
                .fire({title: 'Do you want to add?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Add`, denyButtonText: `Don't add`})
                .then((result) => {
                    if (result.isConfirmed) {
                        const newAccess = {
                            access_name: accessName,
                            access_key: accessKey,
                            created_by: props.user.username
                        };
                        props.addAccess(newAccess);
                    } else if (result.isDenied) {
                        setIsCreating(false);
                        setAccessName('');
                        setAccessKey('');
                        Swal.fire('Access not added', '', 'info')
                    }
                })
        }
    }

    const handleAccessDelete = () => {
        setIsDeleting(true);
        if (!selectedAccess) {
            // no page is selected
            setIsDeleting(false);
            Swal.fire({title: "No access selected.", text: `Please select a access.`, icon: "error"});
        } else {
            // page is selected
            Swal
                .fire({title: 'Do you want to delete?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Delete`, denyButtonText: `Don't delete`})
                .then((result) => {
                    if (result.isConfirmed) {
                        props.deleteAccess(selectedAccess.value);
                    } else if (result.isDenied) {
                        setIsDeleting(false);
                        setSelectedAccess(null);
                        Swal.fire('Access Not Deleted', '', 'info')
                    }
                })
        }

    }

    const handleAccessSelectInputChange = option => {
        setSelectedAccess(option
            ? option
            : null);
    }

    return (
        <WithAdminAuth>
            {props.isAuthenticated && <div className="ap-main-section">
                <div className="ap-box">
                    <h2>Manage Access</h2>
                </div>
                <div className="ap-box">
                    <h3>Add Access</h3>

                    <div className="add-to-gallery-form">
                        <div>
                            <label htmlFor="access-name">Access Name</label>
                            <input
                                type="text"
                                name="access-name"
                                id="access-name"
                                value={accessName}
                                onChange={handleAddAccessInput}/>
                        </div>

                        <div>
                            <label htmlFor="access-key">Access Key&nbsp;<small>(Link)</small>
                            </label>
                            <input
                                type="text"
                                name="access-key"
                                id="access-key"
                                value={accessKey}
                                onChange={handleAddAccessInput}/>
                        </div>
                        <div
                            style={{
                            marginTop: "1.5rem"
                        }}>
                            <button
                                className="primary-btn"
                                disabled={isCreating}
                                onClick={handleAddAccessBtn}>{isCreating
                                    ? 'Add...'
                                    : 'Add'}&nbsp;Access</button>
                        </div>
                    </div>

                </div>

                <div className="ap-box">
                    <h3>Delete Access</h3>
                    <p>Select the access you want to delete.</p>
                    {props.isLoaded && <div className="edit-page-container">
                        <div className="page-select-wrapper">
                            <Select
                                className="asset-form-select"
                                defaultValue={selectedAccess}
                                value={selectedAccess}
                                options={props
                                .accesses
                                .map(({access_name, _id, is_valid, created_by, created_at}) => ({
                                    value: _id,
                                    label: `${access_name} [${is_valid ? 'Valid' : 'Not Valid'}] (by @${created_by}) (${moment(created_at).format('MMM DD, YYYY')})`,
                                    access_name
                                }))}
                                onChange={handleAccessSelectInputChange}
                                isClearable={true}
                                isSearchable={true}
                                placeholder={`Select a access...`}
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
                                onClick={handleAccessDelete}>{isDeleting
                                    ? 'Deleting...'
                                    : 'Delete'}</button>
                        </div>
                    </div>
}
                </div>

            </div>}
        </WithAdminAuth>
    )
}

const mapStateToProps = state => ({user: state.auth.user, accesses: state.access.accesses, isAuthenticated: state.auth.isAuthenticated, isAccessCreated: state.access.isAccessCreated, isAccessDeleted: state.access.isAccessDeleted, isLoaded: state.access.isLoaded});

export default connect(mapStateToProps, {addAccess, resetAccessCreated, deleteAccess, resetAccessDeleted})(ManageAccess);
