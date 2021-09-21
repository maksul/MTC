import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import useStorage from './../hooks/firebase/useStorage';
import {addAsset} from '../reduxstore/actions/assetActions';
import '../styles/UploadProgressBar.css';

const UploadProgressBar = props => {
    const {
        file,
        setFile,
        setStartUpload,
        firebaseStorage,
        addAsset,
        user,
        category
    } = props;

    const {progress, url, error} = useStorage(file, firebaseStorage, addAsset, user.username, category);

    useEffect(() => {

        if (error) {
            Swal.fire({title: "Opps", text: `"Something went wrong. Try again.`, icon: "error", buttons: false});
            setFile(null);
            setStartUpload(false);
        } else if (url) {
            Swal.fire({title: "", text: `"${file.name}" has been uploaded successfully.`, icon: "success", buttons: false});
            setFile(null);
            setStartUpload(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, setFile, error])

    return (
        <div className="file-upload-progress-bar">
            <span>({progress.toFixed(0)}%) {progress === 100 ? "Uploaded" : "Uploading..."}</span>
            <div style={{
                width: progress + '%'
            }}></div>
        </div>
    )
}

const mapStateToProps = (state) => ({firebaseStorage: state.fire.firebaseStorage, user: state.auth.user});

export default connect(mapStateToProps, {addAsset})(UploadProgressBar);