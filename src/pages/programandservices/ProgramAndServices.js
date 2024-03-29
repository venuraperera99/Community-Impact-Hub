import React, {useState, useEffect, useContext} from 'react'
import "./ProgramAndServices.css";
import LanguageContext from '../../contexts/LanguageContext/LanguageContext';


const ProgramAndServices = () => {
    const [programs, setPrograms] = useState([]);
    const [pageTitle, setPageTitle] = useState("")
    const { selectedLanguage } = useContext(LanguageContext);

    useEffect(() => {
        fetchPrograms();
    }, [selectedLanguage]);

    const fetchPrograms = async () => {
        if(selectedLanguage === "English"){
            try {
                const response = await fetch('http://localhost:1337/api/program-and-service?populate=*'); // Adjust URL to your Strapi endpoint
                const data = await response.json();
                setPrograms(data.data.attributes.CardInfo);
                setPageTitle(data.data.attributes.pageTitle)
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        } else if (selectedLanguage === "French"){
            try {
                const response = await fetch('http://localhost:1337/api/program-and-service-FRENCH?populate=*'); // Adjust URL to your Strapi endpoint
                const data = await response.json();
                setPrograms(data.data.attributes.CardInfo);
                setPageTitle(data.data.attributes.pageTitle)
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        }
    };

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (index) => {
        setSelectedCard(index === selectedCard ? null : index);
    };

    return (
        <div className='outer-program'>
            {programs ? 
            <>
                <div className='content'>
                    <h1>{pageTitle}</h1>
                </div>
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
                <p className='outer-container-success'>Loading...</p>
            }
            
        </div>
    )
}
export default ProgramAndServices;