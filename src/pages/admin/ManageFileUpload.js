import {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {logout} from './../../reduxstore/actions/authActions';
import WithAdminAuth from '../../layouts/WithAdminAuth';
import UploadProgressBar from './../../components/UploadProgressBar';
import {getAcceptValue, getFileExtension, renameFileWithPrefix, convertByteInString} from '../../helper';
import '../../styles/AdminPortalGlobal.css';
import SimpleReactValidator from 'simple-react-validator';
import DeleteAsset from '../../components/DeleteAsset';

const ManageFileUpload = (props) => {

    const [photo,
        setPhoto] = useState(null);
    const [video,
        setVideo] = useState(null);
    const [document,
        setDocument] = useState(null);
    const [startPhotoUpload,
        setStartPhotoUpload] = useState(false);
    const [startVideoUpload,
        setStartVideoUpload] = useState(false);
    const [startDocumentUpload,
        setStartDocumentUpload] = useState(false);
    const [,
        forceUpdate] = useState();

    //instantiate the validator as a singleton
    const simpleValidator = useRef(new SimpleReactValidator({
        element: (message, className) => <div className={'formErrorMsg'}>{message}</div>,
        validators: {
            validFileType: {
                message: 'Selected file is not a valid :attribute type. It must have a MIME type of either :val' +
                        'idTypes',
                rule: (val, params, validator) => params.includes(val.type),
                messageReplace: (message, params) => message.replace(":validTypes", `(${params.join(' OR ')}).`),
                required: true
            },
            belowMaxSize: {
                message: 'Selected file should not be more that :maxFileSize',
                rule: (val, params, validator) => val.size <= params,
                messageReplace: (message, params) => message.replace(":maxFileSize", `${convertByteInString(params)}.`),
                required: true
            }
        }
    }));

    const ONE_MB = 1048576;

    const allowedPhoto = {
        types: [
            'image/png', 'image/jpeg', 'image/gif'
        ], //.png, .jpg, .gif
        ext: [
            '.png', '.jpg', '.gif'
        ],
        maxSize: 5 * ONE_MB, //5mb
    }

    const allowedVideo = {
        // .3gp, .mp4, .avi, .webm
        types: [
            'video/3gp', 'video/mp4', 'video/x-free-arc', 'video/webm'
        ],
        ext: [
            '.3gp', '.mp4', '.avi', '.webm'
        ],
        maxSize: 100 * ONE_MB
    }

    const allowedDocument = {
        // .pdf, .txt, .doc, .docx, .rtf, .ppt, .pptx
        types: [
            'application/pdf',
            'text/plain',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/rtf',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ],
        ext: [
            '.pdf',
            '.txt',
            '.doc',
            '.docx',
            '.rtf',
            '.ppt',
            '.pptx'
        ],
        maxSize: 50 * ONE_MB
    }

    const fileChangeHander = e => {
        const thisFile = e.target;
        const singleFile = thisFile.files[0];
        switch (thisFile.name) {
            case 'photo-upload-input':
                setPhoto(singleFile);
                break;
            case 'video-upload-input':
                setVideo(singleFile);
                break;
            case 'document-upload-input':
                setDocument(singleFile);
                break;
            default:
        }
    }

    const initiateUpload = e => {
        if (simpleValidator.current.allValid()) {
            // all validation is passing
            switch (e.target.id) {
                case 'photo-upload-btn':
                    setStartPhotoUpload(true);
                    break
                case 'video-upload-btn':
                    setStartVideoUpload(true);
                    break;
                case 'document-upload-btn':
                    setStartDocumentUpload(true);
                    break;
                default:
            }
        } else {
            // validation not passing
            simpleValidator
                .current
                .showMessages();
            forceUpdate(1);
        }
    }

    return (
        <WithAdminAuth>
            {props.isAuthenticated && <div className="ap-main-section">
                <div className="ap-main-section-header ap-box">
                    <h2>Manage File Upload</h2>
                </div>
                <div className="ap-box">All conditions on this page must be met before upload is initiated.</div>

                <div className="ap-box">
                    <h3>Upload Photos</h3>
                    <p>Click on the upload button below to upload a new photo.</p>
                    <p>
                        <b>NB:
                        </b>&nbsp;Photo should be either of the following types:
                        <i
                            style={{
                            color: "var(--secondary-color)"
                        }}>({allowedPhoto
                                .ext
                                .join(', ')})</i>. Photo file size should &nbsp;<b>not</b>&nbsp; be larger than
                        <i
                            style={{
                            color: "var(--secondary-color)"
                        }}>
                            &nbsp;{convertByteInString(allowedPhoto.maxSize)}</i>.</p>
                    <div className="file-input-container">
                        <label htmlFor="photo-upload-input" className="video-upload-select">
                            <i className="neu-attachment"></i>
                            {photo ? photo.name : "Select Photo"}</label>
                        <input
                            type="file"
                            name="photo-upload-input"
                            id="photo-upload-input"
                            onChange={fileChangeHander}
                            accept={getAcceptValue(allowedPhoto.ext, allowedPhoto.types)}/> {photo && <div>
                            <div>
                                {(photo && startPhotoUpload)
                                    ? <UploadProgressBar
                                            file={photo}
                                            setFile={setPhoto}
                                            setStartUpload={setStartPhotoUpload}
                                            category={"photo"}/>
                                    : null}
                            </div>
                            <div className="selected-file-info">
                                <h5>Selected File Info</h5>
                                <ul>
                                    <li>
                                        <span>Name:</span>
                                        <span>{photo.name}</span>
                                    </li>
                                    <li>
                                        <span>Autogenerated Name:</span>
                                        <span>{renameFileWithPrefix(photo.name)}</span>
                                    </li>
                                    <li>
                                        <span>Size:</span>
                                        <span>{convertByteInString(photo.size)}</span>
                                    </li>
                                    <li>
                                        <span>Extension:</span>
                                        <span>.{getFileExtension(photo.name)}</span>
                                    </li>
                                    <li>
                                        <span>MIME Type:</span>
                                        <span>{photo.type}</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('photo', photo, `required|validFileType:${allowedPhoto.types}|belowMaxSize:${allowedDocument.maxSize}`)
}
                                <button
                                    id="photo-upload-btn"
                                    className="photo-upload-btn"
                                    onClick={initiateUpload}>
                                    <i className="neu-upload"></i>
                                    Upload Photo</button>
                            </div>
                        </div>}
                    </div>

                </div>

                <div className="ap-box">
                    <h3>Upload Videos</h3>
                    <p>Click the upload button below to upload a new video.</p>
                    <p>
                        &nbsp;<b>NB:
                        </b>
                        &nbsp;Video should be either of the following types:
                        <i
                            style={{
                            color: "var(--secondary-color)"
                        }}>({allowedVideo
                                .ext
                                .join(', ')})</i>. Video file size should &nbsp;<b>not</b>&nbsp; be larger than
                        <i
                            style={{
                            color: "var(--secondary-color)"
                        }}>
                            &nbsp;{convertByteInString(allowedVideo.maxSize)}</i>.</p>
                    <div className="file-input-container">
                        <label htmlFor="video-upload-input" className="video-upload-select">
                            <span>
                                <i className="neu-attachment"></i>
                                {video
                                    ? video.name
                                    : "Select Video"}</span>
                        </label>
                        <input
                            type="file"
                            name="video-upload-input"
                            id="video-upload-input"
                            onChange={fileChangeHander}
                            accept={getAcceptValue(allowedVideo.ext, allowedVideo.types)}/> {video && <div>
                            <div>
                                {(video && startVideoUpload)
                                    ? <UploadProgressBar
                                            file={video}
                                            setFile={setVideo}
                                            setStartUpload={setStartVideoUpload}
                                            category={"video"}/>
                                    : null}
                            </div>
                            <div className="selected-file-info">
                                <h5>Selected File Info</h5>
                                <ul>
                                    <li>
                                        <span>Name:</span>
                                        <span>{video.name}</span>
                                    </li>
                                    <li>
                                        <span>Autogenerated Name:</span>
                                        <span>{renameFileWithPrefix(video.name)}</span>
                                    </li>
                                    <li>
                                        <span>Size:</span>
                                        <span>{convertByteInString(video.size)}</span>
                                    </li>
                                    <li>
                                        <span>Extension:</span>
                                        <span>.{getFileExtension(video.name)}</span>
                                    </li>
                                    <li>
                                        <span>MIME Type:</span>
                                        <span>{video.type}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('video', video, `required|validFileType:${allowedVideo.types}|belowMaxSize:${allowedDocument.maxSize}`)
}
                                <button
                                    id="video-upload-btn"
                                    className="video-upload-btn"
                                    onClick={initiateUpload}>
                                    <i className="neu-upload"></i>
                                    Upload Videos</button>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="ap-box">
                    <h3>Upload Documents</h3>
                    <p>Click the upload button below to upload a new document.</p>
                    <p>
                        <b>NB:
                        </b>
                        &nbsp;Document should be either of the following types:
                        <i
                            style={{
                            color: "var(--secondary-color)"
                        }}>({allowedDocument
                                .ext
                                .join(', ')})</i>. Document file size should &nbsp;<b>not</b>&nbsp; be larger than
                        <i
                            style={{
                            color: "var(--secondary-color)"
                        }}>
                            &nbsp;{convertByteInString(allowedDocument.maxSize)}</i>.</p>
                    <div className="file-input-container">
                        <label htmlFor="document-upload-input" className="document-upload-select">
                            <span>
                                <i className="neu-attachment"></i>
                                {document
                                    ? document.name
                                    : "Select Document"}</span>
                        </label>
                        <input
                            type="file"
                            name="document-upload-input"
                            id="document-upload-input"
                            onChange={fileChangeHander}
                            accept={getAcceptValue(allowedDocument.ext, allowedDocument.types)}/> {document && <div>
                            <div>
                                {(document && startDocumentUpload)
                                    ? <UploadProgressBar
                                            file={document}
                                            setFile={setDocument}
                                            setStartUpload={setStartDocumentUpload}
                                            category={"document"}/>
                                    : null}
                            </div>
                            <div className="selected-file-info">
                                <h5>Selected File Info</h5>
                                <ul>
                                    <li>
                                        <span>Name:</span>
                                        <span>{document.name}</span>
                                    </li>
                                    <li>
                                        <span>Autogenerated Name:</span>
                                        <span>{renameFileWithPrefix(document.name)}</span>
                                    </li>
                                    <li>
                                        <span>Size:</span>
                                        <span>{convertByteInString(document.size)}</span>
                                    </li>
                                    <li>
                                        <span>Extension:</span>
                                        <span>.{getFileExtension(document.name)}</span>
                                    </li>
                                    <li>
                                        <span>MIME Type:</span>
                                        <span>{document.type}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                            {/* simple validation */
                                simpleValidator
                                    .current
                                    .message('document', document, `required|validFileType:${allowedDocument.types}|belowMaxSize:${allowedDocument.maxSize}`)
}
                                <button
                                    id="document-upload-btn"
                                    className="document-upload-btn"
                                    onClick={initiateUpload}>
                                    <i className="neu-upload"></i>
                                    Upload Document</button>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="ap-box">
                    <h3>Delete Photos</h3>
                    <DeleteAsset assetType="Photo" />
                </div>
                <div className="ap-box">
                    <h3>Delete Videos</h3>
                    <DeleteAsset assetType="Video" />
                </div>
                <div className="ap-box">
                    <h3>Delete Documents</h3>
                    <DeleteAsset assetType="Document" />
                </div>

            </div>}
        </WithAdminAuth>
    )
}

const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps, {logout})(ManageFileUpload);
