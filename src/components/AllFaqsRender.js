import {useState} from 'react';

const AllFaqsRender = ({faqs}) => {
    const [activeFaqs, setActiveFaqs] = useState([]);

    const handleFaqActive = function() {
        const {id} = this;
        if (activeFaqs.includes(id)) {
            setActiveFaqs(prev => prev.filter(x => x !== id));
        } else {
            setActiveFaqs(prev => [...prev, id]);
        }
    }

    if (faqs.length === 0) {
        return (
            <b>No FAQs yet.</b>
        )
    } else {
        return (
            <div className="faqs-container">
                <ul className="faqs-list">
                    {faqs.map(faq => (
                        <li key={faq._id} className="faqs-box">
                            <div onClick={handleFaqActive.bind({id: faq._id})}>
                                <span>{faq.question}</span>
                                <span><i className={`neu ${activeFaqs.includes(faq._id) ? 'neu-minus-circle' : 'neu-add-circle'}`}></i></span>
                            </div>
                            {activeFaqs.includes(faq._id) && <div>
                                <span>{faq.answer}</span>
                            </div>}

                        </li>
                    ))
}
                </ul>
            </div>
        )
    }
}

export default AllFaqsRender;
