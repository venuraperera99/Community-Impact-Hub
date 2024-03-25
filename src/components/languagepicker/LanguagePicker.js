import React, { useState } from 'react';
import './LanguagePicker.css';
import { useLanguage } from '../../contexts/LanguageContext/LanguageContext';


const LanguagePicker = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {selectedLanguage, changeLanguage} = useLanguage()

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageSelect = (language) => {
    changeLanguage(language);
    setShowDropdown(false);
  };

  return (
    <div className="language-picker">
      <button className="language-button" onClick={toggleDropdown}>
        {selectedLanguage}
        <span className={`arrow ${showDropdown ? 'up' : 'down'}`}>&#9660;</span>
      </button>

      {showDropdown && (
        <div className="dropdown">
          <button className="dropdown-item" onClick={() => handleLanguageSelect('English')}>English</button>
          <button className="dropdown-item" onClick={() => handleLanguageSelect('French')}>French</button>
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
