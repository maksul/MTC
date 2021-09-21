import {useState} from 'react';
import {connect} from 'react-redux';
import {deletePage, resetPageDeleted} from './../../reduxstore/actions/pageActions';
import WithAdminAuth from '../../layouts/WithAdminAuth';
import FullPageEditor from '../../components/FullPageEditor';
import Select from 'react-select';
import AssetView from '../../components/AssetView';
import moment from 'moment';
import Swal from 'sweetalert2';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../styles/AdminManagePage.css'

const ManagePage = (props) => {

    const [createPageType,
        setCreatePageType] = useState('');
    const [editPageType,
        setEditPageType] = useState('');

    const [selectedPage,
        setSelectedPage] = useState(null);

    const [selectedPageInfo,
        setSelectedPageInfo] = useState({});
    const [shouldEditPage,
        setShouldEditPage] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const handleCreatePageTypeSelectChange = e => {
        setCreatePageType(e.target.value);
    }

    const handleEditPageTypeSelectChange = e => {
        setEditPageType(e.target.value);
    }

    const handlePageSelectInputChange = option => {
        setSelectedPage(option
            ? option
            : null);
    }

    const handlePageCancelBtn = e => {
        setEditPageType('');
        setSelectedPage(null);
    }

    const requiredPages = props
        .pages
        .filter(page => page.category === editPageType);

    const handlePageEdit = e => {
        if (!selectedPage) {
            // no page is selected
            Swal.fire({title: "No page selected.", text: `Please select a page.`, icon: "error"})
        } else {
            // page is selected
            const fullSelectedPage = requiredPages.filter(x => x._id === selectedPage.value)[0];
            setSelectedPageInfo(fullSelectedPage);
            setShouldEditPage(true);
        }
    }

    const handlePageDelete = () => {
        setIsDeleting(true);
        if (!selectedPage) {
            // no page is selected
            setIsDeleting(false);
            Swal.fire({title: "No page selected.", text: `Please select a page.`, icon: "error"});
        } else {
            // page is selected
            Swal
                .fire({title: 'Do you want to delete?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Delete`, denyButtonText: `Don't delete`})
                .then((result) => {
                    if (result.isConfirmed) {
                        props.deletePage(selectedPage.value);
                    } else if (result.isDenied) {
                        setSelectedPage(null);
                        Swal.fire('Page Not Deleted', '', 'info')
                    }
                })
        }

    }

    if (props.isPageDeleted) {
        Swal
            .fire({title: "", text: `Page successfully updated.`, icon: "success"})
            .then(res => {;
                setSelectedPage(null);
                setEditPageType('');
                setIsDeleting(false);
            });
        props.resetPageDeleted();
    }

    return (
        <WithAdminAuth>
            {props.isAuthenticated && <div className="ap-main-section">
                <div className="ap-main-section-header ap-box">
                    <h2>Manage Page</h2>
                </div>

                <div className="ap-box">
                    <AssetView/>
                </div>

                <div className="ap-box">
                    <h3>Create Page</h3>
                    <p>Select the type of page you what to create below.</p>
                    <div>
                        <select
                            name="create-page-type-select"
                            id="create-page-type-select"
                            onChange={handleCreatePageTypeSelectChange}
                            className="page-type-select"
                            value={createPageType}
                            disabled={createPageType
                            ? true
                            : false}>
                            <option value="">--select page type--</option>
                            <option value="news">News</option>
                            <option value="press-release">Press Release</option>
                        </select>
                    </div>

                    {createPageType && <div className="create-page-container">
                        <h4>Create a new {createPageType
                                .replace('-', ' ')
                                .toUpperCase()}&nbsp;page</h4>
                        <FullPageEditor
                            setSelectedType={setCreatePageType}
                            selectedType={createPageType}
                            purpose={"page-create"}/>
                    </div>}

                </div>

                <div className="ap-box">
                    <h3>Edit or Delete Page</h3>
                    <div>
                        <select
                            name="edit-page-type-select"
                            id="edit-page-type-select"
                            onChange={handleEditPageTypeSelectChange}
                            className="page-type-select"
                            value={editPageType}
                            disabled={editPageType
                            ? true
                            : false}>
                            <option value="">--select page type--</option>
                            <option value="news">News</option>
                            <option value="press-release">Press Release</option>
                        </select>

                    </div>

                    {editPageType && <div className="edit-page-container">

                        {(props.isLoaded && !shouldEditPage) && <div className="edit-page-container">
                            <h4>Select the {editPageType.replace('-', ' ')}&nbsp;page.</h4>
                            <div className="page-select-wrapper">
                                <Select
                                    className="asset-form-select"
                                    defaultValue={selectedPage}
                                    value={selectedPage}
                                    options={requiredPages.map(({title, _id, created_at}) => ({
                                    value: _id,
                                    label: `${title} (${moment(created_at).format('MMM DD, YYYY')})`,
                                    title
                                }))}
                                    onChange={handlePageSelectInputChange}
                                    isClearable={true}
                                    isSearchable={true}
                                    placeholder={`Select a ${editPageType} page...`}
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
                                <button className="page-edit-btn page-btn" onClick={handlePageEdit}>Edit</button>
                                <button className="page-delete-btn page-btn" disabled={isDeleting} onClick={handlePageDelete}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
                                <button className="page-cancel-btn page-btn" onClick={handlePageCancelBtn}>Cancel</button>
                            </div>
                        </div>
}

                        {shouldEditPage && <h4>Edit "{selectedPageInfo.title}".</h4>}

                        {shouldEditPage && <FullPageEditor
                            setSelectedType={setEditPageType}
                            selectedType={editPageType}
                            purpose={"page-edit"}
                            selectedPageInfo={selectedPageInfo}
                            setSelectedPageInfo={setSelectedPageInfo}
                            setShouldEditPage={setShouldEditPage}
                            setSelectedPage={setSelectedPage}
                            selectedPage={selectedPage}/>}
                    </div>}

                </div>

            </div>}
        </WithAdminAuth>
    )
}

const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, pages: state.page.pages, isLoaded: state.page.isLoaded, isPageDeleted: state.page.isPageDeleted});

export default connect(mapStateToProps, {deletePage, resetPageDeleted})(ManagePage);
