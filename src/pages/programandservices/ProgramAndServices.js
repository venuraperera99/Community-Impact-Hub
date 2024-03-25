import React, {useState, useEffect} from 'react'
import "./ProgramAndServices.css";


const ProgramAndServices = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/program-and-service?populate=*'); // Adjust URL to your Strapi endpoint
            const data = await response.json();
            setPrograms(data.data.attributes.CardInfo);
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (index) => {
        setSelectedCard(index === selectedCard ? null : index);
    };

    return (
        <div className='outer-program'>
            <div className='content'>
                <h1>Programs & Services</h1>
            </div>
            {programs ? 
            <>
                <div className="card-container">
                    {programs.map((program, index) => (
                    <div
                        key={index}
                        className={`card ${selectedCard === index ? 'selected' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <h3>{program.title}</h3>
                        <p>{program.description[0].children[0].text}</p>
                    </div>
                ))}
                </div>
            </> :
                <p>Loading...</p>
            }
            
        </div>
    )
}
export default ProgramAndServices;