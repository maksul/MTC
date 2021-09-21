import {useState} from 'react';
import Select from 'react-select';
import '../styles/AssetView.css';
import {connect} from 'react-redux';
import {convertByteInString} from '../helper';
import Swal from 'sweetalert2';
import copy from 'copy-to-clipboard';

const AssetView = (props) => {

    const [assetViewType,
        setAssetViewType] = useState('photo');

    const {assets} = props;
    
    const lowerAssetViewType = assetViewType.toLowerCase();

    const requiredAssets = lowerAssetViewType === 'photo'
        ? assets.filter(x => x.category === 'photo')
        : lowerAssetViewType === 'video'
            ? assets.filter(x => x.category === 'video')
            : lowerAssetViewType === 'document'
                ? assets.filter(x => x.category === 'document')
                : [];

    const [selectedAssetFile,
        setSelectedAssetFile] = useState(null);

    const handleAssetViewTypeSelectChange = e => {
        setAssetViewType(e.target.value);
        setSelectedAssetFile(null);
    }

    const handleCopyBtnClick = e => {
        if (selectedAssetFile) {
            copy(selectedAssetFile.value)
            Swal.fire({title: "", text: `"Copied "${selectedAssetFile.value}"`, icon: "success", buttons: false});
        } else {
            Swal.fire({title: "", text: `No file is selected.`, icon: "error", buttons: false});
        }
    }

    const handleSelectInputChange = option => {
        setSelectedAssetFile(option
            ? option
            : null);
    }

    return (
        <div>

            <div className="all-assets-selector">
                <div>
                    <div>
                        <select
                            name="asset-view-type-select"
                            id="asset-view-type-select"
                            onChange={handleAssetViewTypeSelectChange}
                            className="asset-type-select"
                            value={assetViewType}>
                            <option value="Photo">Photo</option>
                            <option value="Video">Video</option>
                            <option value="Document">Document</option>
                        </select>
                    </div>
                    <h4>{assetViewType}&nbsp;Assets&nbsp;
                        <small>(Select {lowerAssetViewType}&nbsp;and click on copy button to copy {lowerAssetViewType}'s&nbsp;link)</small>
                    </h4>
                    <div className="asset-form-select-wrap">
                        <Select
                            className="asset-form-select"
                            defaultValue={selectedAssetFile}
                            value={selectedAssetFile}
                            options={requiredAssets.map(({name, url, size, category}) => ({value: url, label: `${name} (${convertByteInString(size)})`}))}
                            onChange={handleSelectInputChange}
                            isClearable={true}
                            isSearchable={true}
                            placeholder={`Select a ${lowerAssetViewType}...`}
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
                        <button onClick={handleCopyBtnClick} className="asset-copy-btn">
                            <i className="neu-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({assets: state.asset.assets});

export default connect(mapStateToProps, null)(AssetView);