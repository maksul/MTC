import {useState, useEffect} from 'react';
import {renameFileWithPrefix} from './../../helper';

const useStorage = (file, firebaseStorage, addAsset, currentUsername, assetCategory) => {
    const [progress,
        setProgress] = useState(0);
    const [error,
        setError] = useState(null);
    const [url,
        setUrl] = useState(null);

    useEffect(() => {
        // get a new filename
        const newFileName = renameFileWithPrefix(file.name);

        // references
        const storageRef = firebaseStorage.ref(newFileName);

        storageRef
            .put(file)
            .on('state_changed', snap => {
                let precentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(precentage);
            }, err => {
                setError(err);
            }, async() => {
                const url = await storageRef.getDownloadURL();
                // upload file url to mongo database
                const newAsset = {
                    name: newFileName,
                    url,
                    size: file.size,
                    file_type: file.type,
                    author_username: currentUsername,
                    category: assetCategory
                };
                addAsset(newAsset);
                setUrl(url);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    return {progress, url, error};
}

export default useStorage;