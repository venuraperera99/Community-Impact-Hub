import React, {useState} from 'react'
import "./ProgramAndServices.css";
//import Carousel from '../../components/carousel/Carousel';

const items = [
    {
        title: 'Academic Intervention and Support',
        description: 'Excel in your academic journey with our Academinc Intervention and Support program. Tailored for students seeking additional assistance and resources, this initiative is designed to provide personalized support for academic success.\n Overview: Navigate your academic path with confidence through our Academic Intervention and Support program. We understand that each student is unique, and our program is crafted to address individual needs, fostering a positive and empowering learning environment.',

    },
    {
        title: 'Expanded Opportunities and Athletics',
        description: 'Experience a holistic approach to personal and professional development through our Expanded Opportunities and Athletics program. Tailored for individuals seeking a well-rounded journey, this initiative offers a dynamic blend of expanded opportunities and athletic engagement...',
    },
    {
        title: 'Family Support',
        description: 'Empower your family with the resources and assistance they need through our Family Support program. Tailored for families navigating challenges or seeking additional support, this initiative is designed to strengthen familial bonds and enhance overall well-being...',
    },
    {
        title: 'Affordable Housing & Shelter',
        description: 'At Community Impact Hub. We believe that everyone deserves a safe and affordable place to call home. Our Affordable Housing and Shelter program is dedicated to providing accessible housing solutions for individuals ad families in need.',
    },
];

const ProgramAndServices = () => {

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (index) => {
        setSelectedCard(index === selectedCard ? null : index);
    };

    return (
        <div className='outer'>
            <div className='content'>
                <h1>Programs & Services</h1>
            </div>
            {/*<Carousel items={items} />*/}
            <div className="card-container">
                {items.map((item, index) => (
                <div
                key={index}
                className={`card ${selectedCard === index ? 'selected' : ''}`}
                onClick={() => handleCardClick(index)}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ProgramAndServices