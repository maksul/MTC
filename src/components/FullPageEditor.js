import {useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, ContentState, convertToRaw, Modifier} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {strToSlug} from './../helper';
import {addPage, updatePage, resetPageCreated, resetPageUpdated} from './../reduxstore/actions/pageActions';
import {clearErrors} from '../reduxstore/actions/errorActions';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import '../styles/FullPageEditor.css';

const CustomOption = props => {

    const addASCL = () => {
        const {editorState, onChange} = props;
        const contentState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), 'ASCL', editorState.getCurrentInlineStyle());
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));

    }

    return (
        <div onClick={addASCL}>ASCL</div>
    )
}

const FullPageEditor = (props) => {
    const {
        selectedType,
        setSelectedType,
        purpose,
        currentUsername,
        addPage,
        isPageCreated,
        resetPageCreated,
        clearErrors,
        errorMsg,
        selectedPageInfo,
        setSelectedPageInfo,
        setShouldEditPage,
        setSelectedPage,
        updatePage,
        selectedPage,
        resetPageUpdated,
        isPageUpdated
    } = props;

    const [editorTitle,
        setEditorTitle] = useState(selectedPageInfo
        ? selectedPageInfo.title
        : '');
    const [editorSlug,
        setEditorSlug] = useState(selectedPageInfo
        ? selectedPageInfo.slug
        : '');
    const [editorCoverImg,
        setEditorCoverImg] = useState(selectedPageInfo
        ? selectedPageInfo.cover_img
        : '');
    const [editorBody,
        setEditorBody] = useState(selectedPageInfo
        ? selectedPageInfo.body
        : '');

    const [editorState,
        setEditorState] = useState(selectedPageInfo
        ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(selectedPageInfo.body).contentBlocks))
        : EditorState.createEmpty());

    const [isCreating,
        setIsCreating] = useState(false);
    const [isUpdating,
        setIsUpdating] = useState(false);

    if (purpose === "page-create") {
        if (isPageCreated) {
            Swal
                .fire({title: "", text: `Post successfully created.`, icon: "success"})
                .then(res => {
                    setSelectedType('');
                    setIsCreating(false);
                });
            resetPageCreated();
        }

        if (errorMsg.errorType && errorMsg.errorType === "TITLE_ALREADY_EXISTS") {
            Swal
                .fire({title: "Page already exists.", text: `A page with the same title "${editorTitle}" already exists."`, icon: "error"})
                .then(res => {
                    setIsCreating(false);
                });
            clearErrors();
        }

    }

    if (purpose === "page-edit") {
        if (isPageUpdated) {
            Swal
                .fire({title: "", text: `Post successfully updated.`, icon: "success"})
                .then(res => {;
                    setShouldEditPage(false);
                    setSelectedType('');
                    setSelectedPage(null);
                    setIsUpdating(false);
                });
            resetPageUpdated();
        }
    }

    const handleInputChange = e => {
        const {name, value} = e.target;

        switch (name) {
            case 'editor-title':
                setEditorTitle(value);
                setEditorSlug(strToSlug(value));
                break;
            case 'editor-slug':
                setEditorSlug(strToSlug(value));
                break;
            case 'editor-cover-img':
                setEditorCoverImg(value);
                break;
            default:
        }
    }

    const handleBodyEditorChange = editorState => {
        setEditorState(editorState);
        setEditorBody(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    const handleEditorBtnClick = e => {
        if (purpose === 'page-create') {
            setIsCreating(true);
            if (!editorTitle || !editorSlug || !editorCoverImg || !editorBody) {
                setIsCreating(false);
                Swal.fire({title: "", text: `The "Title", "Slug", "Cover Image", and "Body" fields must be provided.`, icon: "error"});
            } else {
                Swal
                    .fire({title: 'Do you want to create?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Create`, denyButtonText: `Don't create`})
                    .then((result) => {
                        if (result.isConfirmed) {
                            const newPage = {
                                title: editorTitle,
                                slug: editorSlug,
                                cover_img: editorCoverImg,
                                body: editorBody,
                                author_username: currentUsername,
                                category: selectedType
                            };
                            addPage(newPage);
                        } else if (result.isDenied) {
                            setSelectedType('');
                            setIsCreating(false);
                            Swal.fire('Page Not Created', '', 'info')
                        }
                    })
            }

        } else if (purpose === 'page-edit') {
            setIsUpdating(true);
            if (!editorTitle || !editorSlug || !editorCoverImg || !editorBody) {
                setIsUpdating(false);
                Swal.fire({title: "", text: `The "Title", "Slug", "Cover Image", and "Body" fields must be provided.`, icon: "error"});
            } else {
                Swal
                    .fire({title: 'Do you really want to edit?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Edit`, denyButtonText: `Don't edit`})
                    .then((result) => {
                        if (result.isConfirmed) {
                            const updatedPage = {
                                title: editorTitle,
                                slug: editorSlug,
                                cover_img: editorCoverImg,
                                body: editorBody,
                                author_username: currentUsername,
                                category: selectedType
                            };

                            updatePage(selectedPage.value, updatedPage);

                        } else if (result.isDenied) {
                            setSelectedType('');
                            setSelectedPageInfo({});
                            setShouldEditPage(false);
                            setSelectedPage(null);
                            Swal.fire('Page Not Edited', '', 'info')
                        }
                    })
            }
        }
    }

    const handleEditorCancelBtnClick = () => {
        if (purpose === 'page-create') {
            setSelectedType('');
        } else if (purpose === 'page-edit') {
            setSelectedPageInfo({});
            setShouldEditPage(false);
            setSelectedType('');
            setSelectedPage(null);
            setIsUpdating(false);
        }
    }

    return (
        <div className="full-page-editor">
            <div>
                <div className="editor-title-wrapper">
                    <label htmlFor="editor-title">Title</label>
                    <input
                        type="text"
                        name="editor-title"
                        id="editor-title"
                        value={editorTitle}
                        onChange={handleInputChange}/>
                </div>
                <div className="editor-slug-wrapper">
                    <label htmlFor="editor-slug">Slug
                        <small>(Auto-generated)</small>
                    </label>
                    <input
                        type="text"
                        name="editor-slug"
                        id="editor-slug"
                        value={editorSlug}
                        disabled={true}
                        onChange={handleInputChange}/>
                </div>
            </div>
            <div className="editor-cover-img-wrapper">
                <label htmlFor="editor-cover-img">Cover Image
                    <small>(Link)</small>
                </label>
                <input
                    type="text"
                    name="editor-cover-img"
                    id="editor-cover-img"
                    value={editorCoverImg}
                    onChange={handleInputChange}/>
            </div>
            <div className="editor-body">
                <label>Body</label>
                <Editor
                    editorState={editorState}
                    wrapperClassName="body-editor-wrapper"
                    editorClassName="body-editor-input"
                    onEditorStateChange={handleBodyEditorChange}
                    placeholder={"Start typing..."}
                    toolbarCustomButtons={[< CustomOption />]}/>
            </div>

            <div className="full-page-editor-buttons">
                <button
                    className="full-page-editor-btn-1"
                    disabled={purpose === 'page-create'
                    ? isCreating
                    : purpose === 'page-edit'
                        ? isUpdating
                        : false}
                    onClick={handleEditorBtnClick}>{((purpose === 'page-create') && !isCreating)
                        ? 'Create'
                        : ((purpose === 'page-create') && isCreating)
                            ? 'Creating...'
                            : ((purpose === 'page-edit') && !isUpdating)
                                ? 'Edit'
                                : ((purpose === 'page-edit') && isUpdating)
                                    ? 'Editing...'
                                    : ''} {selectedType.replace('-', ' ')}</button>
                <button
                    className="page-cancel-btn page-btn"
                    onClick={handleEditorCancelBtnClick}>Cancel</button>
            </div>

        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({currentUsername: state.auth.user.username, isPageCreated: state.page.isPageCreated, errorMsg: state.error.message, isPageUpdated: state.page.isPageUpdated});

export default connect(mapStateToProps, {addPage, updatePage, resetPageCreated, resetPageUpdated, clearErrors})(FullPageEditor);