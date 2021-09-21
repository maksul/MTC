import {useState} from 'react';
import {connect} from 'react-redux';
import {
    addFaq,
    resetFaqCreated,
    updateFaq,
    resetFaqUpdated,
    deleteFaq,
    resetFaqDeleted
} from './../../reduxstore/actions/faqActions';
import WithAdminAuth from '../../layouts/WithAdminAuth';
import Swal from 'sweetalert2';
import Select from 'react-select';
import moment from 'moment';

const ManageFaq = (props) => {
    const [question,
        setQuestion] = useState('');
    const [answer,
        setAnswer] = useState('');
    const [isCreating,
        setIsCreating] = useState(false);
    const [isEditing,
        setIsEditing] = useState(false);
    const [isDeleting,
        setIsDeleting] = useState(false);
    const [shouldEditFaq,
        setShouldEditFaq] = useState(false);
    const [selectedFaq,
        setSelectedFaq] = useState(null);
    const [selectedFaqInfo,
        setSelectedFaqInfo] = useState({});

    if (props.isFaqCreated) {
        Swal
            .fire({title: "", text: `Faq successfully created.`, icon: "success"})
            .then(res => {
                setQuestion('');
                setAnswer('');
                setIsCreating(false);
            });
        props.resetFaqCreated();
    }

    if (props.isFaqUpdated) {
        Swal
            .fire({title: "", text: `Faq successfully updated.`, icon: "success"})
            .then(res => {;
                setShouldEditFaq(false);
                setQuestion('');
                setAnswer('');
                setSelectedFaq(null);
                setIsEditing(false);
            });
        props.resetFaqUpdated();
    }

    if (props.isFaqDeleted) {
        Swal
            .fire({title: "", text: `Faq successfully updated.`, icon: "success"})
            .then(res => {;
                setSelectedFaq(null);
                setIsDeleting(false);
            });
        props.resetFaqDeleted();
    }

    const handleAddFaqInput = e => {
        const {name, value} = e.target;
        switch (name) {
            case 'question':
                setQuestion(value);
                break;
            case 'answer':
                setAnswer(value);
                break;
            default:
        }
    }

    const handleAddFaqBtn = () => {
        setIsCreating(true);
        if (!question || !answer) {
            setIsCreating(false);
            Swal.fire({title: "", text: `The "Question" and "Answer" fields must be provided.`, icon: "error"});
        } else {
            Swal
                .fire({title: 'Do you want to add?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Add`, denyButtonText: `Don't add`})
                .then((result) => {
                    if (result.isConfirmed) {
                        const newFaq = {
                            question,
                            answer
                        };
                        props.addFaq(newFaq);
                    } else if (result.isDenied) {
                        setIsCreating(false);
                        setQuestion('');
                        setAnswer('');
                        Swal.fire('Faq not added', '', 'info')
                    }
                })
        }
    }

    const handleEditFaqBtn = () => {
        setIsEditing(true);
        if (!question || !answer) {
            setIsCreating(false);
            Swal.fire({title: "", text: `The "Question" and "Answer" fields must be provided.`, icon: "error"});
        } else {
            Swal
                .fire({title: 'Do you want to edit?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Edit`, denyButtonText: `Don't edit`})
                .then((result) => {
                    if (result.isConfirmed) {
                        const updatedFaq = {
                            question,
                            answer
                        };
                        props.updateFaq(selectedFaqInfo._id, updatedFaq);
                    } else if (result.isDenied) {
                        setIsEditing(false);
                        setQuestion('');
                        setAnswer('');
                        Swal.fire('Faq not edited', '', 'info')
                    }
                })
        }
    }

    const handleFaqCancelBtn = () => {
        setQuestion('');
        setAnswer('');
        setShouldEditFaq(false);
        setSelectedFaq(null);
    }

    const handleFaqEdit = e => {
        if (!selectedFaq) {
            // no faq is selected
            Swal.fire({title: "No faq selected.", text: `Please select a faq.`, icon: "error"})
        } else {
            // faq is selected
            const fullSelectedFaq = props
                .faqs
                .filter(x => x._id === selectedFaq.value)[0];
            setSelectedFaqInfo(fullSelectedFaq);
            setShouldEditFaq(true);
            setQuestion(fullSelectedFaq.question);
            setAnswer(fullSelectedFaq.answer);
        }
    }

    const handleFaqDelete = () => {
        setIsDeleting(true);
        if (!selectedFaq) {
            // no page is selected
            setIsDeleting(false);
            Swal.fire({title: "No FAQ selected.", text: `Please select a FAQ.`, icon: "error"});
        } else {
            // page is selected
            Swal
                .fire({title: 'Do you want to delete?', showDenyButton: true, showCancelButton: true, confirmButtonText: `Delete`, denyButtonText: `Don't delete`})
                .then((result) => {
                    if (result.isConfirmed) {
                        props.deleteFaq(selectedFaq.value);
                    } else if (result.isDenied) {
                        setIsDeleting(false);
                        setSelectedFaq(null);
                        Swal.fire('Faq Not Deleted', '', 'info')
                    }
                })
        }

    }

    const handleFaqSelectInputChange = option => {
        setSelectedFaq(option
            ? option
            : null);
    }

    return (
        <WithAdminAuth>
            {props.isAuthenticated && <div className="ap-main-section">
                <div className="ap-box">
                    <h2>Manage FAQ</h2>
                </div>
                {!shouldEditFaq && <div className="ap-box">
                    <h3>Add to Faq</h3>

                    <div className="add-to-gallery-form">
                        <div>
                            <label htmlFor="question">Question</label>
                            <input
                                type="text"
                                name="question"
                                id="question"
                                value={question}
                                onChange={handleAddFaqInput}/>
                        </div>

                        <div>
                            <label htmlFor="answer">Answer</label>
                            <input
                                type="text"
                                name="answer"
                                id="answer"
                                value={answer}
                                onChange={handleAddFaqInput}/>
                        </div>
                        <div
                            style={{
                            marginTop: "1.5rem"
                        }}>
                            <button className="primary-btn" disabled={isCreating} onClick={handleAddFaqBtn}>{isCreating
                                    ? 'Add...'
                                    : 'Add'}&nbsp;to Faq</button>
                        </div>
                    </div>

                </div>}

                <div className="ap-box">
                    <h3>Edit or Delete from FAQ</h3>
                    <p>Select the faq you want to edit or delete.</p>
                    {(props.isLoaded && !shouldEditFaq) && <div className="edit-page-container">
                        <div className="page-select-wrapper">
                            <Select
                                className="asset-form-select"
                                defaultValue={selectedFaq}
                                value={selectedFaq}
                                options={props
                                .faqs
                                .map(({question, _id, created_at}) => ({
                                    value: _id,
                                    label: `${question} (${moment(created_at).format('MMM DD, YYYY')})`,
                                    question
                                }))}
                                onChange={handleFaqSelectInputChange}
                                isClearable={true}
                                isSearchable={true}
                                placeholder={`Select a FAQ...`}
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
                            <button className="page-edit-btn page-btn" onClick={handleFaqEdit}>Edit</button>
                            <button
                                className="page-delete-btn page-btn"
                                disabled={isDeleting}
                                onClick={handleFaqDelete}>{isDeleting
                                    ? 'Deleting...'
                                    : 'Delete'}</button>
                        </div>
                    </div>
}

                    {shouldEditFaq && <h4>Edit "{selectedFaqInfo.question}".</h4>}

                    {shouldEditFaq && <div className="add-to-gallery-form">
                        <div>
                            <label htmlFor="question">Question</label>
                            <input
                                type="text"
                                name="question"
                                id="question"
                                value={question}
                                onChange={handleAddFaqInput}/>
                        </div>

                        <div>
                            <label htmlFor="answer">Answer&nbsp;<small>(Link)</small>
                            </label>
                            <input
                                type="text"
                                name="answer"
                                id="answer"
                                value={answer}
                                onChange={handleAddFaqInput}/>
                        </div>
                        <div
                            style={{
                            marginTop: "1.5rem"
                        }}>
                            <button className="primary-btn" disabled={isEditing} onClick={handleEditFaqBtn}>{isEditing
                                    ? 'Editing...'
                                    : 'Edit'}&nbsp;Faq</button>
                            <button className="page-cancel-btn page-btn" onClick={handleFaqCancelBtn}>Cancel</button>
                        </div>
                    </div>}
                </div>

            </div>}
        </WithAdminAuth>
    )
}

const mapStateToProps = state => ({
    faqs: state.faq.faqs,
    isAuthenticated: state.auth.isAuthenticated,
    isFaqCreated: state.faq.isFaqCreated,
    isFaqUpdated: state.faq.isFaqUpdated,
    isFaqDeleted: state.faq.isFaqDeleted,
    isLoaded: state.faq.isLoaded
});

export default connect(mapStateToProps, {
    addFaq,
    resetFaqCreated,
    deleteFaq,
    resetFaqDeleted,
    updateFaq,
    resetFaqUpdated
})(ManageFaq);
